import {
  APP_CONTAINER_ID,
  CACHE_CONTAINER_ID,
  STYLES_CONTAINER_ID
} from "../constants";

interface Options {
  markup: string;
  css: string;
  cacheData: any;
  styles: string;
}

export default function generateHtml({
  markup,
  css,
  cacheData,
  styles
}: Options) {
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
        <style id="${STYLES_CONTAINER_ID}">${css}</style>
        ${styles}
    </head>
    <body>
        <div id="${APP_CONTAINER_ID}">${markup}</div>
        <script type="application/json" id="${CACHE_CONTAINER_ID}">
            ${JSON.stringify(cacheData)}
        </script>
        <script type="application/javascript" src="/assets/bundle.js"></script>
    </body>
    </html>
  `;
}
