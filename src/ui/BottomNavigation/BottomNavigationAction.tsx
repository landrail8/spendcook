import * as React from "react";
import * as S from "./styled";
import { PropsWithAs } from "../types";

export interface Props extends React.ComponentProps<typeof S.Action> {
  icon: JSX.Element;
  label: string;
}

export default function BottomNavigationAction<O extends object>({
  icon,
  label,
  ...props
}: PropsWithAs<O, Props>) {
  return (
    <S.Action {...props}>
      <S.Icon>{icon}</S.Icon>
      <S.Title>{label}</S.Title>
    </S.Action>
  );
}
