import * as React from "react";
import * as S from "./styled";
import { PropsWithAs } from "../types";

export interface Props extends React.ComponentProps<typeof S.StaticWrapper> {}

export default function BottomNavigationAction<O extends object>({
  children,
  ...props
}: PropsWithAs<O, Props>) {
  return (
    <S.StaticWrapper {...props}>
      <S.FloatingWrapper>{children}</S.FloatingWrapper>
    </S.StaticWrapper>
  );
}
