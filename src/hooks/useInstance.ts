import { useRef } from "react";

type InstanceFactory<T> = () => T;

export default function useInstance<T>(initializer: InstanceFactory<T>): T {
  const instanceRef = useRef<T | null>(null);

  if (instanceRef.current === null) {
    instanceRef.current = initializer();
  }

  return instanceRef.current;
}
