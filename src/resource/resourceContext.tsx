import * as React from "react";
import { Entity, ResourceDescriptor } from "./types";
import { useContext } from "react";
import { ResourceMap } from "./mapResources";
import Resource from "./Resource";

const context = React.createContext<ResourceMap | null>(null);

interface Props {
  map: ResourceMap;
  children: JSX.Element;
}

export function ResourceProvider({ map, children }: Props) {
  const { Provider } = context;

  return <Provider value={map}>{children}</Provider>;
}

export function useResource<E extends Entity>(
  descriptor: ResourceDescriptor<E>
) {
  const map = useContext(context);

  return map!.get(descriptor) as Resource<E>;
}
