import { ResourceDescriptor } from "../../resource";

export default function generateEntityKey(
  descriptor: ResourceDescriptor<unknown>,
  id: string
) {
  return `${descriptor.name}:${id}`;
}
