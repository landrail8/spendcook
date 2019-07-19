import { Observable, of, ReplaySubject } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { Filter, Entity, EntityList, ExistingEntity } from "./types";
import isGetOneByIdFilter from "./isGetOneByIdFilter";
import Resource from "./Resource";
import serializeFilter from "./serializeFilter";

export interface SerializableData<E extends Entity> {
  searches: SearchRegistry<E>;
  entities: EntityRegistry<E>;
}

export default class ResourceCache<E extends Entity> extends Resource<E> {
  constructor(
    private origin: Resource<E>,
    { searches, entities }: SerializableData<E> = {
      searches: {},
      entities: {}
    }
  ) {
    super(origin.descriptor);
    this.entities = entities;
    this.searches = searches;
  }

  search(filter): Observable<EntityList<E>> {
    // Поиск одного элемента по id
    if (isGetOneByIdFilter(filter)) {
      const entity = this.entities[filter.id];

      if (entity) {
        return of([entity]);
      }
    }

    // Достаем идентификатор поиска
    const record = this.getSearchRecord(filter);

    // Если поиск в процессе - возвращаем временный subject
    if (record.result$) {
      return record.result$;
    }

    // Если поиск завершен - восстанавливаем результат по списку id
    if (record.idList) {
      return of(record.idList.map(itemId => this.entities[itemId]));
    }

    // Запускаем поиск
    return this.searchByOrigin(record);
  }

  post(entities: E[]) {
    const originEntities$ = this.origin.post(entities);

    return originEntities$.pipe(
      tap(entities => {
        this.cacheEntities(entities);

        for (const entity of entities) {
          this.entities[entity.id] = entity;
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

  async release() {
    if (this.pendingSearchCount > 0) {
      const release = new Promise<SerializableData<E>>(resolve => {
        this.resolveRelease = resolve;
      });

      await release;
    }

    return this.serialize();
  }

  private pendingSearchCount = 0;
  private resolveRelease: null | (() => void) = null;
  private readonly entities: EntityRegistry<E>;
  private readonly searches: SearchRegistry<E>;

  private getSearchRecord(filter: Filter) {
    const { searches } = this;
    const key = serializeFilter(filter);

    if (!searches[key]) {
      searches[key] = {
        filter,
        isStale: false
      };
    }

    return searches[key];
  }

  private searchByOrigin(record: SearchRecord<E>) {
    const { filter } = record;
    const originResult$ = this.origin.search(filter);
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

          record.idList = this.cacheEntities(items);
          return of(items);
        })
      )
      .subscribe(result$);

    return result$;
  }

  private cacheEntities(items: EntityList<E>) {
    return items.map(item => {
      const itemId = item.id;

      this.entities[itemId] = item;

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

interface SearchRecord<E extends Entity> {
  filter: Filter;
  result$?: Observable<EntityList<E>>;
  idList?: string[];
  isStale: boolean;
}

type SearchRegistry<E extends Entity> = Registry<SearchRecord<E>>;
type EntityRegistry<E extends Entity> = Registry<ExistingEntity<E>>;

export interface Registry<T> {
  [key: string]: T;
}
