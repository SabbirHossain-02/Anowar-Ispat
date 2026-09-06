/* কেন v4:

   আগের সংস্করণে পাতা (document) আসত cache-first — অর্থাৎ ব্রাউজারে
   জমানো index.html আগে, নেটওয়ার্ক পরে। ফলে নতুন কিছু ছাড়ার পর
   ফিরে আসা প্রত্যেক দর্শক পুরনো index.html পেত, যেখানে আগের বিল্ডের
   assets/index-XXXX.js লেখা। সেই ফাইল আর সার্ভারে নেই, তাই 404,
   আর 404 এ nginx পাতাটাই ফেরত দেয় — জাভাস্ক্রিপ্টের জায়গায় HTML।
   ব্রাউজার সেটা চালাতে না পেরে ফাঁকা কালো পাতা দেখাত।

   nginx index.html এ no-cache পাঠায়, কিন্তু সার্ভিস ওয়ার্কার
   নেটওয়ার্কের আগেই উত্তর দিয়ে দিত বলে সেই হেডার কোনো কাজে আসত না।

   এখন: পাতা সবসময় নেটওয়ার্ক থেকে। জমানো কপিটি কেবল তখনই, যখন
   নেটওয়ার্ক নেই। hash দেওয়া ফাইল (assets/) নাম বদলায় বলে সেগুলো
   জমিয়ে রাখা নিরাপদ।

   নাম v3 → v4 করা হয়েছে ইচ্ছে করেই: activate এ পুরনো নামের সব ক্যাশ
   মুছে যায়, তাই আটকে থাকা ব্রাউজারগুলোও নিজে থেকেই ছাড়া পায়। */

const CACHE = 'anwar-ispat-v4';
const RUNTIME = 'anwar-ispat-runtime-v4';
const SHELL = '/index.html';

// index.html এখানে নেই — ওটি জমিয়ে রাখলেই আগের সমস্যা ফিরে আসত
const STATIC_ASSETS = [
  '/Logo.png',
  '/logo-dark.png',
  '/product_image.png',
  '/founder.webp',
  '/md.webp',
  '/anwar_favicon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      // একটি ফাইল না থাকলে addAll পুরো ইনস্টল ফেলে দিত, তাই আলাদা করে
      Promise.allSettled(STATIC_ASSETS.map((u) => cache.add(u)))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(
        names.filter((n) => n !== CACHE && n !== RUNTIME).map((n) => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;

  let url;
  try { url = new URL(request.url); } catch (e) { return; }
  if (url.origin !== location.origin) return;

  // API কখনও জমানো হয় না — অ্যাডমিন কিছু বদলালে সঙ্গে সঙ্গে দেখা চাই
  if (url.pathname.startsWith('/api/')) return;

  // ---- পাতা: নেটওয়ার্ক আগে ----
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          // অফলাইনে দেখানোর জন্য একটি কপি রাখি
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(RUNTIME).then((c) => c.put(SHELL, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => caches.match(SHELL).then((c) => c || Response.error()))
    );
    return;
  }

  // ---- hash দেওয়া ফাইল: জমানো আগে, নাম বদলায় বলে নিরাপদ ----
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request).then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(request, copy)).catch(() => {});
        }
        return res;
      }))
    );
    return;
  }

  // ---- ছবি ও ভিডিও ----
  if (['image', 'video', 'audio', 'font'].includes(request.destination)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const networked = fetch(request)
          .then((res) => {
            if (res && res.ok) {
              const copy = res.clone();
              caches.open(RUNTIME).then((c) => c.put(request, copy)).catch(() => {});
            }
            return res;
          })
          .catch(() => cached);
        return cached || networked;
      })
    );
    return;
  }

  // বাকি সব ব্রাউজার নিজেই সামলাক
});

self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});
