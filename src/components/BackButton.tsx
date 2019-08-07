import { ArrowBack } from "@material-ui/icons";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";

interface Props
  extends RouteComponentProps<any>,
    React.ButtonHTMLAttributes<HTMLButtonElement> {}

function BackButton({ history, staticContext, ...props }: Props) {
  return <button onClick={historyBack} children={<ArrowBack />} {...props} />;

  function historyBack(e: React.MouseEvent) {
    e.preventDefault();
    history.goBack();
  }
}

export default withRouter(BackButton);
