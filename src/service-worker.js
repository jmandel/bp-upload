self.addEventListener('fetch', (fetchEvent) => {
  if (fetchEvent.request.url.endsWith('share-csv') && fetchEvent.request.method === 'POST') {
    return fetchEvent.respondWith(
      (async () => {
        const formData = await fetchEvent.request.formData();
        const vitalsCsv = formData.get('vitals');
        const keys = await caches.keys();
        const mediaCache = await caches.open(keys.filter((key) => key.startsWith('media'))[0]);
        await mediaCache.put('vitals-csv', new Response(vitalsCsv));
        return Response.redirect('./share-csv', 303);
      })(),
    );
  }
});

self.addEventListener("install", (event) => {
  console.log("Install sw")
  self.skipWaiting();

  const cache = caches.open("media");
  event.waitUntil(cache)
});
