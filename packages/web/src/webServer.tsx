import * as React from "react";
import * as express from "express";
import * as proxy from "express-http-proxy";
import { StaticRouter as Router } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { SheetsRegistry } from "jss";
import { JssProvider } from "react-jss";
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName
} from "@material-ui/core/styles";
import App from "./components/App";
import generateHtml from "./utils/generateHtml";

const app = express();

app.use("/api", proxy("localhost:8081"));

app.get("*", function(req, res) {
  // Создаем JSS копилку стилей
  const sheetsRegistry = new SheetsRegistry();

  // Создаем sheetsManager для material-ui
  const sheetsManager = new Map();

  // Создаем тему
  const theme = createMuiTheme();

  // Создаем генератор классов
  const generateClassName = createGenerateClassName();

  // Рисуем всёрстку приложения
  const markup = renderToString(
    <Router location={req.url}>
      <JssProvider
        registry={sheetsRegistry}
        generateClassName={generateClassName}
      >
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
          <App />
        </MuiThemeProvider>
      </JssProvider>
    </Router>
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

app.use("/assets", express.static("dist"));

app.listen(8080, function() {
  console.log("Example src listening on port 8080!");
});
