import { ResourceDescriptor, ResourceDriver, Filter } from "../resource";
import { Observable } from "rxjs";
import asyncToObservable from "../../utils/asyncToObservable";
import serializeFilter from "../utils/serializeFilter";

export function makeFetchDriver(): ResourceDriver {
  return {
    search
  };
}

function search<E>(
  { name }: ResourceDescriptor<E>,
  options: Filter
): Observable<E[]> {
  return asyncToObservable<E[]>(async () => {
    const response = await fetch(`/api/${name}?${serializeFilter(options)}`);

    return await response.json();
  });
}
