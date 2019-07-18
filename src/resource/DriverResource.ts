import { Entity, Filter, ResourceDescriptor, ResourceDriver } from "./types";
import Resource from "./Resource";

export default class DriverResource<E extends Entity> extends Resource<E> {
  constructor(
    private driver: ResourceDriver,
    private descriptor: ResourceDescriptor<E>
  ) {
    super();
  }

  search(filter: Filter) {
    return this.driver.search(this.descriptor, filter);
  }
  post(entities: E[]) {
    return this.driver.post(this.descriptor, entities);
  }
}
