self.addEventListener('fetch', function(event) {
  if(event.request.url.includes("hackedit.de") && !event.request.url.includes("backend")){
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  }else{
    return fetch(event.request);
  }
});