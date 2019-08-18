import * as React from "react";
import { Observable } from "rxjs";
import useRxjs from "use-rxjs";

interface Props<T> {
  component: React.ComponentType<{
    items: T[];
  }>;
  items$: Observable<T[]>;
}

export default function ListLoader<T>({ items$, component: Component }: Props<T>) {
  const items = useRxjs(items$);

  if (!items) {
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        Loading...
      </div>
    );
  }

  return <Component items={items} />;
}
