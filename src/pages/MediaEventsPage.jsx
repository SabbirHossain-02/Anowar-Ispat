import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const events = [
  { id:0, slug:'strategic-expansion-ceremony-2026', cat:'Corporate', color:'#E3182D', catBg:'rgba(227,24,45,0.12)', title:'Strategic Expansion Announcement Ceremony', date:'June 16, 2026', photos:48, imgBg:'rgba(227,24,45,0.15)' },
  { id:1, slug:'national-steel-excellence-award-ceremony', cat:'Awards', color:'#3b82f6', catBg:'rgba(59,130,246,0.12)', title:'National Steel Excellence Award Ceremony 2026', date:'June 8, 2026', photos:32, imgBg:'rgba(59,130,246,0.12)' },
  { id:2, slug:'500w-tmt-bar-launch-event', cat:'Product Launch', color:'#22c55e', catBg:'rgba(34,197,94,0.12)', title:'500W TMT Bar Official Launch Event', date:'May 28, 2026', photos:24, imgBg:'rgba(34,197,94,0.12)' },
  { id:3, slug:'narayanganj-rolling-mill-commissioning', cat:'Factory', color:'#eab308', catBg:'rgba(234,179,8,0.12)', title:'Narayanganj Rolling Mill Commissioning', date:'April 20, 2026', photos:40, imgBg:'rgba(234,179,8,0.12)' },
  { id:4, slug:'scholarship-distribution-ceremony-2026', cat:'CSR', color:'#a855f7', catBg:'rgba(168,85,247,0.12)', title:'Scholarship Distribution Ceremony 2026', date:'May 2026', photos:18, imgBg:'rgba(168,85,247,0.12)' },
  { id:5, slug:'48th-anniversary-gala-2026', cat:'Corporate', color:'#ec4899', catBg:'rgba(236,72,153,0.12)', title:'48th Anniversary Celebration Gala', date:'April 2026', photos:28, imgBg:'rgba(236,72,153,0.08)' },
  { id:6, slug:'free-medical-camp-narayanganj', cat:'CSR', color:'#22c55e', catBg:'rgba(34,197,94,0.12)', title:'Free Medical Camp — Narayanganj District', date:'March 2026', photos:22, imgBg:'rgba(34,197,94,0.08)' },
  { id:7, slug:'bgmea-partnership-signing-ceremony', cat:'Corporate', color:'#E3182D', catBg:'rgba(227,24,45,0.12)', title:'BGMEA Partnership Signing Ceremony', date:'March 18, 2026', photos:15, imgBg:'rgba(227,24,45,0.08)' },
];

const ImgSlot = ({ bg, iconSize = 36 }) => (
  <div style={{ position:'absolute', inset:0, background:bg, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'8px' }}>
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
    </svg>
    <span style={{ fontSize:'8px', letterSpacing:'2px', textTransform:'uppercase', color:'rgba(255,255,255,0.15)' }}>Photo</span>
  </div>
);

const FeaturedGrid = ({ imgBg, photos }) => (
  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'3px' }}>
    <div style={{ position:'relative', aspectRatio:'1/1' }}><ImgSlot bg="rgba(227,24,45,0.12)" iconSize={22} /></div>
    <div style={{ position:'relative', aspectRatio:'1/1' }}><ImgSlot bg="rgba(227,24,45,0.09)" iconSize={22} /></div>
    <div style={{ position:'relative', aspectRatio:'1/1' }}><ImgSlot bg="rgba(227,24,45,0.07)" iconSize={22} /></div>
    <div style={{ position:'relative', aspectRatio:'1/1' }}>
      <ImgSlot bg="rgba(227,24,45,0.05)" iconSize={22} />
      <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', fontWeight:900, color:'var(--accent)' }}>+{photos - 4}</div>
    </div>
  </div>
);

