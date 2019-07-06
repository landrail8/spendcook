import * as React from "react";
import { Entity, ResourceDescriptor, ResourceDriver } from "./types";
import { useContext } from "react";
import makeResource from "./makeResource";

const context = React.createContext<ResourceDriver | null>(null);

interface Props {
  driver: ResourceDriver;
  children: JSX.Element;
}

export function ResourceProvider({ driver, children }: Props) {
  const { Provider } = context;

  return <Provider value={driver}>{children}</Provider>;
}

export function useResource<E extends Entity>(
  descriptor: ResourceDescriptor<E>
) {
  const driver = useContext(context);

  return makeResource(driver!, descriptor);
}
