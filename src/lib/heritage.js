/* উত্তরাধিকারের ঘটনাক্রম। Heritage পেজ যুগ ধরে ধরে দেখায়, About পেজ
   একটানা অনুভূমিক রেখায় — কিন্তু লেখা এক জায়গাতেই থাকে, যাতে একটিতে
   সংশোধন করলে অন্যটি পুরোনো থেকে না যায়। */

export const ERAS = [
    {
        span: '1834 — 1946',
        title: 'The founding trades',
        note: 'Four generations before steel, the family traded cloth, hide and household goods.',
        events: [
            { year: '1834', name: 'Laik Mohammad', text: 'Pioneering cloth and hide trades.' },
            { year: '1870', name: 'Rahim Bakhsh', text: 'Venturing into button and comb manufacturing.' },
            { year: '1946', name: 'Anwar Cloth Store', text: 'Late Anwar Hossain establishes the Anwar brand.' },
        ],
    },
    {
        span: '1965 — 1983',
        title: 'Into manufacturing',
        note: 'The move from trading to making things, and the first steel mill.',
        events: [
            { year: '1965', name: 'Rise from Chawk Bazar', text: "Anwar Cloth Store's ascension." },
            { year: '1968', name: 'Mala Saree', text: 'A symbol of elegance and tradition.' },
            { year: '1968', name: 'Manwar Industries', text: 'The first stainless steel cutlery manufacturer.' },
            { year: '1970', name: 'Anwar Silk Mills Ltd.', text: 'A transformation in the silk industry.' },
            { year: '1981', name: 'Khaled Iron & RUMA Steel Mills Ltd.', text: 'Shaping structural excellence.' },
            { year: '1983', name: 'Sunshine Cables & Rubber Works Ltd.', text: 'Diversification and dominion.' },
        ],
    },
    {
        span: '1995 — 2001',
        title: 'Diversification',
        note: 'Galvanising, jute, textiles, cement, real estate and agriculture within seven years.',
        events: [
            { year: '1995', name: 'Anwar Galvanizing Ltd.', text: 'Largest manufacturer of galvanized items.' },
            { year: '1996', name: 'Anwar Jute Spinning Mills Ltd.', text: 'Revitalizing the jute industry.' },
            { year: '1996', name: 'Mehmud Industries', text: 'A dynamic force in textiles.' },
            { year: '1999', name: 'Anwar Cement Ltd.', text: 'Redefining building materials quality.' },
            { year: '2001', name: 'Anwar Landmark Ltd.', text: 'Premium real estate and construction.' },
            { year: '2001', name: 'Anwar Green Firm Ltd.', text: 'Pioneering agro-based sustainability.' },
            { year: '2001', name: 'Anwar Green Initiative', text: 'Environmental awareness.' },
            { year: '2001', name: 'A.G. Automobile Ltd.', text: 'Driving innovation in the automotive sector.' },
        ],
    },
    {
        span: '2004 — 2022',
        title: 'The modern group',
        note: 'Anwar Ispat is founded, and the group extends into polymers, automotive and technology.',
        events: [
            { year: '2004', name: 'Anwar Ispat Limited', text: 'Forging progress in the steel industry.', highlight: true },
            { year: '2004', name: "Athena's Furniture & Home Decor", text: 'Elevating luxury living.' },
            { year: '2005', name: 'A-One Polymer', text: 'Pioneering uPVC fittings, pipes and bathroom fittings.' },
            { year: '2008', name: 'Ford', text: 'A.G. Automobiles brings automotive excellence.' },
            { year: '2009', name: 'Anwar Cement Sheet', text: 'Redefining construction materials.' },
            { year: '2010', name: 'Volvo', text: "Eurocars' Scandinavian elegance." },
            { year: '2020', name: 'Peugeot', text: 'A.G. Motors elevates the driving experience.' },
            { year: '2021', name: 'Anwar Hossain', text: 'The founder passes away.', memoriam: true },
            { year: '2021', name: 'Manwar Hossain', text: 'Becomes Chairman of Anwar Group.' },
            { year: '2021', name: 'Anwar Denim Ltd.', text: 'Advancing garment diversification.' },
            { year: '2021', name: 'Anwar Technologies', text: 'Pioneering enterprise solutions.' },
            { year: '2022', name: "Jeep's arrival in Bangladesh", text: 'Toledo Motors Ltd introduces adventure.' },
        ],
    },
];

// অনুভূমিক টাইমলাইনের জন্য যুগের ভাগ ছাড়া একটানা তালিকা
export const MILESTONES = ERAS.flatMap((era) => era.events);
