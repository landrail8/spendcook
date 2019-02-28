import * as React from "react";
import { ResourceDescriptor } from "./resource";
import { useContext } from "react";
import { ResourceRegistry } from "./makeResourceRegistry";

const context = React.createContext<ResourceRegistry | null>(null);
export const ResourceProvider = context.Provider;

export function useResource<E, F>(descriptor: ResourceDescriptor<E, F>) {
  const { access } = useContext(context)!;

  return access<E, F>(descriptor);
}