const MediaEventsPage = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useGSAP(() => {
    gsap.fromTo('.me-hero-tag', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.8, delay:0.2, ease:'power3.out' });
    gsap.fromTo('.me-hero-title', { opacity:0, y:40 }, { opacity:1, y:0, duration:1, delay:0.3, ease:'power3.out' });
    gsap.fromTo('.me-hero-sub', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.8, delay:0.5, ease:'power3.out' });
    gsap.fromTo('.me-stats', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.8, delay:0.7, ease:'power3.out' });
    gsap.fromTo('.me-cats', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.8, delay:0.8, ease:'power3.out' });
    gsap.utils.toArray('.me-fade').forEach(el => {
      ScrollTrigger.create({ trigger:el, start:'top 88%', onEnter:() => gsap.to(el, { opacity:1, y:0, duration:0.7, delay:parseFloat(el.dataset.delay||0), ease:'power3.out' }) });
    });
    gsap.utils.toArray('.me-card').forEach((el, i) => {
      ScrollTrigger.create({ trigger:el, start:'top 90%', onEnter:() => gsap.to(el, { opacity:1, y:0, duration:0.6, delay:(i%3)*0.1, ease:'power3.out' }) });
    });
  }, { scope:containerRef });

  const categories = ['All','Corporate','Product Launch','CSR','Awards','Factory'];
  const featured = events[0];
  const filtered = events.slice(1).filter(e => activeCategory === 'All' || e.cat === activeCategory);

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
          <div className="me-hero-tag" style={{ fontSize:'10px', letterSpacing:'4px', color:'var(--accent)', textTransform:'uppercase', marginBottom:'14px', opacity:0 }}>// Visual Stories</div>
          <h1 className="me-hero-title" style={{ fontSize:'clamp(30px,5vw,52px)', fontWeight:900, lineHeight:1.05, textTransform:'uppercase', letterSpacing:'-1px', marginBottom:'16px', opacity:0, fontFamily:'var(--font-heading)' }}>
            Event <span style={{ color:'var(--accent)' }}>Gallery</span>
          </h1>
          <p className="me-hero-sub" style={{ fontSize:isMobile?'13px':'15px', color:'var(--subtext)', maxWidth:'480px', margin:'0 auto 24px', lineHeight:1.8, opacity:0 }}>
            Behind the scenes of Anwar Ispat corporate events, product launches, CSR programs and factory milestones.
          </p>
          <div className="me-stats" style={{ display:'flex', justifyContent:'center', gap:isMobile?'28px':'48px', marginBottom:'24px', flexWrap:'wrap', opacity:0 }}>
            <div style={{ textAlign:'center' }}><div style={{ fontSize:'32px', fontWeight:900, color:'var(--accent)' }}>24+</div><div style={{ fontSize:'10px', color:'var(--subtext)', letterSpacing:'2px', textTransform:'uppercase', marginTop:'3px' }}>Events</div></div>
            <div style={{ textAlign:'center' }}><div style={{ fontSize:'32px', fontWeight:900, color:'var(--accent)' }}>500+</div><div style={{ fontSize:'10px', color:'var(--subtext)', letterSpacing:'2px', textTransform:'uppercase', marginTop:'3px' }}>Photos</div></div>
            <div style={{ textAlign:'center' }}><div style={{ fontSize:'32px', fontWeight:900, color:'var(--accent)' }}>2026</div><div style={{ fontSize:'10px', color:'var(--subtext)', letterSpacing:'2px', textTransform:'uppercase', marginTop:'3px' }}>Latest</div></div>
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

        {secLabel('Featured Event')}
        <div className="me-fade" data-delay="0.1"
          onClick={() => navigate('/media/events/' + featured.slug)}
          style={{ border:'1px solid var(--glass-border)', borderRadius:'14px', overflow:'hidden', cursor:'pointer', marginBottom:'40px', opacity:0, transform:'translateY(30px)', transition:'border-color 0.25s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(227,24,45,0.4)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='var(--glass-border)'; }}>
          <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr' }}>
            <div style={{ position:'relative', aspectRatio:'1/1', minHeight:isMobile?'200px':'0' }}>
              <ImgSlot bg={featured.imgBg} iconSize={52} />
              <div style={{ position:'absolute', top:'12px', left:'12px', background:'var(--accent)', color:'#fff', fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', padding:'3px 9px', borderRadius:'3px', fontWeight:700 }}>Latest</div>
              <div style={{ position:'absolute', bottom:'12px', right:'12px', background:'rgba(0,0,0,0.65)', color:'#fff', fontSize:'10px', padding:'4px 10px', borderRadius:'4px' }}>{featured.photos} Photos</div>
            </div>
            <FeaturedGrid imgBg={featured.imgBg} photos={featured.photos} />
          </div>
          <div style={{ padding:'18px 22px', borderTop:'1px solid var(--glass-border)', background:'rgba(255,255,255,0.015)', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'12px' }}>
            <div>
              <div style={{ display:'flex', gap:'8px', marginBottom:'8px' }}>
                <span style={{ display:'inline-block', background:'var(--accent)', color:'#fff', fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', padding:'3px 9px', borderRadius:'3px', fontWeight:700 }}>{featured.cat}</span>
                <span style={{ display:'inline-block', background:'var(--glass)', color:'var(--subtext)', fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', padding:'3px 9px', borderRadius:'3px', border:'1px solid var(--glass-border)' }}>{featured.date}</span>
              </div>
              <div style={{ fontSize:'16px', fontWeight:900, textTransform:'uppercase', letterSpacing:'-0.3px', fontFamily:'var(--font-heading)' }}>{featured.title}</div>
            </div>
            <span style={{ fontSize:'10px', color:'var(--accent)', fontWeight:700 }}>View All Photos →</span>
          </div>
        </div>

        {secLabel('All Events')}
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)', gap:'16px' }}>
          {filtered.map((ev, i) => (
            <div key={ev.id} className="me-card"
              onClick={() => navigate('/media/events/' + ev.slug)}
              style={{ borderRadius:'12px', overflow:'hidden', border:'1px solid var(--glass-border)', background:'var(--glass)', display:'flex', flexDirection:'column', cursor:'pointer', transition:'all 0.25s', opacity:0, transform:'translateY(30px)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(227,24,45,0.35)'; e.currentTarget.style.transform='translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--glass-border)'; e.currentTarget.style.transform='translateY(0)'; }}>
              <div style={{ position:'relative', aspectRatio:'4/3' }}>
                <ImgSlot bg={ev.imgBg} iconSize={32} />
                <span style={{ position:'absolute', top:'10px', left:'10px', background:ev.catBg, color:ev.color, border:'1px solid rgba(255,255,255,0.1)', fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', padding:'3px 8px', borderRadius:'3px', fontWeight:700 }}>{ev.cat}</span>
                <div style={{ position:'absolute', bottom:'8px', right:'8px', background:'rgba(0,0,0,0.65)', color:'#fff', fontSize:'9px', padding:'3px 8px', borderRadius:'3px' }}>{ev.photos} Photos</div>
              </div>
              <div style={{ padding:'14px 16px 18px', flex:1, display:'flex', flexDirection:'column' }}>
                <div style={{ fontSize:'9px', color:'var(--subtext)', marginBottom:'6px', opacity:0.6 }}>{ev.date}</div>
                <div style={{ fontSize:'13px', fontWeight:800, textTransform:'uppercase', letterSpacing:'-0.2px', lineHeight:1.3, flex:1, marginBottom:'12px', fontFamily:'var(--font-heading)' }}>{ev.title}</div>
                <div style={{ fontSize:'11px', color:'var(--accent)', fontWeight:700 }}>View Gallery →</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default MediaEventsPage;
