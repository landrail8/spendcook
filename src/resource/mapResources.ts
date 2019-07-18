import Resource from "./Resource";
import { Entity, ResourceDescriptor } from "./types";

export default function mapResources(...resources: Resource<Entity>[]) {
  return new Map<ResourceDescriptor<Entity>, Resource<Entity>>(
    resources.map(resource => [resource.descriptor, resource])
  );
}

export type ResourceMap = ReturnType<typeof mapResources>;
