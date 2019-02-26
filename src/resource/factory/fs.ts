import { Resource, ResourceDescriptor } from "../resource";
import * as fs from "fs";
import {Observable} from "rxjs";

export default function makeFsResource<E, F>({
  name,
  applyFilter
}: ResourceDescriptor<E, F>): Resource<E, F> {
  return { search };

  function search(options: F): Observable<E[]> {
    const data$ = new Observable<E[]>(observer => {
      fs.readFile(`data/${name}.json`, (err, data) => {
        if (err) {
          observer.error(err);
        }

        try {
          observer.next(JSON.parse(data.toString()));
        } catch (err) {
          observer.error(err);
        }

        observer.complete();
      });
    });

    return applyFilter(data$, options);
  }
}
