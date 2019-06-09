import { ArrowBack } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";

interface Props
  extends RouteComponentProps<any>,
    React.ComponentProps<typeof IconButton> {}

function HeaderBack({ history, staticContext, ...props }: Props) {
  return (
    <IconButton color="inherit" onClick={historyBack} {...props}>
      <ArrowBack />
    </IconButton>
  );

  function historyBack(e: React.MouseEvent) {
    e.preventDefault();
    history.goBack();
  }
}

export default withRouter(HeaderBack);
