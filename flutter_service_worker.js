'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "bc027631758083a428ca206e173dfb45",
"assets/assets/1.png": "e30c962bd562ca59b60cf255f6e76319",
"assets/assets/2.png": "89c13589f91e7b85b0ee5a47435f56cc",
"assets/assets/3.png": "3243d972a38d75918947da37a8408813",
"assets/assets/4.png": "7d38481d8c3de04760865ad52ee317e4",
"assets/assets/avatar01.png": "262ddfee634ba6979134ce0e7a546929",
"assets/assets/avatar02.png": "7adbccc43ef50113072c72235c498205",
"assets/assets/avatar03.png": "8068ae645f73e448004f1757e30c18b1",
"assets/assets/background.png": "89c13589f91e7b85b0ee5a47435f56cc",
"assets/assets/book.png": "38576ae6d16dddd0e1e55cb71f0a1ba9",
"assets/assets/bottom.png": "53d69d4b07ce15c5bc12e265fca65c63",
"assets/assets/decoration.png": "45f59373b5845379f086d22c66b54925",
"assets/assets/even.jpg": "cc7ef3425ecf175fcf1deb67c94c4df1",
"assets/assets/event.png": "37d0b3e50ddc7bf679d72e39751b781b",
"assets/assets/flutter.png": "2c74a31e6542bd41b969d5f68ae795dd",
"assets/assets/gachyaBack.gif": "e5d64962a2465b2f686961b966ec425d",
"assets/assets/gem.png": "5772c138411ceb1a9232ab5c97c4d711",
"assets/assets/gif/bronzGachya.gif": "0bb582ed66abeac3da20995d1997a50f",
"assets/assets/gif/goldGachya.gif": "c0a83155100a6ffd3d5f6903e574ff41",
"assets/assets/gif/silverGachya.gif": "84aa03e98a73e7a958130ef42ba2c562",
"assets/assets/intro.jpg": "5365f2710179bfade6abe52090aed953",
"assets/assets/intro.png": "7cf53e3084afe1dedc1a6801bf723850",
"assets/assets/intro01.jpg": "f2dd43534dad265fa6c0a492c20feb86",
"assets/assets/life.png": "13e07a2bfde1c4b3339cbf9a75a0a290",
"assets/assets/load.png": "ee5e6b5de95bb87965bde69c4a68a7a5",
"assets/assets/logo.png": "8728b05d3167ef3ab18f521b0cabc808",
"assets/assets/mana.png": "39dc22e2a0d70bc3a3641dd0fcf9b6ad",
"assets/assets/moonstar_back.jpg": "2abd4127a1412e0183ebb63245731ebd",
"assets/assets/other.png": "50d8a1f8e5b3617c4621cc750d617cfe",
"assets/assets/point.png": "aea21862ba8a2db571c82f31ee06aef5",
"assets/assets/profile.png": "c641136707cbb8c94b8336ee509d374a",
"assets/assets/sulnal.gif": "d2c7024fdd17b7c55fe3b629b3be9512",
"assets/assets/top.png": "75a9ffa8aa485fb4970d62181dad9a31",
"assets/assets/waterdrop.png": "4214982008a4f40f649609388a9366f0",
"assets/FontManifest.json": "7e1623c44dfa5430f2f0f8e3ac345851",
"assets/fonts/aoyagi.otf": "7c900be5e5e3e1b08052d874b1cbd3e3",
"assets/fonts/LINESeedKR-Rg.ttf": "fb4ac7132fcf449f590136bfc36817fd",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/NOTICES": "2c89860e466cdc717f19af736ee05575",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "1cfe996e845b3a8a33f57607e8b09ee4",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "7bf47cda3463cbb7787165a0917598b4",
"/": "7bf47cda3463cbb7787165a0917598b4",
"main.dart.js": "26dcce78b71c42a272186a6ae2a0f6fd",
"manifest.json": "951ac4db2241db391ac2eba765addbf3",
"version.json": "ba6ed30b2cbe6f8c6b625b8817a0ae4d"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
