import { Entity, ResourceDescriptor, ResourceDriver } from "./types";
import DriverResource from "./DriverResource";

export default function makeResource<E extends Entity>(
  driver: ResourceDriver,
  descriptor: ResourceDescriptor<E>
) {
  return new DriverResource(driver, descriptor);
}
