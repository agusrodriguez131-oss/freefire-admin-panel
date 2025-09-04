const CACHE_NAME = 'ff-admin-v1.0';
const urlsToCache = [
  './',
  './index.html',
  './sounds/click.mp3',
  './imagenes/logooficial.jpeg',
  './imagenes/logoverificado.png',
  './imagenes/Moneda.png',
  './imagenes/Diamante.png',
  './imagenes/inicio.png',
  './imagenes/personajes.png',
  './imagenes/armas.png',
  './imagenes/vehiculos.png',
  './imagenes/mascotas.png',
  './imagenes/emotes.png',
  './imagenes/configuracion.png',
  './imagenes/ayuda.png',
  'https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Orbitron:wght@400;700;900&display=swap'
];

// Instalar Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.log('Error al cachear:', error);
      })
  );
});

// Interceptar requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devolver del cache si existe
        if (response) {
          return response;
        }
        // Sino, fetch de la red
        return fetch(event.request);
      }
    )
  );
});

// Actualizar cache
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// ==========================================
// PASO 3: Modificaciones al HTML (agregar al <head>)
// ==========================================

/*
Agrega estas líneas en el <head> de tu index.html, después de la línea del title:

<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#ffcc00">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="FF Admin">
<link rel="apple-touch-icon" href="icon-192.png">
<link rel="icon" type="image/png" sizes="192x192" href="icon-192.png">
<link rel="icon" type="image/png" sizes="512x512" href="icon-512.png">
*/

// ==========================================
// PASO 4: Registrar Service Worker (agregar al final del <body>)
// ==========================================

/*
Agrega este script al final de tu HTML, antes del </body>:

<script>
// Registrar Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => {
        console.log('SW registrado: ', registration);
      })
      .catch(registrationError => {
        console.log('SW falló: ', registrationError);
      });
  });
}

// Detectar si es PWA instalada
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  deferredPrompt = e;
  console.log('App se puede instalar');
});

// Detectar cuando se instala
window.addEventListener('appinstalled', (evt) => {
  console.log('App instalada exitosamente');
});
</script>
*/