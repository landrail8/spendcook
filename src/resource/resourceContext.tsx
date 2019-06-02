import * as React from "react";
import { makeResource, ResourceDescriptor, ResourceDriver } from "./resource";
import { useContext } from "react";

const context = React.createContext<ResourceDriver | null>(null);

interface Props {
  driver: ResourceDriver;
  children: JSX.Element;
}

export function ResourceProvider({ driver, children }: Props) {
  const { Provider } = context;

  return <Provider value={driver}>{children}</Provider>;
}

export function useResource<E>(descriptor: ResourceDescriptor<E>) {
  const driver = useContext(context);

  return makeResource(driver!, descriptor);
}
