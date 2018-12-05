import * as React from "react";
import { hydrate } from "react-dom";
import App from "./components/App";
import { APP_CONTAINER_ID } from "./constants";

hydrate(<App />, document.getElementById(APP_CONTAINER_ID));
