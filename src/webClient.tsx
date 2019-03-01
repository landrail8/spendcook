import * as React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./app/App";
import { APP_CONTAINER_ID, STYLES_CONTAINER_ID } from "./constants";
import { createGenerateClassName, MuiThemeProvider } from "@material-ui/core";
import createTheme from "./theme/createTheme";
import { JssProvider } from "react-jss";
import { useEffect } from "react";
import { ResourceProvider } from "./resource/resourceContext";
import makeResourceRegistry from "./resource/makeResourceRegistry";
import { makeFetchResource } from "./resource/factory/fetch";

const generateClassName = createGenerateClassName();
const theme = createTheme();
const registry = makeResourceRegistry(makeFetchResource);

hydrate(
  <ResourceProvider value={registry}>
    <Router>
      <JssProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <AppWrapper />
        </MuiThemeProvider>
      </JssProvider>
    </Router>
  </ResourceProvider>,
  document.getElementById(APP_CONTAINER_ID)
);

function AppWrapper() {
  useEffect(() => {
    const jssStyles = document.getElementById(STYLES_CONTAINER_ID);
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return <App />;
}
