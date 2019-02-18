import * as React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import { APP_CONTAINER_ID, STYLES_CONTAINER_ID } from "./constants";
import { createGenerateClassName, MuiThemeProvider } from "@material-ui/core";
import createTheme from "./theme/createTheme";
import { JssProvider } from "react-jss";

const generateClassName = createGenerateClassName();
const theme = createTheme();

class AppWrapper extends React.Component {
  componentDidMount() {
    const jssStyles = document.getElementById(STYLES_CONTAINER_ID);
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return <App />;
  }
}


hydrate(
  <Router>
    <JssProvider generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        <AppWrapper />
      </MuiThemeProvider>
    </JssProvider>
  </Router>,
  document.getElementById(APP_CONTAINER_ID)
);