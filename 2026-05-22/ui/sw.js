const CACHE_NAME = "profile-offline-20260925-setpage1";
const OFFLINE_URL = "/offline";
const PRECACHE_URLS = [
  OFFLINE_URL,
  "/",
  "/discover",
  "/portal",
  "/accessibility",
  "/updates",
  "/search",
  "/activity",
  "/Creator",
  "/Creator/baldimods",
  "/Creator/newrobloxexperience",
  "/Creator/uiux",
  "/Bio",
  "/about",
  "/FAQ",
  "/settings",
  "/privacy",
  "/license",
  "/trust",
  "/status",
  "/security",
  "/sitemap",
  "/500",
  "/maintenance",
  "/coming-soon",
  "/terms",
  "/feedback",
  "/community",
  "/assets/css/styles.css",
  "/assets/css/sections/00-foundation.css",
  "/assets/css/sections/05-themes.css",
  "/assets/css/sections/10-layout-navigation.css",
  "/assets/css/sections/20-pages-components.css",
  "/assets/css/sections/25-context-menu.css",
  "/assets/css/sections/30-dialogs-usage.css",
  "/assets/css/sections/35-settings-modal.css",
  "/assets/css/sections/40-responsive-polish.css",
  "/assets/css/sections/45-light-legacy.css",
  "/assets/css/sections/50-modern.css",
  "/assets/css/sections/55-sidebar.css",
  "/assets/css/sections/58-light-modern.css",
  "/assets/css/sections/60-macos.css",
  "/assets/css/sections/65-settings.css",
  "/assets/js/translations.js",
  "/assets/js/navigation.js",
  "/assets/js/script.js",
  "/assets/js/page-features.js",
  "/assets/js/firebase-auth.js",
  "/assets/js/site-notifications.js",
  "/assets/js/status.js",
  "/favicon.ico",
  "/site.webmanifest",
  "/assets/favicon-32.png",
  "/assets/favicon-48.png",
  "/assets/favicon-96.png",
  "/assets/apple-touch-icon.png",
  "/assets/icon-192.png",
  "/assets/icon-512.png",
  "/assets/well-avatar.webp",
  "/assets/logo.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  if (requestUrl.searchParams.has("__status_probe") || event.request.headers.get("X-Status-Probe") === "1") {
    event.respondWith(fetch(event.request, { cache: "no-store" }));
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const cachedOfflinePage = await caches.match(OFFLINE_URL, { ignoreSearch: true });
        return cachedOfflinePage || caches.match("/", { ignoreSearch: true });
      }),
    );
    return;
  }

  if (requestUrl.pathname.endsWith(".css") || requestUrl.pathname.endsWith(".js")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseCopy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseCopy));
          return response;
        })
        .catch(() => caches.match(event.request, { ignoreSearch: true })),
    );
    return;
  }

  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cached) => {
      const network = fetch(event.request).then((response) => {
        if (response.ok) {
          const responseCopy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseCopy));
        }
        return response;
      });

      if (cached) {
        event.waitUntil(network.catch(() => {}));
        return cached;
      }
      return network;
    }),
  );
});
