import { map } from "rxjs/operators";
import { Entity, Resource, describeResource, useResource } from "../resource";

export interface Recipe extends Entity {
  title: string;
  description: string;
}

export const recipesDescriptor = describeResource<Recipe>({
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

export function useRecipes(): Resource<Recipe> {
  return useResource(recipesDescriptor);
}
