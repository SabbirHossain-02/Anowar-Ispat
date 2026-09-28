import { useState, useEffect } from 'react';
import { onLive } from './live';

/* অ্যাডমিন থেকে বদলানো লেখা এখানে এসে কোডের ডিফল্টের উপর বসে।

   দুটো নিয়ম ইচ্ছাকৃত:
   1. ডিফল্ট কোডেই থেকে যায়। ডেটাবেস খালি থাকলে, API না চললে, বা
      অ্যাডমিনে কেউ একটা ঘর মুছে দিলেও পেজ কখনো ফাঁকা হয় না।
   2. অ্যারে পুরোটাই বদলে যায়, মিশে যায় না — নইলে অ্যাডমিনে একটা
      আইটেম মুছলে ডিফল্টেরটা ফিরে আসত, ডিলিট কাজই করত না। */

let pending = null;
const listeners = new Set();

const fetchAll = () =>
    fetch('/api/content', { cache: 'no-store' })
        .then((r) => (r.ok ? r.json() : {}))
        .then((d) => (d && typeof d === 'object' ? d : {}))
        .catch(() => ({}));

export const loadContent = () => {
    if (!pending) pending = fetchAll();
    return pending;
};

// প্যানেলে লেখা সংরক্ষণ হলে খোলা পাতার সব অংশ নতুন লেখা পায়
let unsubscribe = null;
const watchLive = () => {
    if (unsubscribe) return;
    unsubscribe = onLive('content', () => {
        fetchAll().then((d) => {
            // নেটওয়ার্ক ব্যর্থ হলে {} আসে — তখন যা দেখাচ্ছে তা-ই থাক
            if (!d || Object.keys(d).length === 0) return;
            pending = Promise.resolve(d);
            listeners.forEach((l) => l(d));
        });
    });
};

const isPlain = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

export const merge = (base, over) => {
    if (!isPlain(over)) return base;
    const out = Array.isArray(base) ? [...base] : { ...base };

    Object.keys(over).forEach((k) => {
        const val = over[k];
        // কী-টা না থাকলে (কখনও সংরক্ষিত হয়নি) কোডের লেখাই থাকে।
        // কিন্তু খালি স্ট্রিং মানে অ্যাডমিন ইচ্ছে করে মুছে দিয়েছেন —
        // তখন সাইটেও খালি। আগে খালি স্ট্রিংও ডিফল্টে ফিরত, ফলে
        // প্যানেল থেকে কোনো লেখা সরানোর উপায়ই ছিল না।
        if (val === undefined || val === null) return;
        out[k] = isPlain(val) && isPlain(base?.[k]) ? merge(base[k], val) : val;
    });

    return out;
};

export const useContent = (pageKey, defaults) => {
    const [data, setData] = useState(defaults);

    useEffect(() => {
        let cancelled = false;
        const apply = (all) => {
            if (cancelled) return;
            const stored = all?.[pageKey];
            // পেজটি রিসেট করা হলে সংরক্ষিত কিছু থাকে না — তখন কোডের লেখা
            setData(stored && Object.keys(stored).length > 0 ? merge(defaults, stored) : defaults);
        };
        loadContent().then(apply);
        listeners.add(apply);
        watchLive();
        return () => { cancelled = true; listeners.delete(apply); };
    }, [pageKey]);

    return data;
};
