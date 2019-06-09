import * as React from "react";
import { useRecipes } from "../../entities/recipes";
import Header from "../../components/Header/Header";
import HeaderBack from "../../components/Header/HeaderBack";
import HeaderTitle from "../../components/Header/HeaderTitle";

export default function RecipeForm() {
  const recipes = useRecipes();

  return (
    <>
      <Header>
        <HeaderBack />
        <HeaderTitle style={{ marginLeft: 32 }}>Добавить рецепт</HeaderTitle>
      </Header>
    </>
  );
}
