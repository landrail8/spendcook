import { APP_CONTAINER_ID } from "../constants";

interface Options {
  markup: string;
}

export default function generateHtml({ markup }: Options) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
    </head>
    <body>
        <div id="${APP_CONTAINER_ID}">${markup}</div>
        <script type="application/javascript" src="/assets/bundle.js"></script>
    </body>
    </html>
  `;
}
