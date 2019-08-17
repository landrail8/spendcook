import { of } from "rxjs";
import {
  Entity,
  EntityList,
  ResourceDescriptor
} from "./types";
import Resource from "./Resource";

export default class ResourceMock<E extends Entity> extends Resource<E> {
  constructor(
    descriptor: ResourceDescriptor<E>,
    private entities: EntityList<E>
  ) {
    super(descriptor);
  }

  search(filter?) {
    return of(this.entities);
  }

  post(entities) {
    alert(JSON.stringify(entities));
    return this.search();
  }

  delete(filter) {
    alert(JSON.stringify(filter));
    return of(undefined);
  }
}
