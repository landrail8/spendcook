import * as React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./app/App";
import {
  APP_CONTAINER_ID,
  CACHE_CONTAINER_ID,
  STYLES_CONTAINER_ID
} from "./constants";
import { ThemeProvider } from "@material-ui/styles";
import createTheme from "./theme/createTheme";
import { useEffect } from "react";
import { makeResource, ResourceCache, ResourceProvider } from "./resource";
import { makeFetchDriver } from "./resource/driver/fetch";
import mapResources from "./resource/mapResources";
import { recipesDescriptor } from "./entities/recipes";

const theme = createTheme();
const cacheData = JSON.parse(
  document.getElementById(CACHE_CONTAINER_ID)!.innerText
);

hydrate(
  <ResourceProvider
    map={mapResources(
      new ResourceCache(
        makeResource(makeFetchDriver(), recipesDescriptor),
        cacheData
      )
    )}
  >
    <Router>
      <ThemeProvider theme={theme}>
        <AppWrapper />
      </ThemeProvider>
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
