import { Observable } from "rxjs";
import * as fs from "fs";
import { map, mergeMap } from "rxjs/operators";
import {
  Entity,
  EntityList,
  ExistingEntity,
  Filter,
  ResourceDescriptor
} from "./types";
import Resource from "./Resource";

export default class ResourceFs<E extends Entity> extends Resource<E> {
  constructor(descriptor: ResourceDescriptor<E>) {
    super(descriptor);
  }

  search(filter: Filter) {
    return this.applyFilter(this.accessFile(), filter);
  }

  post(entities: E[]) {
    return this.accessFile().pipe(
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
              this.filename,
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

  private get filename() {
    return `data/${this.descriptor.name}.json`;
  }

  accessFile() {
    return new Observable<EntityList<E>>(observer => {
      fs.readFile(this.filename, (err, data) => {
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

  applyFilter(
    data$: Observable<EntityList<E>>,
    filter: Filter
  ): Observable<EntityList<E>> {
    return data$.pipe(
      map(items => items.filter(item => this.descriptor.filter(item, filter)))
    );
  }
}
