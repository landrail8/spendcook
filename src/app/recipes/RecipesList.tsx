import * as React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Recipe } from "../../entities/recipes";
import linkTo from "../../utils/linkTo";

interface Props {
  items: Recipe[];
}

export default function RecipesList({ items }: Props) {
  return (
    <List>
      {items.map(({ id, title, description }) => (
        <ListItem button {...linkTo(`/recipes/${id}`)} key={id}>
          <div style={{ width: 100, height: 56, backgroundColor: "#ccc" }} />
          <ListItemText primary={title} secondary={description} />
        </ListItem>
      ))}
    </List>
  );
}
