import { Observable } from "rxjs";
import * as fs from "fs";
import { mergeMap } from "rxjs/operators";
import {
  Entity,
  EntityList,
  ExistingEntity,
  Filter,
  ResourceDescriptor,
  ResourceDriver
} from "../types";

export function makeFsDriver(): ResourceDriver {
  return {
    search,
    post
  };
}

function search<E extends Entity>(
  { applyFilter, name }: ResourceDescriptor<E>,
  filter: Filter
): Observable<EntityList<E>> {
  const data$ = new Observable<EntityList<E>>(observer => {
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

function post<E extends Entity>(
  { name }: ResourceDescriptor<E>,
  entities: E[]
) {
  return accessFile<E>(name).pipe(
    mergeMap(
      items =>
        new Observable<EntityList<E>>(observer => {
          let id = items
            .map(({ id }) => parseInt(id))
            .reduce((acc, value) => (acc > value ? acc : value));

          const data = entities.map<ExistingEntity<E>>(entity => ({
            ...entity,
            id: `${++id}`
          }));

          fs.writeFile(
            generateFileName(name),
            JSON.stringify([...items, ...data], null, 2),
            err => {
              if (err) {
                observer.error(err);
              } else {
                observer.next(data);
              }

              observer.complete();
            }
          );
        })
    )
  );
}

function accessFile<E extends Entity>(name: string) {
  return new Observable<EntityList<E>>(observer => {
    fs.readFile(generateFileName(name), (err, data) => {
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
}

function generateFileName(name: string) {
  return `data/${name}.json`;
}
