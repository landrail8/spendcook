import {
  descriptorRegistry,
  Dictionary,
  Resource,
  ResourceDescriptor
} from "./resource";

type ResourceFactory = <E, F>(
  descriptor: ResourceDescriptor<E, F>
) => Resource<E, F>;

export default function makeResourceRegistry(make: ResourceFactory) {
  const cache: Dictionary<Resource<unknown, unknown>> = {};

  return {
    access<E, F>(descriptor: ResourceDescriptor<E, F>): Resource<E, F> {
      const { name } = descriptor;

      if (!descriptorRegistry[name]) {
        throw new Error(
          `Cannot access resource ${name}. It have not been described`
        );
      }

      if (!cache[name]) {
        cache[descriptor.name] = make(descriptor);
      }

      return cache[descriptor.name] as Resource<E, F>;
    }
  };
}

export interface ResourceRegistry {
  access: <E, F>(descriptor: ResourceDescriptor<E, F>) => Resource<E, F>;
}
