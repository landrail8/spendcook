import * as React from "react";
import { Recipe } from "../../entities/recipes";
import * as S from "./styled";

interface Props {
  items: Recipe[];
}

export default function RecipesList({ items }: Props) {
  return (
    <S.List>
      {items.map(({ id, title }) => (
        <S.ListItem key={id}>
          <S.ListLink to={`/recipes/${id}`}>
            <S.ListTitle>{title}</S.ListTitle>
          </S.ListLink>
        </S.ListItem>
      ))}
    </S.List>
  );
}
