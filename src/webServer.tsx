import * as React from "react";
import * as express from "express";
import { StaticRouter as Router } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { ServerStyleSheets, ThemeProvider } from "@material-ui/styles";
import App from "./app/App";
import generateHtml from "./utils/generateHtml";
import createTheme from "./theme/createTheme";
import { ResourceProvider } from "./resource";
import { makeFsDriver } from "./resource/driver/fs";
import { makeCacheDriver } from "./resource/driver/cache";
import makeApiMiddleware from "./resource/makeApiMiddleware";

const app = express();
const fsDriver = makeFsDriver();
const IS_DEV = process.env.NODE_ENV !== "production";

if (IS_DEV) {
  app.use("/assets", express.static("dist"));
}

app.use("/api", makeApiMiddleware(fsDriver));

app.get("*", async function(req, res) {
  console.log("request:", req.path);

  // Создаем JSS копилку стилей
  const sheets = new ServerStyleSheets();

  // StaticRouter context
  const routerContext = {};

  const cacheDriver = makeCacheDriver(fsDriver);

  const makeJsx = (sheets: ServerStyleSheets) => {
    // Создаем тему
    const theme = createTheme();

    return sheets.collect(
      <ResourceProvider driver={cacheDriver}>
        <Router location={req.url} context={routerContext}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </Router>
      </ResourceProvider>
    );
  };

  // Запускаем процесс сбора требований
  renderToString(makeJsx(new ServerStyleSheets()));

  // Ждем сбора данных
  const cacheData = await cacheDriver.release();

  // Рендерим повторно с данными
  const markup = renderToString(makeJsx(sheets));

  // Достаем CSS из JSS копилки
  const css = sheets.toString();

  // Отправляем html клиенту
  res.send(
    generateHtml({
      cacheData,
      markup,
      css
    })
  );
});

app.listen(8080, () => {
  console.log("Spendcook app is listening port 8080!");
});
