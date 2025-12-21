/*
This is just an example for caching. It is not necessary to make a pwa but it helps improve performance. 
*/

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open("my-cache")
      .then((cache) => {
        return cache.addAll([
          "/",
          "/index.html",
          // "/Page.css",
          // Add any other assets you want to cache
        ]);
      })
      .catch((e) => console.error(e))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
