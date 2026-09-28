/* প্যানেলে কিছু সংরক্ষণ হলে সার্ভার /api/live দিয়ে জানিয়ে দেয় কী
   বদলেছে — content, hero, media, products বা jobs। যে অংশ সেটা দেখায়
   সে onLive দিয়ে শোনে আর নিজের তথ্যটুকু নতুন করে আনে। পাতা রিফ্রেশ
   করতে হয় না।

   সংযোগ কেটে গেলে EventSource নিজেই আবার জোড়ে। মাঝের সময়ে কিছু
   বদলে থাকলে সেটা ধরা পড়ত না, তাই আবার জোড়া লাগলে সবাইকে একবার
   নতুন করে আনতে বলি। */

const subs = new Map();
let es = null;
let opened = false;

const emit = (kind) => {
  (subs.get(kind) || []).forEach((cb) => {
    try { cb(); } catch (e) { /* একজনের ভুলে বাকিরা যেন থেমে না যায় */ }
  });
};

const start = () => {
  if (es || typeof window === 'undefined' || typeof EventSource === 'undefined') return;
  es = new EventSource('/api/live');
  es.onmessage = (e) => {
    let d = null;
    try { d = JSON.parse(e.data); } catch (err) { return; }
    if (d && d.kind) emit(d.kind);
  };
  es.onopen = () => {
    if (opened) subs.forEach((_, kind) => emit(kind));
    opened = true;
  };
};

export const onLive = (kind, cb) => {
  start();
  if (!subs.has(kind)) subs.set(kind, new Set());
  subs.get(kind).add(cb);
  return () => { subs.get(kind)?.delete(cb); };
};
