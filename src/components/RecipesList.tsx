import * as React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Recipe } from "../entities/recipes";
import { Observable } from "rxjs";
import useRxjs from "use-rxjs";

interface Props {
  items$: Observable<Recipe[]>;
}

export default function RecipesList({ items$ }: Props) {
  const items = useRxjs(items$);

  if (!items) {
    return null;
  }

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
