import * as React from "react";
import { Recipe } from "../../entities/recipes";
import {
  Card,
  CardImage,
  CardTitle,
  Collection,
  CollectionItem
} from "../../ui";
import { Link } from "react-router-dom";

interface Props {
  items: Recipe[];
}

export default function RecipesList({ items }: Props) {
  return (
    <Collection>
      {items.map(({ id, title }) => (
        <CollectionItem key={id}>
          <Card as={Link} to={`/recipes/${id}`}>
            <CardImage />
            <CardTitle>{title}</CardTitle>
          </Card>
        </CollectionItem>
      ))}
    </Collection>
  );
}
