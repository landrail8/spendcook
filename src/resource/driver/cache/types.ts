import { Observable } from "rxjs";
import { Entity, EntityList, Filter, ResourceDescriptor } from "../../types";
export * from "../../types";

export interface SearchRecord<E extends Entity> {
  descriptor: ResourceDescriptor<E>;
  filter: Filter;
  result$?: Observable<EntityList<E>>;
  idList?: string[];
}

export type SearchRegistry = Registry<SearchRecord<Entity>>;
export type EntityRegistry = Registry<Entity>;

export interface Registry<T> {
  [key: string]: T;
}

export interface SerializableData {
  searches: SearchRegistry;
  entities: EntityRegistry;
}
