// https://vike.dev/onRenderHtml

export { onRenderHtml };

import { escapeInject } from "vike/server";

async function onRenderHtml() {
  return escapeInject`
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>music-jam</title>
  </head>
  <body class="m-0 flex place-items-center min-w-xs min-h-lvh">
    <div id="root" class="my-0 mx-auto p-8 text-center max-w-7xl"></div>
  </body>
</html>`;
}
