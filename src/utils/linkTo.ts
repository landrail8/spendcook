import { Link, LinkProps } from "react-router-dom";

interface Result {
  component: typeof Link;
}

export default function linkTo(to: LinkProps["to"]) {
  return ({
    component: Link,
    to
  } as Result & LinkProps) as Result;
}
