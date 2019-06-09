import * as React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Recipe } from "../../entities/recipes";
import { Link } from "react-router-dom";

interface Props {
  items: Recipe[];
}

export default function RecipesList({ items }: Props) {
  return (
    <List>
      {items.map(({ id, title, description }) => (
        <ListItem button component={Link} to={`/recipes/${id}`} key={id}>
          <div
            style={{
              width: 100,
              height: 56,
              backgroundColor: "#ccc",
              marginRight: 16
            }}
          />
          <ListItemText primary={title} secondary={description} />
        </ListItem>
      ))}
    </List>
  );
}
