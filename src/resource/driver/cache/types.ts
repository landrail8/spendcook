import { Filter, ResourceDescriptor } from "../../resource";
import { Observable } from "rxjs";

export interface SearchRecord<E> {
  descriptor: ResourceDescriptor<E>;
  filter: Filter;
  result$?: Observable<E[]>;
  idList?: string[];
}

export type SearchRegistry = Registry<SearchRecord<unknown>>;
export type EntityRegistry = Registry<unknown>;

export interface Registry<T> {
  [key: string]: T;
}

export interface SerializableData {
  searches: SearchRegistry;
  entities: EntityRegistry;
}