import * as React from "react";
import { CssBaseline } from "@material-ui/core";
import Navigation from "./Navigation";
import { Route, Switch } from "react-router";
import Recipes from "./recipes/Recipes";
import Recipe from "./recipe/Recipe";
import Menu from "./menu/Menu";
import Stock from "./stock/Stock";
import Shopping from "./shopping/Shopping";
import RecipeForm from "./RecipeForm";

export default function App() {
  return (
    <>
      <CssBaseline />
      <Switch>
        <Route path="/" exact component={Recipes} />
        <Route path="/recipes" exact component={Recipes} />
        <Route path="/recipes/create" component={RecipeForm} />
        <Route path="/recipes/:id" component={Recipe} />
        <Route path="/menu" component={Menu} />
        <Route path="/stock" component={Stock} />
        <Route path="/shopping" component={Shopping} />
      </Switch>
      <Navigation />
    </>
  );
}
