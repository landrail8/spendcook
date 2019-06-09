import * as React from "react";
import { Link } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import withRouteContext, { RouteContextProps } from "../hocs/withRouteContext";

interface Props extends RouteContextProps {}

function Navigation({ index: value, routes }: Props) {
  return (
    <BottomNavigation
      style={{
        width: "100%",
        position: "fixed",
        bottom: 0
      }}
      value={value}
      showLabels
    >
      {routes.map(({ path, label, icon: IconComponent }, value) => (
        <BottomNavigationAction
          key={value}
          value={value}
          label={label}
          icon={<IconComponent />}
          component={Link}
          to={path}
        />
      ))}
    </BottomNavigation>
  );
}

export default withRouteContext(Navigation);
