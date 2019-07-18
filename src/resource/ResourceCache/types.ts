import { Observable } from "rxjs";
import { Entity, EntityList, ExistingEntity, Filter } from "../types";
export * from "../types";

export interface SearchRecord<E extends Entity> {
  filter: Filter;
  result$?: Observable<EntityList<E>>;
  idList?: string[];
  isStale: boolean;
}

export type SearchRegistry<E extends Entity> = Registry<SearchRecord<E>>;
export type EntityRegistry<E extends Entity> = Registry<ExistingEntity<E>>;

export interface Registry<T> {
  [key: string]: T;
}

export interface SerializableData<E extends Entity> {
  searches: SearchRegistry<E>;
  entities: EntityRegistry<E>;
}
