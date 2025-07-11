self.addEventListener('install', (event) => {
  console.log('[SW] Instalado');
  self.skipWaiting(); // activa inmediatamente
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activado');
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => caches.delete(key)));
    })
  );

  self.clients.claim(); 
});