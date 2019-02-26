import { map } from "rxjs/operators";
import { useResource } from "../resource/resourceContext";
import describeResource from "../resource/describeResource";

export interface Recipe {
  id: number;
  title: string;
  description: string;
}

export interface SearchOptions {
  query?: string | null;
}

export const recipesDescriptor = describeResource<Recipe, SearchOptions>({
  name: "recipes",
  applyFilter(recipes$, { query }) {
    return recipes$.pipe(
      map(items =>
        items.filter(item => {
          if (!query) {
            return true;
          }

          return (
            item.title.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) >
            -1
          );
        })
      )
    );
  }
});

export function useRecipes() {
  return useResource(recipesDescriptor);
}
