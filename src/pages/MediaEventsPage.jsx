import React, { useRef, useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '../lib/content';

gsap.registerPlugin(ScrollTrigger);

// রঙগুলো সাজসজ্জা, JSON এ যায় না — কোডে থেকে ক্রম অনুযায়ী বসে
const TONES = ['#E3182D', '#3b82f6', '#22c55e', '#eab308', '#a855f7', '#ec4899'];
const tone = (i) => TONES[i % TONES.length];

// অ্যাডমিন কিছু না বদলালে এগুলোই দেখা যায়
const DEFAULTS = {
    hero: {
        tag: 'Visual Stories', title: 'Event', accent: 'Gallery',
        sub: 'Behind the scenes of Anwar Ispat corporate events, product launches, CSR programs and factory milestones.',
    },
    stats: [
        { n: '24+', l: 'Events' },
        { n: '500+', l: 'Photos' },
        { n: '2026', l: 'Latest' },
    ],
    labels: {
        featured: 'Featured Event', all: 'All Events', latest: 'Latest', photos: 'Photos',
        viewAll: 'View All Photos →', view: 'View Gallery →',
    },
    events: [
  { id:0, slug:'strategic-expansion-ceremony-2026', cat:'Corporate',title:'Strategic Expansion Announcement Ceremony', date:'June 16, 2026', photos:48, imgBg:'rgba(227,24,45,0.15)' },
  { id:1, slug:'national-steel-excellence-award-ceremony', cat:'Awards',title:'National Steel Excellence Award Ceremony 2026', date:'June 8, 2026', photos:32, imgBg:'rgba(59,130,246,0.12)' },
  { id:2, slug:'500w-tmt-bar-launch-event', cat:'Product Launch',title:'500W TMT Bar Official Launch Event', date:'May 28, 2026', photos:24, imgBg:'rgba(34,197,94,0.12)' },
  { id:3, slug:'narayanganj-rolling-mill-commissioning', cat:'Factory',title:'Narayanganj Rolling Mill Commissioning', date:'April 20, 2026', photos:40, imgBg:'rgba(234,179,8,0.12)' },
  { id:4, slug:'scholarship-distribution-ceremony-2026', cat:'CSR',title:'Scholarship Distribution Ceremony 2026', date:'May 2026', photos:18, imgBg:'rgba(168,85,247,0.12)' },
  { id:5, slug:'48th-anniversary-gala-2026', cat:'Corporate',title:'48th Anniversary Celebration Gala', date:'April 2026', photos:28, imgBg:'rgba(236,72,153,0.08)' },
  { id:6, slug:'free-medical-camp-narayanganj', cat:'CSR',title:'Free Medical Camp — Narayanganj District', date:'March 2026', photos:22, imgBg:'rgba(34,197,94,0.08)' },
  { id:7, slug:'bgmea-partnership-signing-ceremony', cat:'Corporate',title:'BGMEA Partnership Signing Ceremony', date:'March 18, 2026', photos:15, imgBg:'rgba(227,24,45,0.08)' },
],
};

// একটি অনুষ্ঠানের সব ছবি — প্রচ্ছদ আগে, তারপর গ্যালারি
const photosOf = (ev) => [ev && ev.cover, ...((ev && Array.isArray(ev.gallery)) ? ev.gallery : [])].filter(Boolean);
// ছবি আপলোড করা থাকলে সেগুলোর সংখ্যা, নইলে প্যানেলে লেখা সংখ্যা
const countOf = (ev) => { const p = photosOf(ev); return p.length ? p.length : ev.photos; };

// ছবি থাকলে ছবি, না থাকলে আগের মতো ফাঁকা ঘর
const ImgSlot = ({ bg, iconSize = 36, src }) => (src
  ? <img src={src} alt="" loading="lazy" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
  : <div style={{ position:'absolute', inset:0, background:bg, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'8px' }}>
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
    </svg>
    <span style={{ fontSize:'8px', letterSpacing:'2px', textTransform:'uppercase', color:'rgba(255,255,255,0.15)' }}>Photo</span>
  </div>
);

const FeaturedGrid = ({ imgBg, photos, pics = [] }) => (
  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'3px' }}>
    <div style={{ position:'relative', aspectRatio:'1/1' }}><ImgSlot bg="rgba(227,24,45,0.12)" iconSize={22} src={pics[1]} /></div>
    <div style={{ position:'relative', aspectRatio:'1/1' }}><ImgSlot bg="rgba(227,24,45,0.09)" iconSize={22} src={pics[2]} /></div>
    <div style={{ position:'relative', aspectRatio:'1/1' }}><ImgSlot bg="rgba(227,24,45,0.07)" iconSize={22} src={pics[3]} /></div>
    <div style={{ position:'relative', aspectRatio:'1/1' }}>
      <ImgSlot bg="rgba(227,24,45,0.05)" iconSize={22} src={pics[4]} />
      <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', fontWeight:900, color:'var(--accent)' }}>+{Math.max(0, (parseInt(photos, 10) || 0) - 4)}</div>
    </div>
  </div>
);

