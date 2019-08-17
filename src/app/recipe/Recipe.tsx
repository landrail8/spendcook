import * as React from "react";
import { RouteComponentProps } from "react-router";
import {
  Container,
  IconButton,
  Typography
} from "@material-ui/core";
import useRxjs from "use-rxjs";
import { useRecipes } from "../../entities/recipes";
import { BackButton } from "../../components";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { HeaderButton, HeaderTitle, Header } from "../../ui";
import * as S from "./styled";

interface Props extends RouteComponentProps<RouteParams> {}

interface RouteParams {
  id: string;
}

interface Ingridient {
  name: string;
  count: string;
}

const ingridients: Ingridient[] = [
  {
    name: "Рисовая крупа",
    count: "1 стакан"
  },
  {
    name: "Вода",
    count: "2 стакана"
  },
  {
    name: "Молоко",
    count: "2 стакана"
  },
  {
    name: "Сливочное масло",
    count: "4 ст. ложки"
  }
];

export default function Recipe({ match, history }: Props) {
  const { id } = match!.params;
  const recipes = useRecipes();
  const recipe = useRxjs(() => recipes.getById(id));

  if (!recipe) {
    return null;
  }

  const { title, description } = recipe;

  function onDelete() {
    confirm(`Удалить ${title}?`);
    recipes.deleteById(id).subscribe(() => history.goBack());
  }

  return (
    <>
      <Header>
        <HeaderButton as={BackButton} />
        <HeaderTitle style={{ marginLeft: 32 }}>{title}</HeaderTitle>
        <IconButton onClick={onDelete} color="inherit">
          <DeleteIcon />
        </IconButton>
      </Header>
      <S.Container>
        <S.Title>Ингридиенты</S.Title>
        <S.IngridientList>
          {ingridients.map(ingridient => (
            <S.IngridientItem key={ingridient.name}>
              {generateIngridientLine(ingridient)}
            </S.IngridientItem>
          ))}
        </S.IngridientList>
        <S.Title>Инструкция</S.Title>
        {description.split("\n").map((text, key) => (
          <S.Description key={key}>{text}</S.Description>
        ))}
      </S.Container>
    </>
  );
}

function generateIngridientLine({ name, count }: Ingridient, size = 40) {
  const dotsCount = size - name.length - count.length - 2;
  const dots = new Array(dotsCount).fill(".").join("");

  return `${name} ${dots} ${count}`;
}
