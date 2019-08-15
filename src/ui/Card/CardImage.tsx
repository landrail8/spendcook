import * as React from "react";
import * as S from "./styled";

type Props = React.ImgHTMLAttributes<HTMLElement>;

export default function Card({ className, style, alt, src, ...props }: Props) {
  return (
    <S.CardImage className={className} style={style} {...props}>
      {src && <img src={src} alt={alt} />}
    </S.CardImage>
  );
}
