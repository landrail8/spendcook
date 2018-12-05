import * as React from "react";
import * as express from "express";
import { renderToString } from "react-dom/server";
import App from "./components/App";
import generateHtml from "./utils/generateHtml";

const app = express();

app.get("/", function(req, res) {
  res.send(
    generateHtml({
      markup: renderToString(<App />)
    })
  );
});

app.use("/assets", express.static("dist"));

app.listen(8080, function() {
  console.log("Example app listening on port 8080!");
});
