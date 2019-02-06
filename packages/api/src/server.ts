import * as express from "express";

const app = express();

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.get("/recipes", function(req, res) {
  res.json([
    {
      query: req.query,
      id: 1,
      title: "Борщ"
    }
  ]);
});

app.get("recipes/filters", function(req, res) {
  res.json({

  })
});

app.listen(8081, function() {
  console.log("Example src listening on port 8081!");
});
