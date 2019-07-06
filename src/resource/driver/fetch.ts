import {
  ResourceDescriptor,
  ResourceDriver,
  Filter,
  Entity,
  EntityList
} from "../types";
import { Observable } from "rxjs";
import asyncToObservable from "../../utils/asyncToObservable";
import serializeFilter from "../utils/serializeFilter";

export function makeFetchDriver(): ResourceDriver {
  return {
    search,
    post
  };
}

function search<E>(
  descriptor: ResourceDescriptor<E>,
  filter: Filter
): Observable<EntityList<E>> {
  return fetchApi(descriptor, {
    filter
  });
}

function post<E>(
  descriptor: ResourceDescriptor<E>,
  entities: E[]
): Observable<EntityList<E>> {
  return fetchApi(descriptor, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entities)
  });
}

interface FetchApiParams extends RequestInit {
  filter?: Filter;
}

function fetchApi<E extends Entity>(
  { name }: ResourceDescriptor<E>,
  { filter, ...options }: FetchApiParams
) {
  return asyncToObservable<EntityList<E>>(async () => {
    const response = await fetch(`/api/${name}?${serializeFilter(filter)}`, {
      headers: {
        'Accept': 'application/json',
        ...options.headers
      },
      ...options
    });

    return await response.json();
  });
}
