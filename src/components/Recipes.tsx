import * as React from "react";
import { BehaviorSubject } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { useRecipes } from "../entities/recipes";
import RecipesHeader, { SearchQuery } from "./RecipesHeader";
import RecipesList from "./RecipesList";
import useInstance from "../hooks/useInstance";

export default function Recipes() {
  // Получаем доступ к ресурсу
  const recipes = useRecipes();

  // Поисковой запрос
  const searchQuery$ = useInstance(
    () => new BehaviorSubject<SearchQuery>(null)
  );

  // Список рецептов
  const items$ = useInstance(() =>
    searchQuery$.pipe(
      mergeMap(searchQuery => recipes.search({ query: searchQuery }))
    )
  );

  return (
    <>
      <RecipesHeader searchQuery$={searchQuery$} />
      <RecipesList items$={items$} />
    </>
  );
}
