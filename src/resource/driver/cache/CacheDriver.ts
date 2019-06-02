import { Filter, ResourceDescriptor, ResourceDriver } from "../../resource";
import serializeFilter from "../../utils/serializeFilter";
import { Observable, of, ReplaySubject } from "rxjs";
import { tap } from "rxjs/operators";
import {
  EntityRegistry,
  SearchRecord,
  SearchRegistry,
  SerializableData
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

  search<E>(descriptor: ResourceDescriptor<E>, filter: Filter) {
    console.log("search:", descriptor.name, serializeFilter(filter));

    console.log("isGetOneByIdFilter(filter)", isGetOneByIdFilter(filter));

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

          return this.entities[itemKey] as E;
        })
      );
    }

    // Запускаем поиск
    return this.searchByOrigin(record);
  }

  async release(): Promise<SerializableData> {
    console.log("release");
    console.log("pendingSearchCount", this.pendingSearchCount);

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

  private getById<E>(descriptor: ResourceDescriptor<E>, id: string): E | null {
    const key = generateEntityKey(descriptor, id);

    return (this.entities[key] as E) || null;
  }

  private getSearchRecord<E>(
    descriptor: ResourceDescriptor<E>,
    filter: Filter
  ) {
    const { searches } = this;
    const key = generateSearchKey(descriptor, filter);
    console.log(key, searches[key] ? "found" : "not found");

    if (!searches[key]) {
      searches[key] = {
        descriptor,
        filter
      };
    }

    return searches[key] as SearchRecord<E>;
  }

  private searchByOrigin<E>(record: SearchRecord<E>) {
    const { descriptor, filter } = record;
    const originResult$ = this.origin.search(descriptor, filter);
    const result$ = new ReplaySubject<E[]>(1);

    record.result$ = result$;
    this.pendingSearchCount++;

    originResult$
      .pipe(
        tap(items => {
          record.idList = this.cacheEntities(descriptor, items);
          delete record.result$;

          this.pendingSearchCount--;
          if (this.resolveRelease && this.pendingSearchCount === 0) {
            this.resolveRelease();
          }
        })
      )
      .subscribe(result$);

    return result$;
  }

  private cacheEntities<E>(descriptor: ResourceDescriptor<E>, items: E[]) {
    return items.map(item => {
      const itemId = descriptor.getId(item);
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
