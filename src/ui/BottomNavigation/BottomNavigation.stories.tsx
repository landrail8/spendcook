import * as React from "react";
import { storiesOf } from "@storybook/react";
import { BottomNavigation, BottomNavigationAction } from "./index";
import { Book, Kitchen, Assignment, ShoppingCart } from "@material-ui/icons";

storiesOf("BottomNavigation", module).add("Обычное состояние", () => (
  <BottomNavigation>
    <BottomNavigationAction
      href="#"
      className="active"
      icon={<Book />}
      label="Рецепты"
    />
    <BottomNavigationAction href="#" icon={<Assignment />} label="Меню" />
    <BottomNavigationAction href="#" icon={<Kitchen />} label="Остатки" />
    <BottomNavigationAction href="#" icon={<ShoppingCart />} label="Покупки" />
  </BottomNavigation>
));
