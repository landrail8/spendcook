import { Observable } from "rxjs";
import * as fs from "fs";
import { map, mapTo, mergeMap } from "rxjs/operators";
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
    return this.applyFilter(this.readFile(), filter);
  }

  post(entities: E[]) {
    return this.readFile().pipe(
      mergeMap(existingItems => {
        let nextId = existingItems
          .map(({ id }) => parseInt(id))
          .reduce((acc, value) => (acc > value ? acc : value));

        const newItems = entities.map<ExistingEntity<E>>(entity => ({
          ...entity,
          id: `${++nextId}`
        }));

        return this.writeFile([...existingItems, ...newItems]).pipe(
          mapTo(newItems)
        );
      })
    );
  }

  delete(filter) {
    return this.readFile().pipe(
      mergeMap(existingItems =>
        this.writeFile(
          existingItems.filter(
            entity => {
              const isDeleting = !this.descriptor.filter(entity, filter)

              console.log(isDeleting, filter)

              return isDeleting
            }
          )
        )
      )
    );
  }

  private get filename() {
    return `data/${this.descriptor.name}.json`;
  }

  readFile() {
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

  writeFile(data: EntityList<E>) {
    return new Observable<void>(observer => {
      fs.writeFile(this.filename, JSON.stringify(data, null, 2), err => {
        if (err) {
          observer.error(err);
        } else {
          observer.next();
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
