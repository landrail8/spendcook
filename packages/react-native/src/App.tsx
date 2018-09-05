import React, { Component } from "react";
import {
  NavigatorIOS,
  Platform,
  StyleSheet,
  TabBarIOS,
  Text,
  View
} from "react-native";
import Menu from "./components/Menu";
import Recipes from "./components/Recipes";
import ShoppingList from "./components/ShoppingList";
import Stock from "./components/Stock";

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
              style={{flex: 1}}
            />
          </TabBarIOS.Item>
        ))}
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
