import * as React from "react";
import * as S from "./styled";
import { PropsWithAs } from "../types";

type Props<O extends object> = PropsWithAs<O, React.PropsWithChildren<{}>>;

export default function Card<P extends {}>(props: Props<P>) {
  return <S.Card {...props} />;
}
