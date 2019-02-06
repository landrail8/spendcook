import * as React from "react";

import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import withRouteContext, { RouteContextProps } from "../hocs/withRouteContext";

interface Props extends RouteContextProps {}

function Header({ label }: Props) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          {label}
        </Typography>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default withRouteContext(Header);
