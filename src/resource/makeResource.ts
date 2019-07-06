import { map } from "rxjs/operators";
import {
  Entity,
  Filter,
  Resource,
  ResourceDescriptor,
  ResourceDriver
} from "./types";

export default function makeResource<E extends Entity>(
  driver: ResourceDriver,
  descriptor: ResourceDescriptor<E>
): Resource<E> {
  return {
    search: (filter: Filter) => driver.search<E>(descriptor, filter),
    post: (entities: E[]) => driver.post<E>(descriptor, entities),
    getById: (id: string) =>
      driver
        .search<E>(descriptor, {
          id,
          limit: 1
        })
        .pipe(map(singleItemArray => singleItemArray[0]))
  };
}
