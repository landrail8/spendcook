import { Entity, Resource, describeResource, useResource } from "../resource";

export interface Recipe extends Entity {
  title: string;
  description: string;
}

export const recipesDescriptor = describeResource<Recipe>({
  name: "recipes",
  filter: (item, filter) => {
    const filterQuery = filter.query && filter.query.toLocaleLowerCase();
    const filterId = filter.id;

    const itemTitle = item.title.toLocaleLowerCase();
    const itemId = item._id.toString();

    if (filterQuery && !itemTitle.includes(filterQuery)) {
      return false;
    }

    if (filterId && itemId !== filterId) {
      return false;
    }

    return true;
  }
});

export function useRecipes(): Resource<Recipe> {
  return useResource(recipesDescriptor);
}
