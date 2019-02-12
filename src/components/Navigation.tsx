import * as React from "react";
import { Link, LinkProps, matchPath, withRouter } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { BottomNavigationActionProps } from "@material-ui/core/BottomNavigationAction";
import withRouteContext, { RouteContextProps } from "../hocs/withRouteContext";

const NavigationAction = BottomNavigationAction as React.ComponentType<
  LinkProps | BottomNavigationActionProps
>;

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
        <NavigationAction
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
