import * as React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./app/App";
import { APP_CONTAINER_ID, CACHE_CONTAINER_ID } from "./constants";
import { ResourceCache, ResourceProvider } from "./resource";
import mapResources from "./resource/mapResources";
import ResourceFetch from "./resource/ResourceFetch";
import { recipesDescriptor } from "./entities/recipes";

const cacheData = JSON.parse(
  document.getElementById(CACHE_CONTAINER_ID)!.innerText
);

hydrate(
  <ResourceProvider
    map={mapResources(
      new ResourceCache(new ResourceFetch(recipesDescriptor), cacheData)
    )}
  >
    <Router>
      <App />
    </Router>
  </ResourceProvider>,
  document.getElementById(APP_CONTAINER_ID)
);
