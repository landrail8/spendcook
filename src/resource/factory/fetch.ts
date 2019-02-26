import { ResourceDescriptor, Resource } from "../resource";
import { Observable } from "rxjs";
import * as qs from "query-string";
import asyncToObservable from "../../utils/asyncToObservable";

export function makeFetchResource<E, F>({
  name
}: ResourceDescriptor<E, F>): Resource<E, F> {
  return {
    search
  };

  function search(options: F): Observable<E[]> {
    return asyncToObservable<E[]>(async () => {
      const response = await fetch(`/api/${name}?${qs.stringify(options)}`);

      return await response.json();
    });
  }
}
