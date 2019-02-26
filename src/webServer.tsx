import * as React from "react";
import * as express from "express";
import { StaticRouter as Router } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { SheetsRegistry } from "jss";
import { JssProvider } from "react-jss";
import {
  MuiThemeProvider,
  createGenerateClassName
} from "@material-ui/core/styles";
import App from "./components/App";
import generateHtml from "./utils/generateHtml";
import createTheme from "./theme/createTheme";
import makeResourceRegistry from "./resource/makeResourceRegistry";
import makeFsResource from "./resource/factory/fs";
import makeApiMiddleware from "./resource/apiMiddleware";
import { ResourceProvider } from "./resource/resourceContext";

const app = express();
const registry = makeResourceRegistry(makeFsResource);

app.use("/assets", express.static("dist"));
app.use("/api", makeApiMiddleware(registry));

app.get("*", function(req, res) {
  // Создаем JSS копилку стилей
  const sheetsRegistry = new SheetsRegistry();

  // Создаем sheetsManager для material-ui
  const sheetsManager = new Map();

  // Создаем тему
  const theme = createTheme();

  // Создаем генератор классов
  const generateClassName = createGenerateClassName();

  // StaticRouter context
  const routerContext = {};

  // Рисуем вёрстку приложения
  const markup = renderToString(
    <ResourceProvider value={registry}>
      <Router location={req.url} context={routerContext}>
        <JssProvider
          registry={sheetsRegistry}
          generateClassName={generateClassName}
        >
          <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
            <App />
          </MuiThemeProvider>
        </JssProvider>
      </Router>
    </ResourceProvider>
  );

  // Достаем CSS из JSS копилки
  const css = sheetsRegistry.toString();

  // Отправляем html клиенту
  res.send(
    generateHtml({
      markup,
      css
    })
  );
});

app.listen(8080, function() {
  console.log("Example app listening on port 8080!");
});
