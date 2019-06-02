import { Filter, ResourceDescriptor } from "../../resource";
import serializeFilter from "../../utils/serializeFilter";

export default function generateSearchKey(
  descriptor: ResourceDescriptor<unknown>,
  filter: Filter
) {
  return `${descriptor.name}?${serializeFilter(filter)}`;
}
