import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface Resource<E> {
  getById(id: string): Observable<E>;
  search(options: Filter): Observable<E[]>;
}

export interface ResourceDescriptor<E> {
  name: string;
  applyFilter: (data$: Observable<E[]>, options: Filter) => Observable<E[]>;
  getId: (entity: E) => string;
}

export interface ResourceDriver {
  search<E>(descriptor: ResourceDescriptor<E>, filter: Filter): Observable<E[]>;
}

export const descriptorRegistry: Dictionary<ResourceDescriptor<unknown>> = {};

export interface Dictionary<T> {
  [key: string]: T;
}

export interface Filter {
  query?: string;
  id?: string;
  limit?: number;
}

export function makeResource<E>(
  driver: ResourceDriver,
  descriptor: ResourceDescriptor<E>
): Resource<E> {
  return {
    search: (filter: Filter) => driver.search<E>(descriptor, filter),
    getById: (id: string) =>
      driver
        .search<E>(descriptor, {
          id,
          limit: 1
        })
        .pipe(map(singleItemArray => singleItemArray[0]))
  };
}
