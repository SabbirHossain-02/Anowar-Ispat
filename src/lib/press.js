// প্রেস বিজ্ঞপ্তির তালিকা আর ভেতরের পাতা — দুটোই এখান থেকে পড়ে।
// আগে দুই ফাইলে দুটো আলাদা তালিকা ছিল, ফলে প্যানেল থেকে শিরোনাম
// বদলালে তালিকায় বদলাত কিন্তু ভেতরে পুরনোটাই থেকে যেত।

// রং সাজসজ্জা, JSON এ যায় না — ক্রম অনুযায়ী কোড থেকেই বসে
const TONES = ['#E3182D', '#3b82f6', '#22c55e', '#eab308', '#a855f7', '#ec4899'];
export const tone = (i) => TONES[i % TONES.length];

// ঠিকানাটা অ্যাডমিনকে লিখতে হয় না, শিরোনাম থেকেই তৈরি হয় — তাই
// প্যানেলে নতুন বিজ্ঞপ্তি যোগ করলেই তার পাতা খোলে
export const releaseSlug = (r, i) => {
    const s = String((r && r.title) || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 70);
    return s || 'release-' + (i + 1);
};

// ফাঁকা লাইন দেখে অনুচ্ছেদ ভাগ
export const paragraphs = (text) =>
    String(text || '')
        .split(/\r?\n\s*\r?\n/)
        .map((p) => p.trim())
        .filter(Boolean);

