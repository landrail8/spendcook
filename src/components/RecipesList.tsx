import * as React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Recipe } from "../entities/recipes";

interface Props {
  items: Recipe[];
}

export default function RecipesList({ items }: Props) {
  return (
    <List>
      {items.map(({ id, title, description }) => (
        <React.Fragment key={id}>
          <ListItem button>
            <div style={{ width: 100, height: 56, backgroundColor: "#ccc" }} />
            <ListItemText primary={title} secondary={description} />
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );
}
