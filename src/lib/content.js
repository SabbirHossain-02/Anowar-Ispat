import { useState, useEffect } from 'react';

/* অ্যাডমিন থেকে বদলানো লেখা এখানে এসে কোডের ডিফল্টের উপর বসে।

   দুটো নিয়ম ইচ্ছাকৃত:
   1. ডিফল্ট কোডেই থেকে যায়। ডেটাবেস খালি থাকলে, API না চললে, বা
      অ্যাডমিনে কেউ একটা ঘর মুছে দিলেও পেজ কখনো ফাঁকা হয় না।
   2. অ্যারে পুরোটাই বদলে যায়, মিশে যায় না — নইলে অ্যাডমিনে একটা
      আইটেম মুছলে ডিফল্টেরটা ফিরে আসত, ডিলিট কাজই করত না। */

let pending = null;

export const loadContent = () => {
    if (!pending) {
        pending = fetch('/api/content')
            .then((r) => (r.ok ? r.json() : {}))
            .then((d) => (d && typeof d === 'object' ? d : {}))
            .catch(() => ({}));
    }
    return pending;
};

const isPlain = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

export const merge = (base, over) => {
    if (!isPlain(over)) return base;
    const out = Array.isArray(base) ? [...base] : { ...base };

    Object.keys(over).forEach((k) => {
        const val = over[k];
        // খালি স্ট্রিং মানে অ্যাডমিনে ঘরটি খালি — ডিফল্টই থাকুক
        if (val === undefined || val === null || val === '') return;
        out[k] = isPlain(val) && isPlain(base?.[k]) ? merge(base[k], val) : val;
    });

    return out;
};

export const useContent = (pageKey, defaults) => {
    const [data, setData] = useState(defaults);

    useEffect(() => {
        let cancelled = false;
        loadContent().then((all) => {
            if (cancelled) return;
            const stored = all?.[pageKey];
            if (stored && Object.keys(stored).length > 0) {
                setData(merge(defaults, stored));
            }
        });
        return () => { cancelled = true; };
    }, [pageKey]);

    return data;
};
