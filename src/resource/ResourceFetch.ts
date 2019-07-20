import { Filter, Entity, EntityList, ResourceDescriptor } from "./types";
import { Observable } from "rxjs";
import serializeFilter from "./serializeFilter";
import Resource from "./Resource";
import { fromPromise } from "rxjs/internal-compatibility";
import { mapTo, mergeMap } from "rxjs/operators";

export default class ResourceFetch<E extends Entity> extends Resource<E> {
  constructor(descriptor: ResourceDescriptor<E>) {
    super(descriptor);
  }

  search(filter: Filter): Observable<EntityList<E>> {
    return this.fetchApi({
      filter
    }).pipe(this.extractEntities);
  }

  post(entities: E[]): Observable<EntityList<E>> {
    return this.fetchApi({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entities)
    }).pipe(this.extractEntities);
  }

  delete(filter) {
    return this.fetchApi({
      filter,
      method: "DELETE"
    }).pipe(mapTo(undefined));
  }

  private fetchApi({ filter, ...options }: FetchApiParams) {
    const { name } = this.descriptor;

    return fromPromise(
      fetch(`/api/${name}?${serializeFilter(filter)}`, {
        headers: {
          Accept: "application/json",
          ...options.headers
        },
        ...options
      })
    );
  }

  private extractEntities = mergeMap<Response, Observable<EntityList<E>>>(
    (response: Response) => fromPromise<EntityList<E>>(response.json())
  );
}

interface FetchApiParams extends RequestInit {
  filter?: Filter;
}
