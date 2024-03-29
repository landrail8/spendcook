import * as React from "react";
import { Route, Switch } from "react-router";
import Navigation from "./Navigation";
import Recipes from "./recipes/Recipes";
import Recipe from "./recipe/Recipe";
import Menu from "./menu/Menu";
import Stock from "./stock/Stock";
import Shopping from "./shopping/Shopping";
import RecipeForm from "./recipe_form/RecipeForm";
import { GlobalStyle } from "../ui";

export default function App() {
  return (
    <>
      <GlobalStyle/>
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
