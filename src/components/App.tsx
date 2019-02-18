import * as React from "react";
import { CssBaseline } from "@material-ui/core";
import Navigation from "./Navigation";
import { Route } from "react-router";
import Recipes from "./Recipes";
import Shopping from "./Shopping";
import Menu from "./Menu";
import Stock from "./Stock";

export default function App() {
  return (
    <>
      <CssBaseline />
      <Route path="/" exact component={Recipes} />
      <Route path="/menu" component={Menu} />
      <Route path="/stock" component={Stock} />
      <Route path="/shopping" component={Shopping} />
      <Navigation />
    </>
  );
}
