// https://vike.dev/onRenderHtml

export { onRenderHtml };

import type { PageContextServer } from "vike/types";
import { escapeInject, dangerouslySkipEscape } from "vike/server";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const ROOT_URL = import.meta.env.BASE_URL;

async function onRenderHtml(pageContext: PageContextServer) {
  const { Page, data } = pageContext;
  const pageHtml = await renderToStaticMarkup(createElement(Page, data));
  return escapeInject`
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="manifest" href="${ROOT_URL}manifest.json">
    <link rel="icon" type="image/x-icon" href="${ROOT_URL}piano-icon-48x48.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>music-jam</title>
  </head>
  <body class="m-0 flex place-items-center min-w-xs min-h-lvh">
    <div id="root" class="my-0 mx-auto p-8 text-center max-w-7xl">${dangerouslySkipEscape(
      pageHtml
    )}</div>
  </body>
</html>`;
}
