import { Entity, ResourceDescriptor } from "../../types";

export default function generateEntityKey(
  descriptor: ResourceDescriptor<Entity>,
  id: string
) {
  return `${descriptor.name}:${id}`;
}
