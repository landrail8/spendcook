import * as React from "react";

import { AppBar, Toolbar } from "@material-ui/core";

interface Props {
  children: React.ReactNode;
}

export default function Header({ children }: Props) {
  return (
    <AppBar position="static">
      <Toolbar>{children}</Toolbar>
    </AppBar>
  );
}
