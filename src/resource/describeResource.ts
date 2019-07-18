import { Entity, ResourceDescriptor } from "./types";
import descriptorRegistry from "./descriptorRegistry";

export default function describeResource<E extends Entity>(
  descriptor: ResourceDescriptor<E>
) {
  const { name } = descriptor;

  if (descriptorRegistry[name]) {
    throw new Error(
      `Cannot describe resource ${name}. It have been described already`
    );
  }

  descriptorRegistry[name] = descriptor;

  return descriptor;
}
