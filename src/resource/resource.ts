import { Observable } from "rxjs";

export interface Resource<E, F> {
  search(options: F): Observable<E[]>;
}

export interface ResourceDescriptor<D, F> {
  name: string;
  applyFilter: (data$: Observable<D[]>, options: F) => Observable<D[]>;
}

export const descriptorRegistry: Dictionary<
  ResourceDescriptor<unknown, unknown>
> = {};

export interface Dictionary<T> {
  [key: string]: T;
}
