import * as express from "express";

const app = express();

app.get("/", function(req, res) {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
    </head>
    <body>
        <h1>World!</h1>
        <script type="application/javascript" src="/assets/bundle.js"></script>
    </body>
    </html>
  `);
});

app.use('/assets', express.static('dist'));


app.listen(8080, function() {
  console.log("Example app listening on port 8080!");
});
