import { Filter, Entity, EntityList, ResourceDescriptor } from "./types";
import { Observable } from "rxjs";
import asyncToObservable from "../utils/asyncToObservable";
import serializeFilter from "./serializeFilter";
import Resource from "./Resource";

export default class ResourceFetch<E extends Entity> extends Resource<E> {
  constructor(descriptor: ResourceDescriptor<E>) {
    super(descriptor);
  }

  search(filter: Filter): Observable<EntityList<E>> {
    return this.fetchApi({
      filter
    });
  }

  post(entities: E[]): Observable<EntityList<E>> {
    return this.fetchApi({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entities)
    });
  }

  private fetchApi({ filter, ...options }: FetchApiParams) {
    const { name } = this.descriptor;

    return asyncToObservable<EntityList<E>>(async () => {
      const response = await fetch(`/api/${name}?${serializeFilter(filter)}`, {
        headers: {
          Accept: "application/json",
          ...options.headers
        },
        ...options
      });

      return await response.json();
    });
  }
}

interface FetchApiParams extends RequestInit {
  filter?: Filter;
}
