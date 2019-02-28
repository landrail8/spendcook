import { map } from "rxjs/operators";
import { useResource } from "../resource/resourceContext";
import describeResource from "../resource/describeResource";
import { Resource } from "../resource/resource";

export interface Recipe {
  id: number;
  title: string;
  description: string;
}

export interface SearchOptions {
  query?: string | null;
  id?: string;
}

export const recipesDescriptor = describeResource<Recipe, SearchOptions>({
  name: "recipes",
  applyFilter(recipes$, filter) {
    return recipes$.pipe(
      map(items =>
        items.filter(item => {
          const filterQuery = filter.query && filter.query.toLocaleLowerCase();
          const filterId = filter.id;

          const itemTitle = item.title.toLocaleLowerCase();
          const itemId = item.id.toString();

          if (filterQuery && !itemTitle.includes(filterQuery)) {
            return false;
          }

          if (filterId && itemId !== filterId) {
            return false;
          }

          return true;
        })
      )
    );
  }
});

export function useRecipes(): Resource<Recipe, SearchOptions> {
  return useResource(recipesDescriptor);
}
