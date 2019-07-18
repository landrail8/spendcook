import { Filter, EntityId } from "../types";

export default function isGetOneByIdFilter(
  filter: Filter
): filter is { id: EntityId; limit: 1 } {
  return !!(filter.id && filter.limit === 1);
}
