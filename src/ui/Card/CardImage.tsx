import * as React from "react";
import * as S from "./styled";
import useResizeObserver from "use-resize-observer";

type Props = React.ComponentProps<typeof S.CardImage>;

export default function Card(props: Props) {
  const [imageRef, imageWidth] = useResizeObserver<HTMLDivElement>();

  return (
    <S.CardImage
      ref={imageRef}
      style={{
        height: imageWidth / 2.4
      }}
      {...props}
    />
  );
}
