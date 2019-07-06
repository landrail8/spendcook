import { Entity, Filter, ResourceDescriptor } from "./types";
import serializeFilter from "../../utils/serializeFilter";

export default function generateSearchKey(
  descriptor: ResourceDescriptor<Entity>,
  filter: Filter
) {
  return `${descriptor.name}?${serializeFilter(filter)}`;
}