const MediaEventsPage = () => {
  const containerRef = useRef(null);
  const c = useContent('media-events', DEFAULTS);
  const [activeCategory, setActiveCategory] = useState('All');
  // বড় করে দেখা: কোন অনুষ্ঠানের কোন ছবি
  const [viewer, setViewer] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const events = Array.isArray(c.events) ? c.events : [];
  const stats = Array.isArray(c.stats) ? c.stats : [];

  // মাথার অংশ একবারই ফোটে
  useGSAP(() => {
    gsap.fromTo('.me-hero-tag', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.8, delay:0.2, ease:'power3.out' });
    gsap.fromTo('.me-hero-title', { opacity:0, y:40 }, { opacity:1, y:0, duration:1, delay:0.3, ease:'power3.out' });
    gsap.fromTo('.me-hero-sub', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.8, delay:0.5, ease:'power3.out' });
    gsap.fromTo('.me-stats', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.8, delay:0.7, ease:'power3.out' });
    gsap.fromTo('.me-cats', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.8, delay:0.8, ease:'power3.out' });
  }, { scope:containerRef });

  // কার্ডগুলো শুরুতে অদৃশ্য, স্ক্রলে ফোটে — অনুষ্ঠান যোগ হলে বা বিভাগ
  // বদলালে নতুন কার্ডও যেন ফোটে, তাই আবার চলে
  useGSAP(() => {
    gsap.utils.toArray('.me-fade').forEach(el => {
      ScrollTrigger.create({ trigger:el, start:'top 88%', onEnter:() => gsap.to(el, { opacity:1, y:0, duration:0.7, delay:parseFloat(el.dataset.delay||0), ease:'power3.out' }) });
    });
    gsap.utils.toArray('.me-card').forEach((el, i) => {
      ScrollTrigger.create({ trigger:el, start:'top 90%', onEnter:() => gsap.to(el, { opacity:1, y:0, duration:0.6, delay:(i%3)*0.1, ease:'power3.out' }) });
    });
  }, { scope:containerRef, dependencies:[events.length, activeCategory], revertOnUpdate:true });

  // বিভাগের বোতাম অনুষ্ঠানগুলো থেকেই — প্যানেলে নতুন বিভাগ লিখলে বোতামও আসে
  const categories = ['All', ...new Set(events.map(e => e.cat).filter(Boolean))];
  const featured = events[0];
  const filtered = events.slice(1).filter(e => activeCategory === 'All' || e.cat === activeCategory);

  useEffect(() => {
    if (activeCategory !== 'All' && !categories.includes(activeCategory)) setActiveCategory('All');
  }, [categories.join('|'), activeCategory]);

  // আগে কার্ডে ক্লিক করলে /media/events/... তে যেত — সেই পাতা নেই, তাই
  // ফাঁকা পাতা আসত। এখন অনুষ্ঠানের ছবিগুলো এখানেই বড় করে খোলে।
  const openPhotos = (ev) => { if (photosOf(ev).length) setViewer({ ev, i: 0 }); };
  const shownPhotos = viewer ? photosOf(viewer.ev) : [];
  const step = useCallback((d) => {
    setViewer((v) => { if (!v) return v; const n = photosOf(v.ev).length; return n ? { ...v, i: (v.i + d + n) % n } : null; });
  }, []);

  useEffect(() => {
    if (!viewer) return undefined;
    window.dispatchEvent(new Event('lenis-stop'));
    const onKey = (e) => {
      if (e.key === 'Escape') setViewer(null);
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); window.dispatchEvent(new Event('lenis-start')); };
  }, [viewer, step]);

  const secLabel = (text) => (
    <div className="me-fade" data-delay="0" style={{ fontSize:'10px', letterSpacing:'3px', color:'var(--accent)', textTransform:'uppercase', marginBottom:'20px', display:'flex', alignItems:'center', gap:'12px', opacity:0, transform:'translateY(20px)' }}>
      {text}<div style={{ flex:1, height:'1px', background:'var(--glass-border)' }}/>
    </div>
  );

  return (
    <div ref={containerRef} style={{ background:'var(--primary)', color:'var(--text)', minHeight:'100vh', paddingTop:'80px', overflowX:'hidden' }}>

      <section style={{ padding:isMobile?'32px 24px 32px':'40px 40px 36px', borderBottom:'1px solid var(--glass-border)', position:'relative', overflow:'hidden', textAlign:'center' }}>
        <div style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', width:'600px', height:'220px', background:'radial-gradient(ellipse, rgba(227,24,45,0.12) 0%, transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ maxWidth:'860px', margin:'0 auto' }}>
          <div className="me-hero-tag" style={{ fontSize:'10px', letterSpacing:'4px', color:'var(--accent)', textTransform:'uppercase', marginBottom:'14px', opacity:0 }}>{c.hero.tag}</div>
          <h1 className="me-hero-title" style={{ fontSize:'clamp(30px,5vw,52px)', fontWeight:900, lineHeight:1.05, textTransform:'uppercase', letterSpacing:'-1px', marginBottom:'16px', opacity:0, fontFamily:'var(--font-heading)' }}>
            {c.hero.title} <span style={{ color:'var(--accent)' }}>{c.hero.accent}</span>
          </h1>
          <p className="me-hero-sub" style={{ fontSize:isMobile?'13px':'15px', color:'var(--subtext)', maxWidth:'480px', margin:'0 auto 24px', lineHeight:1.8, opacity:0 }}>
            {c.hero.sub}
          </p>
          <div className="me-stats" style={{ display:'flex', justifyContent:'center', gap:isMobile?'28px':'48px', marginBottom:'24px', flexWrap:'wrap', opacity:0 }}>
            {stats.map((s, i) => (
            <div key={i} style={{ textAlign:'center' }}><div style={{ fontSize:'32px', fontWeight:900, color:'var(--accent)' }}>{s.n}</div><div style={{ fontSize:'10px', color:'var(--subtext)', letterSpacing:'2px', textTransform:'uppercase', marginTop:'3px' }}>{s.l}</div></div>
            ))}
          </div>
          <div className="me-cats" style={{ display:'flex', gap:'8px', flexWrap:'wrap', justifyContent:'center', opacity:0 }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                style={{ padding:'6px 16px', border:activeCategory===cat?'1px solid var(--accent)':'1px solid var(--glass-border)', borderRadius:'20px', fontSize:'10px', letterSpacing:'1.5px', textTransform:'uppercase', color:activeCategory===cat?'#fff':'var(--subtext)', background:activeCategory===cat?'var(--accent)':'transparent', cursor:'pointer', transition:'all 0.2s' }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div style={{ maxWidth:'1000px', margin:'0 auto', padding:isMobile?'36px 24px 60px':'44px 40px 64px' }}>

        {featured && <>
        {secLabel(c.labels.featured)}
        <div className="me-fade" data-delay="0.1"
          onClick={() => openPhotos(featured)}
          style={{ border:'1px solid var(--glass-border)', borderRadius:'14px', overflow:'hidden', cursor:photosOf(featured).length ? 'pointer' : 'default', marginBottom:'40px', opacity:0, transform:'translateY(30px)', transition:'border-color 0.25s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(227,24,45,0.4)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='var(--glass-border)'; }}>
          <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr' }}>
            <div style={{ position:'relative', aspectRatio:'1/1', minHeight:isMobile?'200px':'0' }}>
              <ImgSlot bg={featured.imgBg || 'rgba(227,24,45,0.15)'} iconSize={52} src={photosOf(featured)[0]} />
              {c.labels.latest && <div style={{ position:'absolute', top:'12px', left:'12px', background:'var(--accent)', color:'#fff', fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', padding:'3px 9px', borderRadius:'3px', fontWeight:700 }}>{c.labels.latest}</div>}
              <div style={{ position:'absolute', bottom:'12px', right:'12px', background:'rgba(0,0,0,0.65)', color:'#fff', fontSize:'10px', padding:'4px 10px', borderRadius:'4px' }}>{countOf(featured)} {c.labels.photos}</div>
            </div>
            <FeaturedGrid imgBg={featured.imgBg} photos={countOf(featured)} pics={photosOf(featured)} />
          </div>
          <div style={{ padding:'18px 22px', borderTop:'1px solid var(--glass-border)', background:'rgba(255,255,255,0.015)', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'12px' }}>
            <div>
              <div style={{ display:'flex', gap:'8px', marginBottom:'8px' }}>
                <span style={{ display:'inline-block', background:'var(--accent)', color:'#fff', fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', padding:'3px 9px', borderRadius:'3px', fontWeight:700 }}>{featured.cat}</span>
                <span style={{ display:'inline-block', background:'var(--glass)', color:'var(--subtext)', fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', padding:'3px 9px', borderRadius:'3px', border:'1px solid var(--glass-border)' }}>{featured.date}</span>
              </div>
              <div style={{ fontSize:'16px', fontWeight:900, textTransform:'uppercase', letterSpacing:'-0.3px', fontFamily:'var(--font-heading)' }}>{featured.title}</div>
            </div>
            {photosOf(featured).length > 0 && <span style={{ fontSize:'10px', color:'var(--accent)', fontWeight:700 }}>{c.labels.viewAll}</span>}
          </div>
        </div>
        </>}

        {filtered.length > 0 && secLabel(c.labels.all)}
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)', gap:'16px' }}>
          {filtered.map((ev, i) => (
            <div key={events.indexOf(ev)} className="me-card"
              onClick={() => openPhotos(ev)}
              style={{ borderRadius:'12px', overflow:'hidden', border:'1px solid var(--glass-border)', background:'var(--glass)', display:'flex', flexDirection:'column', cursor:photosOf(ev).length ? 'pointer' : 'default', transition:'all 0.25s', opacity:0, transform:'translateY(30px)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(227,24,45,0.35)'; e.currentTarget.style.transform='translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--glass-border)'; e.currentTarget.style.transform='translateY(0)'; }}>
              <div style={{ position:'relative', aspectRatio:'4/3' }}>
                <ImgSlot bg={tone(i)+'26'} iconSize={32} src={photosOf(ev)[0]} />
                <span style={{ position:'absolute', top:'10px', left:'10px', background:tone(i)+'1f', color:tone(i), border:'1px solid rgba(255,255,255,0.1)', fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', padding:'3px 8px', borderRadius:'3px', fontWeight:700 }}>{ev.cat}</span>
                <div style={{ position:'absolute', bottom:'8px', right:'8px', background:'rgba(0,0,0,0.65)', color:'#fff', fontSize:'9px', padding:'3px 8px', borderRadius:'3px' }}>{countOf(ev)} {c.labels.photos}</div>
              </div>
              <div style={{ padding:'14px 16px 18px', flex:1, display:'flex', flexDirection:'column' }}>
                <div style={{ fontSize:'9px', color:'var(--subtext)', marginBottom:'6px', opacity:0.6 }}>{ev.date}</div>
                <div style={{ fontSize:'13px', fontWeight:800, textTransform:'uppercase', letterSpacing:'-0.2px', lineHeight:1.3, flex:1, marginBottom:'12px', fontFamily:'var(--font-heading)' }}>{ev.title}</div>
                {photosOf(ev).length > 0 && <div style={{ fontSize:'11px', color:'var(--accent)', fontWeight:700 }}>{c.labels.view}</div>}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* প্রজেক্ট গ্যালারির একই বড়-ছবির দৃশ্য (.gal-lb) */}
      {viewer && shownPhotos.length > 0 && (
        <div className="gal-lb" role="dialog" aria-modal="true" aria-label={viewer.ev.title} onClick={() => setViewer(null)}>
          <button type="button" className="gal-lb-close" onClick={() => setViewer(null)} aria-label="Close"><X size={22} /></button>
          {shownPhotos.length > 1 && (
            <button type="button" className="gal-lb-nav is-prev" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous photo"><ChevronLeft size={26} /></button>
          )}
          <figure className="gal-lb-figure" onClick={(e) => e.stopPropagation()}>
            <img src={shownPhotos[Math.min(viewer.i, shownPhotos.length - 1)]} alt={viewer.ev.title} />
            <figcaption>
              <span className="gal-lb-kind">{viewer.ev.cat}</span>
              <span className="gal-lb-name">{viewer.ev.title}</span>
              <span className="gal-lb-count">{String(Math.min(viewer.i, shownPhotos.length - 1) + 1).padStart(2, '0')} / {shownPhotos.length}</span>
            </figcaption>
          </figure>
          {shownPhotos.length > 1 && (
            <button type="button" className="gal-lb-nav is-next" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next photo"><ChevronRight size={26} /></button>
          )}
        </div>
      )}
    </div>
  );
};

export default MediaEventsPage;
