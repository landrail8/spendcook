import * as React from "react";
import * as S from "./styled";

type Props = React.ComponentProps<typeof S.Card>;

export default function Card(props: Props) {
  return <S.Card {...props} />;
}
