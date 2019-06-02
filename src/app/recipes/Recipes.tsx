import * as React from "react";
import { BehaviorSubject } from "rxjs";
import { mergeMap, tap } from "rxjs/operators";
import { useRecipes } from "../../entities/recipes";
import RecipesHeader, { SearchQuery } from "./RecipesHeader";
import RecipesList from "./RecipesList";
import useInstance from "../../hooks/useInstance";
import ListLoader from "../../components/ListLoader";
import { RouteComponentProps } from "react-router";
import * as qs from "query-string";

interface Props extends RouteComponentProps {}

export default function Recipes({ history, location }: Props) {
  // Получаем доступ к ресурсу
  const recipes = useRecipes();

  // Поисковой запрос
  const searchQuery$ = useInstance(
    () => new BehaviorSubject<SearchQuery>(extractQuery(location.search))
  );

  // Список рецептов
  const items$ = useInstance(() =>
    searchQuery$.pipe(
      tap(query => history.replace(generateUrl(query))),
      mergeMap(query => recipes.search({ query: query || undefined }))
    )
  );

  return (
    <>
      <RecipesHeader searchQuery$={searchQuery$} />
      <ListLoader items$={items$} component={RecipesList} />
    </>
  );
}

function generateUrl(query: SearchQuery) {
  const path = "/recipes";

  if (query === null) {
    return path;
  }

  return `/recipes/?${qs.stringify({
    query
  })}`;
}

function extractQuery(search: string): SearchQuery {
  const { query } = qs.parse(search);

  if (query === undefined) {
    return null;
  }

  if (Array.isArray(query)) {
    return query[0];
  }

  return query;
}
