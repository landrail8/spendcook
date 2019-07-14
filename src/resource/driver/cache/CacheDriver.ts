import { Observable, of, ReplaySubject } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import {
  Filter,
  ResourceDescriptor,
  ResourceDriver,
  EntityRegistry,
  SearchRecord,
  SearchRegistry,
  SerializableData,
  Entity,
  EntityId,
  ExistingEntity,
  EntityList
} from "./types";
import generateSearchKey from "./generateSearchKey";
import generateEntityKey from "./generateEntityKey";
import isGetOneByIdFilter from "./isGetOneByIdFilter";

export default class CacheDriver implements ResourceDriver {
  constructor(
    private origin: ResourceDriver,
    { searches, entities }: SerializableData = {
      searches: {},
      entities: {}
    }
  ) {
    this.entities = entities;
    this.searches = searches;
  }

  search<E extends Entity>(descriptor: ResourceDescriptor<E>, filter: Filter) {
    // Поиск одного элемента по id
    if (isGetOneByIdFilter(filter)) {
      const entity = this.getById(descriptor, filter.id);

      if (entity) {
        return of([entity]);
      }
    }

    // Достаем идентификатор поиска
    const record = this.getSearchRecord(descriptor, filter);

    // Если поиск в процессе - возвращаем временный subject
    if (record.result$) {
      return record.result$;
    }

    // Если поиск завершен - восстанавливаем результат по списку id
    if (record.idList) {
      return of(
        record.idList.map(itemId => {
          const itemKey = generateEntityKey(descriptor, itemId);

          return this.entities[itemKey] as ExistingEntity<E>;
        })
      );
    }

    // Запускаем поиск
    return this.searchByOrigin(record);
  }

  post<E extends Entity>(
    descriptor: ResourceDescriptor<E>,
    entities: E[]
  ): Observable<EntityList<E>> {
    const originEntities$ = this.origin.post(descriptor, entities);

    return originEntities$.pipe(
      tap(entities => {
        this.cacheEntities(descriptor, entities);

        for (const entity of entities) {
          this.entities[generateEntityKey(descriptor, entity.id)] = entity;
        }

        const searchKeys = Object.keys(this.searches);

        for (const key of searchKeys) {
          const search = this.searches[key];

          if (search.result$) {
            search.isStale = true;
          } else {
            delete this.searches[key];
          }
        }
      })
    );
  }

  async release(): Promise<SerializableData> {
    if (this.pendingSearchCount > 0) {
      const release = new Promise(resolve => {
        this.resolveRelease = resolve;
      });

      await release;
    }

    return this.serialize();
  }

  private pendingSearchCount = 0;
  private resolveRelease: null | (() => void) = null;
  private readonly entities: EntityRegistry;
  private readonly searches: SearchRegistry;

  private getById<E extends Entity>(
    descriptor: ResourceDescriptor<E>,
    id: string
  ): ExistingEntity<E> | null {
    const key = generateEntityKey(descriptor, id);

    return (this.entities[key] as ExistingEntity<E>) || null;
  }

  private getSearchRecord<E extends Entity>(
    descriptor: ResourceDescriptor<E>,
    filter: Filter
  ) {
    const { searches } = this;
    const key = generateSearchKey(descriptor, filter);

    if (!searches[key]) {
      searches[key] = {
        descriptor,
        filter,
        isStale: false
      };
    }

    return searches[key] as SearchRecord<E>;
  }

  private searchByOrigin<E extends Entity>(record: SearchRecord<E>) {
    const { descriptor, filter } = record;
    const originResult$ = this.origin.search(descriptor, filter);
    const result$ = new ReplaySubject<EntityList<E>>(1);

    record.result$ = result$;
    this.pendingSearchCount++;

    originResult$
      .pipe(
        tap(() => {
          delete record.result$;
          this.pendingSearchCount--;
          if (this.resolveRelease && this.pendingSearchCount === 0) {
            this.resolveRelease();
          }
        }),
        switchMap(items => {
          if (record.isStale) {
            record.isStale = false;
            return this.searchByOrigin(record);
          }

          record.idList = this.cacheEntities(descriptor, items);
          return of(items);
        })
      )
      .subscribe(result$);

    return result$;
  }

  private cacheEntities<E extends Entity>(
    descriptor: ResourceDescriptor<E>,
    items: Array<Entity & { id: EntityId }>
  ) {
    return items.map(item => {
      const itemId = item.id;
      const itemKey = generateEntityKey(descriptor, itemId);

      this.entities[itemKey] = item;

      return itemId;
    });
  }

  private serialize() {
    const { searches, entities } = this;

    return {
      searches,
      entities
    };
  }
}
