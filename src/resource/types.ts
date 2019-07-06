import { Observable } from "rxjs";

export interface Entity {
  id?: EntityId;
}

export type ExistingEntity<E extends Entity> = E & { id: EntityId };
export type EntityList<E extends Entity> = Array<ExistingEntity<E>>;

export type EntityId = string;

export interface Resource<E extends Entity> {
  getById(id: string): Observable<ExistingEntity<E>>;
  search(options: Filter): Observable<EntityList<E>>;
  post(entities: E[]): Observable<EntityList<E>>;
}

export interface ResourceDescriptor<E extends Entity> {
  name: string;
  applyFilter: (
    data$: Observable<EntityList<E>>,
    options: Filter
  ) => Observable<EntityList<E>>;
}

export interface Filter {
  query?: string;
  id?: EntityId;
  limit?: number;
}

export interface ResourceDriver {
  search<E extends Entity>(
    descriptor: ResourceDescriptor<E>,
    filter: Filter
  ): Observable<EntityList<E>>;

  post<E extends Entity>(
    descriptor: ResourceDescriptor<E>,
    entities: E[]
  ): Observable<EntityList<E>>;
}

export interface Dictionary<T> {
  [key: string]: T;
}
