import * as React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import { APP_CONTAINER_ID } from "./constants";

hydrate(
  <Router>
    <App />
  </Router>,
  document.getElementById(APP_CONTAINER_ID)
);
