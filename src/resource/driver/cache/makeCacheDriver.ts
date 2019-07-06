import { ResourceDriver } from "../../types";
import CacheDriver from "./CacheDriver";
import { SerializableData } from "./types";

export default function(origin: ResourceDriver, cacheData?: SerializableData) {
  return new CacheDriver(origin, cacheData);
}
