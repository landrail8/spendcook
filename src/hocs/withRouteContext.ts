import * as React from "react";
import { RouteComponentProps, withRouter, matchPath } from "react-router-dom";
import { compose, mapProps } from "recompose";
import KitchenIcon from "@material-ui/icons/Kitchen";
import BookIcon from "@material-ui/icons/Book";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

interface RouteInfo {
  path: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGElement>>;
}

const routes = [
  {
    label: "Рецепты",
    icon: BookIcon,
    path: "/"
  },
  {
    label: "Меню",
    icon: AssignmentIcon,
    path: "/menu"
  },
  {
    label: "Остатки",
    icon: KitchenIcon,
    path: "/stock"
  },
  {
    label: "Покупки",
    icon: ShoppingCartIcon,
    path: "/shopping"
  }
] as RouteInfo[];

export interface RouteContextProps extends RouteInfo {
  routes: RouteInfo[];
  index: number;
}

function mapRoutingProps({ location }: RouteComponentProps): RouteContextProps {
  const index = routes.reduceRight(
    (acc, { path }, value) =>
      matchPath(location.pathname, {
        path,
        exact: true,
        strict: false
      })
        ? value
        : acc,
    0
  );

  const activeRoute = routes[index];

  return {
    ...activeRoute,
    routes,
    index
  };
}

export default compose<RouteContextProps, {}>(
  withRouter,
  mapProps(mapRoutingProps)
);
