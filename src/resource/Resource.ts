import { Entity, EntityList, Filter, ResourceDescriptor } from "./types";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

export default abstract class Resource<E extends Entity> {
  abstract search(filter: Filter): Observable<EntityList<E>>;
  abstract post(entities: E[]): Observable<EntityList<E>>;
  abstract delete(filter: Filter): Observable<void>;

  protected constructor(readonly descriptor: ResourceDescriptor<E>) {}

  getById(id: string) {
    return this.search({
      id,
      limit: 1
    }).pipe(map(singleItemArray => singleItemArray[0]));
  }

  deleteById(id: string) {
    return this.delete({
      id,
      limit: 1
    });
  }
}
