import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const releases = [
  { id:0, slug:'strategic-expansion-2026', pr:'PR-2026-001', cat:'Corporate', color:'#E3182D', catBg:'rgba(227,24,45,0.1)', icon:'speakerphone', title:'Anwar Ispat Announces Strategic Expansion and New Product Line Launch for 2026', date:'June 16, 2026', read:'3 min read', imgBg:'rgba(227,24,45,0.15)', featured:true },
  { id:1, slug:'q1-financial-results-2026', pr:'PR-2026-002', cat:'Financial', color:'#3b82f6', catBg:'rgba(59,130,246,0.1)', icon:'chart-bar', title:'Q1 2026 Financial Results — Record Revenue Growth of 28%', date:'May 30, 2026', read:'4 min read', imgBg:'rgba(59,130,246,0.12)', featured:false },
  { id:2, slug:'iso-certification-renewal-2026', pr:'PR-2026-003', cat:'Regulatory', color:'#22c55e', catBg:'rgba(34,197,94,0.1)', icon:'certificate', title:'ISO 9001:2015 & BDS Certification Renewal — Quality Assurance Confirmed', date:'May 10, 2026', read:'2 min read', imgBg:'rgba(34,197,94,0.12)', featured:false },
  { id:3, slug:'narayanganj-rolling-mill-2026', pr:'PR-2026-004', cat:'Operational', color:'#eab308', catBg:'rgba(234,179,8,0.1)', icon:'building-factory', title:'New Rolling Mill Facility Commissioned in Narayanganj Industrial Zone', date:'April 20, 2026', read:'3 min read', imgBg:'rgba(234,179,8,0.12)', featured:false },
  { id:4, slug:'esg-report-2025', pr:'PR-2026-005', cat:'ESG', color:'#22c55e', catBg:'rgba(34,197,94,0.1)', icon:'leaf', title:'Anwar Ispat ESG Report 2025 Released — Zero Waste Water Policy Achieved', date:'April 5, 2026', read:'5 min read', imgBg:'rgba(34,197,94,0.08)', featured:false },
  { id:5, slug:'bgmea-partnership-ratified', pr:'PR-2026-006', cat:'Corporate', color:'#E3182D', catBg:'rgba(227,24,45,0.1)', icon:'file-description', title:'Board Resolution: Strategic Partnership with BGMEA Ratified', date:'March 18, 2026', read:'2 min read', imgBg:'rgba(227,24,45,0.08)', featured:false },
];

