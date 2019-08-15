import * as React from "react";
import * as S from "./styled";

type PropsWithAs<O extends object, I extends object = {}> = O &
  I & {
    as?: React.ComponentType<O> | JSX.IntrinsicElements;
  };

type Props<O extends object> = PropsWithAs<O, React.PropsWithChildren<{}>>;

export default function Card<P extends {}>(props: Props<P>) {
  return <S.Card {...props} />;
}
