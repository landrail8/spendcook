import React, { Component } from "react";
import { NavigatorIOS, TabBarIOS } from "react-native";
import Menu from "./Menu";
import Recipes from "./Recipes";
import ShoppingList from "./ShoppingList";
import Stock from "./Stock";

const routes = [
  {
    key: "recipes",
    title: "Рецепты",
    component: Recipes
  },
  {
    key: "menu",
    title: "Меню",
    component: Menu
  },
  {
    key: "shopping-list",
    title: "Список покупок",
    component: ShoppingList
  },
  {
    key: "stock",
    title: "Остатки",
    component: Stock
  }
];

type Props = {};

const initialState = {
  route: "shopping-list"
};

type State = typeof initialState;

export default class App extends Component<Props, State> {
  state = initialState;

  render() {
    const { route } = this.state;

    return (
      <TabBarIOS>
        {routes.map(({ key, title, component }) => (
          <TabBarIOS.Item
            key={key}
            title={title}
            selected={route === key}
            onPress={() =>
              this.setState({
                route: key
              })
            }
          >
            <NavigatorIOS
              initialRoute={{
                title,
                component
              }}
              style={{ flex: 1 }}
            />
          </TabBarIOS.Item>
        ))}
      </TabBarIOS>
    );
  }
}
