import * as React from "react";
import { Add as AddIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { FloatingActionButton } from "../../ui";

export default function AddRecipeButton() {
  return (
    <FloatingActionButton
      as={Link}
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
