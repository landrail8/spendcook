import React from "react";
import express from "express";
import { ServerStyleSheet } from "styled-components";
import { StaticRouter as Router } from "react-router-dom";
import { renderToString } from "react-dom/server";
import App from "./app/App";
import generateHtml from "./utils/generateHtml";
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

  // Создаем копилку стилей
  const styleSheet = new ServerStyleSheet();

  // StaticRouter context
  const routerContext = {};

  const recipesCache = new ResourceCache(recipes);

  const render = (styleSheet: ServerStyleSheet) => {
    return renderToString(
      styleSheet.collectStyles(
        <ResourceProvider map={mapResources(recipesCache)}>
          <Router location={req.url} context={routerContext}>
            <App />
          </Router>
        </ResourceProvider>
      )
    );
  };

  // Запускаем процесс сбора требований
  render(new ServerStyleSheet());

  // Ждем сбора данных
  const cacheData = await recipesCache.release();

  // Рендерим повторно с данными
  const markup = render(styleSheet);

  // Достаем CSS копилки
  const styles = styleSheet.getStyleTags();

  // Отправляем html клиенту
  res.send(
    generateHtml({
      cacheData,
      markup,
      styles
    })
  );
});

app.listen(8080, () => {
  console.log("Spendcook app is listening port 8080!");
});
