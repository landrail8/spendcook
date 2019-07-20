import * as React from "react";
import { RouteComponentProps } from "react-router";
import { IconButton } from "@material-ui/core";
import useRxjs from "use-rxjs";
import { useRecipes } from "../../entities/recipes";
import HeaderTitle from "../../components/Header/HeaderTitle";
import HeaderBack from "../../components/Header/HeaderBack";
import { Delete as DeleteIcon } from "@material-ui/icons";
import Header from "../../components/Header/Header";

interface Props extends RouteComponentProps<RouteParams> {}

interface RouteParams {
  id: string;
}

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
        <HeaderBack />
        <HeaderTitle style={{ marginLeft: 32 }}>{title}</HeaderTitle>
        <IconButton onClick={onDelete} color="inherit">
          <DeleteIcon />
        </IconButton>
      </Header>
      {description}
    </>
  );
}
