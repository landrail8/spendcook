import * as React from "react";
import { Add as AddIcon } from "@material-ui/icons";
import { Fab } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function AddRecipeButton() {
  return (
    <Fab
      component={Link}
      to="/recipes/create"
      aria-label="Добавить рецепт"
      style={{
        position: "absolute",
        bottom: 16 + 56,
        right: 16
      }}
      color="primary"
      children={<AddIcon />}
    />
  );
}
