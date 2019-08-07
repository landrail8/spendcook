import * as React from "react";
import * as express from "express";
import { ServerStyleSheet } from "styled-components";
import { StaticRouter as Router } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { ServerStyleSheets, ThemeProvider } from "@material-ui/styles";
import App from "./app/App";
import generateHtml from "./utils/generateHtml";
import createTheme from "./theme/createTheme";
import { ResourceCache, ResourceProvider } from "./resource";
import makeApiMiddleware from "./resource/makeApiMiddleware";
import mapResources from "./resource/mapResources";
import { recipesDescriptor } from "./entities/recipes";
import ResourceFs from "./resource/ResourceFs";

const app = express();

const IS_DEV = process.env.NODE_ENV !== "production";

if (IS_DEV) {
  app.use("/assets", express.static("dist"));
}

const recipes = new ResourceFs(recipesDescriptor);
const resourceMap = mapResources(recipes);

app.use("/api", makeApiMiddleware(resourceMap));

app.get("*", async function(req, res) {
  console.log("request:", req.path);

  // Создаем JSS копилку стилей
  const sheets = new ServerStyleSheets();
  const styleSheet = new ServerStyleSheet();

  // StaticRouter context
  const routerContext = {};

  const recipesCache = new ResourceCache(recipes);

  const render = (sheets: ServerStyleSheets, styleSheet: ServerStyleSheet) => {
    // Создаем тему
    const theme = createTheme();

    return renderToString(
      styleSheet.collectStyles(
        sheets.collect(
          <ResourceProvider map={mapResources(recipesCache)}>
            <Router location={req.url} context={routerContext}>
              <ThemeProvider theme={theme}>
                <App />
              </ThemeProvider>
            </Router>
          </ResourceProvider>
        )
      )
    );
  };

  // Запускаем процесс сбора требований
  render(new ServerStyleSheets(), new ServerStyleSheet());

  // Ждем сбора данных
  const cacheData = await recipesCache.release();

  // Рендерим повторно с данными
  const markup = render(sheets, styleSheet);

  // Достаем CSS из JSS копилки
  const css = sheets.toString()

  // Достаем CSS из JSS копилки
  const styles = styleSheet.getStyleTags();

  // Отправляем html клиенту
  res.send(
    generateHtml({
      cacheData,
      markup,
      css,
      styles
    })
  );
});

app.listen(8080, () => {
  console.log("Spendcook app is listening port 8080!");
});
