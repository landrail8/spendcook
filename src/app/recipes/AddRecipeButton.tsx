import * as React from "react";
import { Add } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { FloatingActionButton } from "../../ui";

export default function AddRecipeButton() {
  return (
    <FloatingActionButton
      as={Link}
      to="/recipes/create"
      aria-label="Добавить рецепт"
      children={<Add />}
    />
  );
}
