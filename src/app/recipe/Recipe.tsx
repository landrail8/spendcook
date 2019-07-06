import * as React from "react";
import { RouteComponentProps } from "react-router";
import { AppBar, Toolbar } from "@material-ui/core";
import useRxjs from "use-rxjs";
import { useRecipes } from "../../entities/recipes";
import HeaderTitle from "../../components/Header/HeaderTitle";
import HeaderBack from "../../components/Header/HeaderBack";

interface Props extends RouteComponentProps<RouteParams> {}

interface RouteParams {
  id: string;
}

export default function Recipe({ match }: Props) {
  const { id } = match!.params;
  const recipes = useRecipes();
  const recipe = useRxjs(() => recipes.getById(id));

  const title = recipe ? recipe.title : "Loading...";

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <HeaderBack />
          <HeaderTitle style={{ marginLeft: 32 }}>{title}</HeaderTitle>
        </Toolbar>
      </AppBar>
      {recipe ? recipe.description : "Loading..."}
    </>
  );
}
