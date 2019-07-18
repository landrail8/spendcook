import { Entity, ResourceDescriptor } from "./types";

export default function describeResource<E extends Entity>(
  descriptor: ResourceDescriptor<E>
) {
  return descriptor;
}
