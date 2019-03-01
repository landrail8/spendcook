import * as React from "react";
import { RouteComponentProps } from "react-router";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import useRxjs from "use-rxjs";
import linkTo from "../../utils/linkTo";
import { useRecipes } from "../../entities/recipes";
import { map } from "rxjs/operators";

interface Props extends RouteComponentProps<RouteParams> {}

interface RouteParams {
  id: string;
}

export default function Recipe({ match }: Props) {
  const { id } = match!.params;
  const recipes = useRecipes();
  const recipe = useRxjs(() =>
    recipes.search({ id }).pipe(map(items => items[0]))
  );

  const title = recipe ? recipe.title : "Loading...";

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" {...linkTo("/")}>
            <ArrowBack />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            style={{ flexGrow: 1, marginLeft: 32 }}
          >
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}
