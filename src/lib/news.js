/* খবরের তালিকা ও বিস্তারিত — দুই পেজেই এই যুক্তি লাগে। আলাদা করে
   দুবার লিখলে একটিতে বদল আনলে অন্যটির লিংক ভেঙে যেত, তাই এক জায়গায়। */

export const slugify = (s) =>
    String(s || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 60);

// স্লাগের শুরুতে id — শিরোনাম বদলালেও পুরোনো লিংক কাজ করে যায়
export const articleSlug = (m) => `${m.id}-${slugify(m.title)}`;

export const idFromSlug = (slug) => {
    const n = parseInt(String(slug || ''), 10);
    return Number.isNaN(n) ? null : n;
};

// ডেটাবেসে description এ \r\n\r\n দিয়ে অনুচ্ছেদ ভাগ করা থাকে
export const paragraphs = (text) =>
    String(text || '')
        .split(/\r?\n\s*\r?\n/)
        .map((p) => p.replace(/\s+/g, ' ').trim())
        .filter(Boolean);

export const excerpt = (text, max = 165) => {
    const flat = String(text || '').replace(/\s+/g, ' ').trim();
    if (flat.length <= max) return flat;
    const cut = flat.slice(0, max);
    return cut.slice(0, cut.lastIndexOf(' ')) + '…';
};

// গড়ে ২০০ শব্দ প্রতি মিনিট
export const readTime = (text) => {
    const words = String(text || '').trim().split(/\s+/).filter(Boolean).length;
    return `${Math.max(1, Math.round(words / 200))} min read`;
};

export const fetchNews = () =>
    fetch('/api/media')
        .then((r) => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
        })
        .then((d) => (Array.isArray(d) ? d : []));
