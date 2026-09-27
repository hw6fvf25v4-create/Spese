/* Service worker — Spese
   Aggiorna VERSION ogni volta che pubblichi una nuova versione dei file. */
const VERSION = 'spese-v1.0.0';
const CORE = ['./', './index.html', './manifest.json', './icon-180.png', './icon-192.png', './icon-512.png'];
const LIBS = ['https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js'];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    await cache.addAll(CORE);
    // librerie esterne: le metto in cache subito, così l'import funziona anche offline
    await Promise.all(LIBS.map(async url => {
      try {
        const res = await fetch(url, { mode: 'no-cors' });
        await cache.put(url, res);
      } catch (e) {
        const old = await caches.match(url); // copia da una versione precedente
        if (old) await cache.put(url, old);
      }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) if (key !== VERSION) await caches.delete(key);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (req.mode === 'navigate') { event.respondWith(networkFirst(req)); return; }
  if (url.origin === self.location.origin) { event.respondWith(staleWhileRevalidate(req)); return; }
  if (LIBS.includes(req.url)) { event.respondWith(cacheFirst(req)); return; }
});

// pagina: prova la rete (max 3,5 s) per avere subito gli aggiornamenti, altrimenti cache
async function networkFirst(req) {
  const cache = await caches.open(VERSION);
  try {
    const res = await Promise.race([
      fetch(req),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 3500)),
    ]);
    if (res && res.ok) { cache.put('./index.html', res.clone()); return res; }
    throw new Error('risposta non valida');
  } catch (e) {
    return (await cache.match('./index.html')) || (await cache.match('./')) || Response.error();
  }
}

async function staleWhileRevalidate(req) {
  const cache = await caches.open(VERSION);
  const hit = await cache.match(req, { ignoreSearch: true });
  const net = fetch(req).then(res => { if (res && res.ok) cache.put(req, res.clone()); return res; }).catch(() => null);
  return hit || (await net) || Response.error();
}

async function cacheFirst(req) {
  const cache = await caches.open(VERSION);
  const hit = await cache.match(req.url);
  if (hit) return hit;
  try {
    const res = await fetch(req);
    if (res && (res.ok || res.type === 'opaque')) await cache.put(req.url, res.clone());
    return res;
  } catch (e) {
    return Response.error();
  }
}