// অ্যাডমিন কিছু না বদলালে এগুলোই দেখা যায়
export const PRESS_DEFAULTS = {
    hero: { tag: 'Official Statements', title: 'Press', accent: 'Releases' },
    stamp: 'Official Statement',
    imageNote: 'Official Image',
    immediate: 'For Immediate Release',
    contactLabel: 'Media Contact',
    notFound: 'Press release not found',
    mediaTitle: 'Corporate Communications',
    mediaEmail: 'media@anwarispat.com',
    mediaPhone: '+880 2223 384037',
    releases: [
        {
            pr: "PR-2026-001",
            cat: "Corporate",
            title: "Anwar Ispat Announces Strategic Expansion and New Product Line Launch for 2026",
            date: "June 16, 2026",
            read: "3 min read",
            body: "The Board of Directors of Anwar Ispat Limited hereby announces a major strategic expansion initiative targeting a 40% increase in production capacity, alongside the official launch of the ANWARS 500W TMT Bar series for the fiscal year 2026.\n\nThis expansion initiative includes the commissioning of new rolling mill lines and upgraded induction furnace systems at the Narayanganj production facility. The capital investment is estimated at BDT 850 crore, to be funded through a combination of retained earnings and long-term debt financing.\n\nThe Board has further resolved to launch the ANWARS 500W TMT Bar — a thermo-mechanically treated reinforcing bar engineered for high-rise structures and critical infrastructure projects across Bangladesh.\n\nManagement projects that the expanded capacity will enable Anwar Ispat to fulfill contracts for multiple large-scale government and private sector infrastructure projects simultaneously, while maintaining its hallmark quality standards certified under ISO 9001:2015 and BDS specifications.\n\nThe Board expresses its confidence that these strategic investments will consolidate Anwar Ispat's position as Bangladesh's most trusted steel manufacturer and deliver long-term value to all stakeholders.",
        },
        {
            pr: "PR-2026-002",
            cat: "Financial",
            title: "Q1 2026 Financial Results — Record Revenue Growth of 28%",
            date: "May 30, 2026",
            read: "4 min read",
            body: "Anwar Ispat Limited is pleased to report its unaudited financial results for the first quarter ended March 31, 2026. The company recorded a revenue of BDT 2,340 crore, representing a 28% year-on-year growth compared to Q1 2025.\n\nGross profit margin improved to 18.4% from 16.2% in the corresponding period, driven by operational efficiencies and favorable raw material prices. EBITDA grew by 34% to BDT 312 crore.\n\nThe strong performance was underpinned by robust demand from the construction sector, particularly government-led infrastructure projects including highway expansion, bridge construction, and urban development initiatives under the Annual Development Programme.\n\nThe Board of Directors has declared an interim dividend of BDT 2.50 per share for Q1 2026, reflecting the company's continued commitment to delivering value to its shareholders.\n\nManagement remains optimistic about the outlook for the remainder of 2026, citing strong order backlog and continued investment in capacity expansion.",
        },
        {
            pr: "PR-2026-003",
            cat: "Regulatory",
            title: "ISO 9001:2015 & BDS Certification Renewal — Quality Assurance Confirmed",
            date: "May 10, 2026",
            read: "2 min read",
            body: "Anwar Ispat Limited announces the successful renewal of its ISO 9001:2015 Quality Management System certification, following a comprehensive third-party audit conducted by Bureau Veritas Certification Bangladesh.\n\nThe audit covered all aspects of the company's production processes, quality control systems, supply chain management, and customer service protocols across all manufacturing facilities.\n\nAdditionally, the company has renewed its Bangladesh Standards and Testing Institution (BSTI) certification for all product grades including ANWARS 500DWR, 420DWR, and the newly launched 500W TMT Bar series.\n\nThis dual certification renewal reaffirms Anwar Ispat's unwavering commitment to delivering consistently high-quality steel products that meet both national and international standards.\n\nThe Management thanks the dedicated quality assurance team and all employees whose diligence and professionalism made this achievement possible.",
        },
        {
            pr: "PR-2026-004",
            cat: "Operational",
            title: "New Rolling Mill Facility Commissioned in Narayanganj Industrial Zone",
            date: "April 20, 2026",
            read: "3 min read",
            body: "Anwar Ispat Limited is pleased to announce the successful commissioning of its new Rolling Mill Facility at the Narayanganj Industrial Zone. The facility represents a BDT 320 crore investment in state-of-the-art steel processing technology.\n\nThe new mill features a high-speed continuous rolling system capable of producing 500,000 metric tonnes of reinforcing bar annually. The facility incorporates the latest energy-saving induction heating technology, reducing energy consumption by approximately 22% compared to conventional systems.\n\nThe commissioning ceremony was attended by senior management, government representatives, and industry partners. The facility is expected to be fully operational at rated capacity within 90 days of commissioning.\n\nThis investment is a key component of Anwar Ispat's capacity expansion strategy for 2026 and underscores the company's commitment to meeting the growing demand for high-quality steel in Bangladesh's construction and infrastructure sectors.",
        },
        {
            pr: "PR-2026-005",
            cat: "ESG",
            title: "Anwar Ispat ESG Report 2025 Released — Zero Waste Water Policy Achieved",
            date: "April 5, 2026",
            read: "5 min read",
            body: "Anwar Ispat Limited is proud to release its Environmental, Social and Governance (ESG) Report for the fiscal year 2025, marking a significant milestone in the company's sustainability journey.\n\nThe 2025 ESG Report highlights the achievement of the company's Zero Waste Water Policy across all manufacturing facilities — a commitment made in the 2023 ESG roadmap. All process water is now treated and recycled within closed-loop systems, achieving zero liquid discharge to the environment.\n\nIn the social dimension, Anwar Ispat distributed 500 scholarships to meritorious students from low-income families across Bangladesh, operated 20 free medical camps serving over 15,000 beneficiaries, and planted 5,000 trees as part of its reforestation initiative.\n\nOn governance, the company strengthened its Board composition with the addition of two independent directors, enhancing oversight and transparency in decision-making processes.\n\nAnwar Ispat remains committed to advancing its ESG agenda and will publish updated targets for 2026-2028 in the coming quarter.",
        },
        {
            pr: "PR-2026-006",
            cat: "Corporate",
            title: "Board Resolution: Strategic Partnership with BGMEA Ratified",
            date: "March 18, 2026",
            read: "2 min read",
            body: "The Board of Directors of Anwar Ispat Limited has ratified the Strategic Partnership Agreement with the Bangladesh Garment Manufacturers and Exporters Association (BGMEA), effective from April 1, 2026.\n\nUnder this partnership, Anwar Ispat will serve as the preferred steel supplier for infrastructure development projects across BGMEA member facilities, including factory construction, expansion, and renovation projects.\n\nThe partnership encompasses a three-year supply agreement covering an estimated 120,000 metric tonnes of reinforcing steel, representing a total contract value of approximately BDT 720 crore at current market prices.\n\nThis strategic alliance reinforces Anwar Ispat's position as the partner of choice for Bangladesh's key industrial sectors and supports the garment industry's ongoing infrastructure modernization drive.\n\nThe Board expresses its appreciation to the management teams of both organizations for their diligence in negotiating and finalizing this mutually beneficial partnership.",
        },
    ],
};
