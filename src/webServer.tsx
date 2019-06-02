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
import App from "./app/App";
import generateHtml from "./utils/generateHtml";
import createTheme from "./theme/createTheme";
import { makeFsDriver } from "./resource/driver/fs";
import makeApiMiddleware from "./resource/apiMiddleware";
import { ResourceProvider } from "./resource/resourceContext";
import { makeCacheDriver } from "./resource/driver/cache";

const app = express();
const fsDriver = makeFsDriver();
const IS_DEV = process.env.NODE_ENV !== "production";

if (IS_DEV) {
  app.use("/assets", express.static("dist"));
}

app.use("/api", makeApiMiddleware(fsDriver));

app.get("*", async function(req, res) {
  console.log('request:',req.path)

  // Создаем JSS копилку стилей
  const sheetsRegistry = new SheetsRegistry();

  // StaticRouter context
  const routerContext = {};

  const cacheDriver = makeCacheDriver(fsDriver);

  const makeJsx = (sheetsRegistry: SheetsRegistry) => {
    // Создаем sheetsManager для material-ui
    const sheetsManager = new Map();

    // Создаем тему
    const theme = createTheme();

    // Создаем генератор классов
    const generateClassName = createGenerateClassName();

    return (
      <ResourceProvider driver={cacheDriver}>
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
    )
  };

  // Запускаем процесс сбора требований
  renderToString(makeJsx(new SheetsRegistry()));

  // Ждем сбора данных
  const cacheData = await cacheDriver.release();

  // Рендерим повторно с данными
  const markup = renderToString(makeJsx(sheetsRegistry));

  // Достаем CSS из JSS копилки
  const css = sheetsRegistry.toString();

  // Отправляем html клиенту
  res.send(
    generateHtml({
      cacheData,
      markup,
      css
    })
  );

  console.log('--------')
});

app.listen(8080, () => {
  console.log("Spendcook app is listening port 8080!");
});