const MediaPressPage = () => {
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
    gsap.fromTo('.mp-hero-tag', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.8, delay:0.2, ease:'power3.out' });
    gsap.fromTo('.mp-hero-title', { opacity:0, y:40 }, { opacity:1, y:0, duration:1, delay:0.3, ease:'power3.out' });
    gsap.fromTo('.mp-hero-sub', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.8, delay:0.5, ease:'power3.out' });
    gsap.fromTo('.mp-cats', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.8, delay:0.7, ease:'power3.out' });
    gsap.utils.toArray('.mp-fade').forEach(el => {
      ScrollTrigger.create({ trigger:el, start:'top 88%', onEnter:() => gsap.to(el, { opacity:1, y:0, duration:0.7, delay:parseFloat(el.dataset.delay||0), ease:'power3.out' }) });
    });
    gsap.utils.toArray('.mp-card').forEach((el, i) => {
      ScrollTrigger.create({ trigger:el, start:'top 90%', onEnter:() => gsap.to(el, { opacity:1, x:0, duration:0.6, delay:i*0.08, ease:'power3.out' }) });
    });
    gsap.utils.toArray('.mp-arc').forEach((el, i) => {
      ScrollTrigger.create({ trigger:el, start:'top 92%', onEnter:() => gsap.to(el, { opacity:1, y:0, duration:0.5, delay:i*0.1, ease:'power3.out' }) });
    });
  }, { scope:containerRef });

  const categories = ['All','Corporate','Financial','Regulatory','Operational','ESG'];
  const featured = releases[0];
  const filtered = releases.slice(1).filter(r => activeCategory === 'All' || r.cat === activeCategory);

  const secLabel = (text) => (
    <div className="mp-fade" data-delay="0" style={{ fontSize:'10px', letterSpacing:'3px', color:'var(--accent)', textTransform:'uppercase', marginBottom:'20px', display:'flex', alignItems:'center', gap:'12px', opacity:0, transform:'translateY(20px)' }}>
      {text}<div style={{ flex:1, height:'1px', background:'var(--glass-border)' }}/>
    </div>
  );

  return (
    <div ref={containerRef} style={{ background:'var(--primary)', color:'var(--text)', minHeight:'100vh', paddingTop:'80px', overflowX:'hidden' }}>

      {/* HERO */}
      <section style={{ padding:isMobile?'32px 24px 32px':'40px 40px 36px', borderBottom:'1px solid var(--glass-border)', position:'relative', overflow:'hidden', textAlign:'center' }}>
        <div style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', width:'600px', height:'220px', background:'radial-gradient(ellipse, rgba(227,24,45,0.12) 0%, transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ maxWidth:'860px', margin:'0 auto' }}>
          <div className="mp-hero-tag" style={{ fontSize:'10px', letterSpacing:'4px', color:'var(--accent)', textTransform:'uppercase', marginBottom:'14px', opacity:0 }}>// Official Statements</div>
          <h1 className="mp-hero-title" style={{ fontSize:'clamp(30px,5vw,52px)', fontWeight:900, lineHeight:1.05, textTransform:'uppercase', letterSpacing:'-1px', marginBottom:'16px', opacity:0, fontFamily:'var(--font-heading)' }}>
            Press <span style={{ color:'var(--accent)' }}>Releases</span> &<br/>Announcements
          </h1>
          <p className="mp-hero-sub" style={{ fontSize:isMobile?'13px':'15px', color:'var(--subtext)', maxWidth:'500px', margin:'0 auto 24px', lineHeight:1.8, opacity:0 }}>
            Official statements, corporate declarations and announcements from Anwar Ispat board of directors.
          </p>
          <div className="mp-cats" style={{ display:'flex', gap:'8px', flexWrap:'wrap', justifyContent:'center', opacity:0 }}>
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

        {/* FEATURED */}
        {secLabel('Latest Release')}
        <div className="mp-fade" data-delay="0.1"
          onClick={() => navigate('/media/press/' + featured.slug)}
          style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 360px', gap:0, marginBottom:'40px', border:'1px solid var(--glass-border)', borderRadius:'14px', overflow:'hidden', cursor:'pointer', opacity:0, transform:'translateY(30px)', transition:'border-color 0.25s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(227,24,45,0.4)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='var(--glass-border)'; }}>
          <div style={{ position:'relative', aspectRatio:isMobile?'16/9':'1/1', background:featured.imgBg, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'12px' }}>
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="rgba(227,24,45,0.3)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 11l19-9-9 19-2-8-8-2z"/>
            </svg>
            <span style={{ fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase', color:'rgba(255,255,255,0.15)' }}>Official Image</span>
          </div>
          <div style={{ padding:'28px 26px', display:'flex', flexDirection:'column', justifyContent:'space-between', borderLeft:isMobile?'none':'1px solid var(--glass-border)', background:'rgba(255,255,255,0.015)' }}>
            <div>
              <div style={{ display:'flex', gap:'8px', marginBottom:'14px', flexWrap:'wrap' }}>
                <span style={{ display:'inline-block', background:'var(--accent)', color:'#fff', fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', padding:'3px 9px', borderRadius:'3px', fontWeight:700 }}>Official Statement</span>
                <span style={{ display:'inline-block', background:'rgba(227,24,45,0.1)', color:'var(--accent)', border:'1px solid rgba(227,24,45,0.25)', fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', padding:'3px 9px', borderRadius:'3px', fontWeight:700 }}>Corporate</span>
              </div>
              <div style={{ fontSize:'9px', letterSpacing:'2px', color:'var(--accent)', textTransform:'uppercase', marginBottom:'10px', fontWeight:700 }}>{featured.pr} · {featured.date}</div>
              <h2 style={{ fontSize:isMobile?'15px':'18px', fontWeight:900, lineHeight:1.2, textTransform:'uppercase', letterSpacing:'-0.3px', marginBottom:'12px', fontFamily:'var(--font-heading)' }}>{featured.title}</h2>
              <p style={{ fontSize:'12px', color:'var(--subtext)', lineHeight:1.7 }}>The Board of Directors of Anwar Ispat Limited hereby announces a major strategic expansion initiative targeting 40% increase in production capacity alongside the ANWARS 500W TMT Bar launch.</p>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:'14px', marginTop:'20px', flexWrap:'wrap' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'10px', color:'var(--subtext)' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                {featured.read}
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'10px', color:'var(--subtext)' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                {featured.pr}
              </div>
              <div style={{ marginLeft:'auto', display:'flex', gap:'12px' }}>
                <span style={{ fontSize:'10px', color:'var(--accent)', fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:'4px' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  PDF
                </span>
                <span style={{ fontSize:'10px', color:'var(--accent)', fontWeight:700, cursor:'pointer' }}>Read More →</span>
              </div>
            </div>
          </div>
        </div>

        {/* ALL RELEASES */}
        {secLabel('All Releases')}
        <div style={{ display:'flex', flexDirection:'column', gap:'10px', marginBottom:'40px' }}>
          {filtered.map((r, i) => (
            <div key={r.id} className="mp-card"
              onClick={() => navigate('/media/press/' + r.slug)}
              style={{ borderRadius:'10px', padding:'16px 20px', cursor:'pointer', display:'flex', alignItems:'center', gap:'16px', background:'var(--glass)', border:'1px solid var(--glass-border)', transition:'all 0.2s', opacity:0, transform:'translateX(-20px)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(227,24,45,0.35)'; e.currentTarget.style.background='rgba(227,24,45,0.03)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--glass-border)'; e.currentTarget.style.background='var(--glass)'; }}>
              <div style={{ width:'44px', height:'44px', borderRadius:'10px', background:r.catBg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={r.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'6px', flexWrap:'wrap' }}>
                  <span style={{ fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', color:r.color, fontWeight:700 }}>{r.cat}</span>
                  <span style={{ fontSize:'9px', color:'var(--subtext)', opacity:0.5 }}>{r.pr}</span>
                </div>
                <div style={{ fontSize:'12px', fontWeight:700, textTransform:'uppercase', letterSpacing:'-0.2px', lineHeight:1.35 }}>{r.title}</div>
              </div>
              <div style={{ flexShrink:0, textAlign:'right' }}>
                <div style={{ fontSize:'10px', color:'var(--subtext)', marginBottom:'8px', opacity:0.6 }}>{r.date}</div>
                <div style={{ display:'flex', gap:'10px', justifyContent:'flex-end' }}>
                  <span style={{ fontSize:'10px', color:'var(--accent)', fontWeight:700 }}>PDF ↓</span>
                  <span style={{ fontSize:'10px', color:'var(--accent)', fontWeight:700 }}>Read →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ARCHIVE */}
        {secLabel('Archive')}
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)', gap:'12px' }}>
          {[{y:'2025',n:12},{y:'2024',n:10},{y:'2023',n:9}].map((a,i) => (
            <div key={i} className="mp-arc"
              style={{ borderRadius:'10px', padding:'18px 20px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'space-between', background:'var(--glass)', border:'1px solid var(--glass-border)', transition:'border-color 0.2s', opacity:0, transform:'translateY(20px)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(227,24,45,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--glass-border)'; }}>
              <div>
                <div style={{ fontSize:'22px', fontWeight:900, color:'var(--accent)' }}>{a.y}</div>
                <div style={{ fontSize:'10px', color:'var(--subtext)', marginTop:'3px', letterSpacing:'1px' }}>{a.n} Releases</div>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--subtext)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity:0.3 }}>
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default MediaPressPage;
