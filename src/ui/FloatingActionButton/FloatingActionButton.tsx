import * as React from "react";
import { PropsWithAs } from "../types";
import * as S from "./styled";

export default function FloatingActionButton<O extends object>(
  props: PropsWithAs<O, React.ComponentProps<typeof S.Button>>
) {
  return <S.Button {...props} />;
}
