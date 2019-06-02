import { Observable } from "rxjs";
import * as fs from "fs";
import { Filter, ResourceDescriptor, ResourceDriver } from "../resource";

export function makeFsDriver(): ResourceDriver {
  return {
    search
  };
}

function search<E>(
  { applyFilter, name }: ResourceDescriptor<E>,
  filter: Filter
): Observable<E[]> {
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

  return applyFilter(data$, filter);
}
