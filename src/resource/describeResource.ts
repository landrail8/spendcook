import { descriptorRegistry, ResourceDescriptor } from "./resource";

export default function describeResource<E, F>(
  descriptor: ResourceDescriptor<E, F>
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
