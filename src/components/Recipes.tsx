import * as React from "react";
import { BehaviorSubject } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import useRx from "use-rxjs";
import { useRecipes } from "../entities/recipes";
import RecipesHeader, { SearchQuery } from "./RecipesHeader";
import RecipesList from "./RecipesList";

export default function Recipes() {
  // Получаем доступ к ресурсу
  const recipes = useRecipes();

  // Настраиваем общий observable
  const { searchQuery, setSearchQuery, items } = useRx(() => {
    const searchQuery$ = new BehaviorSubject<SearchQuery>(null);

    return searchQuery$.pipe(
      mergeMap(searchQuery =>
        recipes.search({ query: searchQuery }).pipe(
          map(items => ({
            items,
            searchQuery,
            setSearchQuery: (value: string) => searchQuery$.next(value)
          }))
        )
      )
    );
  });

  return (
    <>
      <RecipesHeader searchQuery={searchQuery} onSearch={setSearchQuery} />
      <RecipesList items={items} />
    </>
  );
}
