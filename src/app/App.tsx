import * as React from "react";
import { CssBaseline } from "@material-ui/core";
import Navigation from "./Navigation";
import { Route } from "react-router";
import Recipes from "./recipes/Recipes";
import Recipe from "./recipe/Recipe";
import Menu from "./menu/Menu";
import Stock from "./stock/Stock";
import Shopping from "./shopping/Shopping";

export default function App() {
  return (
    <>
      <CssBaseline />
      <Route path="/" exact component={Recipes} />
      <Route path="/recipes/:id" component={Recipe} />
      <Route path="/menu" component={Menu} />
      <Route path="/stock" component={Stock} />
      <Route path="/shopping" component={Shopping} />
      <Navigation />
    </>
  );
}
