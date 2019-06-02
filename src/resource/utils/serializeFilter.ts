import * as qs from "query-string";
import { Filter } from "../resource";

export default function serializeFilter(filter: Filter): string {
  return qs.stringify(filter)
}