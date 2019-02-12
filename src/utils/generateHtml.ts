import { APP_CONTAINER_ID } from "../constants";

interface Options {
  markup: string;
  css: string;
}

export default function generateHtml({ markup, css }: Options) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <title>Title</title>
    </head>
    <body>
        <div id="${APP_CONTAINER_ID}">${markup}</div>
        <style>
        html, body, #app {
            min-height: 100%;
        }
        </style>
        <style id="jss-server-side">${css}</style>
        <script type="application/javascript" src="/assets/bundle.js"></script>
    </body>
    </html>
  `;
}