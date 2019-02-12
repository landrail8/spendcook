import * as React from "react";
import { interval } from "rxjs";
import useRx from "use-rxjs";

export default function Recipes() {
  const value = useRx(() => interval(1000));

  return <p>Здесь будут рецепты {value}</p>;
}
