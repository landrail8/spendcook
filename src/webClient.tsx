import * as React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./app/App";
import {
  APP_CONTAINER_ID,
  CACHE_CONTAINER_ID,
  STYLES_CONTAINER_ID
} from "./constants";
import { createGenerateClassName, MuiThemeProvider } from "@material-ui/core";
import createTheme from "./theme/createTheme";
import { JssProvider } from "react-jss";
import { useEffect } from "react";
import { ResourceProvider } from "./resource/resourceContext";
import { makeFetchDriver } from "./resource/driver/fetch";
import { makeCacheDriver, SerializableData } from "./resource/driver/cache";

const generateClassName = createGenerateClassName();
const theme = createTheme();
const cacheData: SerializableData = JSON.parse(
  document.getElementById(CACHE_CONTAINER_ID)!.innerText
);
const driver = makeCacheDriver(makeFetchDriver(), cacheData);

hydrate(
  <ResourceProvider driver={driver}>
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
