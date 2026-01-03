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
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Website/ Progressive Web App for playing instruments using game controllers " />
    <title>music-jam</title>
    <link rel="icon" href="/music-jam/favicon.ico">
    <link rel="manifest" href="/music-jam/manifest.webmanifest">
    <link rel="apple-touch-icon" href="/music-jam/apple-touch-icon-180x180.png" sizes="180x180">
    <link rel="mask-icon" href="/music-jam/maskable-icon-512x512.png" color="#FFFFFF">
    <meta name="theme-color" content="#ffffff">
  </head>
  <body class="m-0 flex place-items-center min-w-xs min-h-lvh">
    <div id="root" role="presentation" class="my-0 mx-auto p-8 text-center max-w-7xl">${dangerouslySkipEscape(
      pageHtml
    )}</div>
  </body>
</html>`;
}
