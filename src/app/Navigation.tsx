import * as React from "react";
import { NavLink } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "../ui";
import { Book, Assignment, Kitchen, ShoppingCart } from "@material-ui/icons";

export default function Navigation() {
  return (
    <BottomNavigation>
      <BottomNavigationAction
        as={NavLink}
        icon={<Book />}
        label="Рецепты"
        to="/recipes"
      />
      <BottomNavigationAction
        as={NavLink}
        icon={<Assignment />}
        label="Меню"
        to="/menu"
      />
      <BottomNavigationAction
        as={NavLink}
        icon={<Kitchen />}
        label="Остатки"
        to="/stock"
      />
      <BottomNavigationAction
        as={NavLink}
        icon={<ShoppingCart />}
        label="Покупки"
        to="/shopping"
      />
    </BottomNavigation>
  );
}
