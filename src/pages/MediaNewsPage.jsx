import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const articles = [
  { id:0, slug:'rooppur-nuclear-power-plant', cat:'Corporate · Infrastructure', color:'#E3182D', badge:'Featured', badgeBg:'#E3182D', badgeColor:'#fff', title:"Anwar Ispat Supplies Steel for Bangladesh's Rooppur Nuclear Power Plant", date:'June 12, 2026', read:'5 min read', imgBg:'rgba(227,24,45,0.15)' },
  { id:1, slug:'national-steel-excellence-award-2026', cat:'Awards & Recognition', color:'#3b82f6', badge:'Awards', badgeBg:'rgba(59,130,246,0.15)', badgeColor:'#3b82f6', title:'Anwar Ispat Wins National Steel Excellence Award 2026', date:'June 8, 2026', read:'3 min read', imgBg:'rgba(59,130,246,0.15)' },
  { id:2, slug:'500w-tmt-bar-launch', cat:'Product Launch', color:'#22c55e', badge:'Products', badgeBg:'rgba(34,197,94,0.15)', badgeColor:'#22c55e', title:"New 500W TMT Bar: Bangladesh's Strongest Rebar Launched", date:'May 28, 2026', read:'4 min read', imgBg:'rgba(34,197,94,0.15)' },
  { id:3, slug:'padma-bridge-steel-supply', cat:'Infrastructure', color:'#eab308', badge:'Infrastructure', badgeBg:'rgba(234,179,8,0.15)', badgeColor:'#eab308', title:'Padma Bridge Uses Anwar Ispat Steel in Key Structural Components', date:'May 15, 2026', read:'3 min read', imgBg:'rgba(234,179,8,0.15)' },
  { id:4, slug:'bgmea-partnership', cat:'Corporate', color:'#a855f7', badge:'Corporate', badgeBg:'rgba(168,85,247,0.15)', badgeColor:'#a855f7', title:'Anwar Group Partners with BGMEA for Infrastructure Development', date:'April 22, 2026', read:'2 min read', imgBg:'rgba(168,85,247,0.15)' },
  { id:5, slug:'iso-certification-renewed', cat:'Certification', color:'#ec4899', badge:'Certification', badgeBg:'rgba(236,72,153,0.15)', badgeColor:'#ec4899', title:'ISO 9001:2015 Certification Renewed for Anwar Ispat Facilities', date:'March 10, 2026', read:'2 min read', imgBg:'rgba(236,72,153,0.15)' },
  { id:6, slug:'production-capacity-expansion', cat:'Corporate', color:'#E3182D', badge:'Corporate', badgeBg:'rgba(227,24,45,0.15)', badgeColor:'#E3182D', title:'Anwar Ispat Expands Production Capacity by 40% in 2026', date:'June 2026', read:'2 min read', imgBg:'rgba(227,24,45,0.08)' },
  { id:7, slug:'csr-scholarships-2026', cat:'CSR', color:'#22c55e', badge:'CSR', badgeBg:'rgba(34,197,94,0.15)', badgeColor:'#22c55e', title:'CSR Initiative: 500 Scholarships Distributed Across Bangladesh', date:'May 2026', read:'3 min read', imgBg:'rgba(34,197,94,0.08)' },
  { id:8, slug:'48-years-of-excellence', cat:'Corporate', color:'#eab308', badge:'Heritage', badgeBg:'rgba(234,179,8,0.15)', badgeColor:'#eab308', title:'Anwar Group Celebrates 48 Years of Steel Excellence', date:'April 2026', read:'4 min read', imgBg:'rgba(234,179,8,0.08)' },
];

const ImgSlot = ({ bg }) => (
  <div style={{ position:'absolute', inset:0, background:bg, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'8px' }}>
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
    </svg>
    <span style={{ fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase', color:'rgba(255,255,255,0.18)' }}>Image</span>
  </div>
);

const MediaNewsPage = () => {
  const containerRef = useRef(null);
  const tickerRef = useRef(null);
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useGSAP(() => {
    gsap.fromTo('.mn-hero-tag', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.8, delay:0.2, ease:'power3.out' });
    gsap.fromTo('.mn-hero-title', { opacity:0, y:40 }, { opacity:1, y:0, duration:1, delay:0.3, ease:'power3.out' });
    gsap.fromTo('.mn-hero-sub', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.8, delay:0.5, ease:'power3.out' });
    gsap.fromTo('.mn-cats', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.8, delay:0.7, ease:'power3.out' });

    if (tickerRef.current) {
      gsap.to(tickerRef.current, { xPercent:-50, duration:20, ease:'none', repeat:-1 });
    }

    gsap.utils.toArray('.mn-fade').forEach(el => {
      ScrollTrigger.create({ trigger:el, start:'top 88%', onEnter:() => gsap.to(el, { opacity:1, y:0, duration:0.7, delay:parseFloat(el.dataset.delay||0), ease:'power3.out' }) });
    });
    gsap.utils.toArray('.mn-card').forEach((el, i) => {
      ScrollTrigger.create({ trigger:el, start:'top 90%', onEnter:() => gsap.to(el, { opacity:1, y:0, duration:0.6, delay:(i%3)*0.1, ease:'power3.out' }) });
    });
    gsap.utils.toArray('.mn-li').forEach((el, i) => {
      ScrollTrigger.create({ trigger:el, start:'top 92%', onEnter:() => gsap.to(el, { opacity:1, x:0, duration:0.5, delay:i*0.08, ease:'power3.out' }) });
    });
  }, { scope:containerRef });

  const categories = ['All','Corporate','Products','Infrastructure','Awards','CSR'];
  const tickerText = 'Anwar Ispat wins National Steel Excellence Award 2026   •   New 500W TMT Bar launch Q3 2026   •   Rooppur Nuclear Plant Steel Supply confirmed   •   Anwar Group partners with BGMEA   •   ';

  const secLabel = (text) => (
    <div className="mn-fade" data-delay="0" style={{ fontSize:'10px', letterSpacing:'3px', color:'var(--accent)', textTransform:'uppercase', marginBottom:'20px', display:'flex', alignItems:'center', gap:'12px', opacity:0, transform:'translateY(20px)' }}>
      {text}<div style={{ flex:1, height:'1px', background:'var(--glass-border)' }}/>
    </div>
  );

  return (
    <div ref={containerRef} style={{ background:'var(--primary)', color:'var(--text)', minHeight:'100vh', paddingTop:'80px', overflowX:'hidden' }}>

      {/* HERO */}
      <section style={{ padding:isMobile?'32px 24px 32px':'40px 40px 36px', borderBottom:'1px solid var(--glass-border)', position:'relative', overflow:'hidden', textAlign:'center' }}>
        <div style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', width:'700px', height:'250px', background:'radial-gradient(ellipse, rgba(227,24,45,0.12) 0%, transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ maxWidth:'860px', margin:'0 auto' }}>
          <div className="mn-hero-tag" style={{ fontSize:'10px', letterSpacing:'4px', color:'var(--accent)', textTransform:'uppercase', marginBottom:'14px', opacity:0 }}>// News & Media Articles</div>
          <h1 className="mn-hero-title" style={{ fontSize:'clamp(32px,5vw,56px)', fontWeight:900, lineHeight:1.05, textTransform:'uppercase', letterSpacing:'-1px', marginBottom:'16px', opacity:0, fontFamily:'var(--font-heading)' }}>
            Latest <span style={{ color:'var(--accent)' }}>News</span> &<br/>Editorial Covers
          </h1>
          <p className="mn-hero-sub" style={{ fontSize:isMobile?'13px':'15px', color:'var(--subtext)', maxWidth:'520px', margin:'0 auto 24px', lineHeight:1.8, opacity:0 }}>
            Stay updated with Anwar Ispat media achievements, corporate milestones, and infrastructure stories.
          </p>
          <div className="mn-cats" style={{ display:'flex', gap:'8px', flexWrap:'wrap', justifyContent:'center', opacity:0 }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                style={{ padding:'6px 16px', border:activeCategory===cat?'1px solid var(--accent)':'1px solid var(--glass-border)', borderRadius:'20px', fontSize:'10px', letterSpacing:'1.5px', textTransform:'uppercase', color:activeCategory===cat?'#fff':'var(--subtext)', background:activeCategory===cat?'var(--accent)':'transparent', cursor:'pointer', transition:'all 0.2s' }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div style={{ background:'rgba(227,24,45,0.06)', borderBottom:'1px solid rgba(227,24,45,0.12)', padding:'10px 0', display:'flex', alignItems:'center', overflow:'hidden' }}>
        <div style={{ flexShrink:0, padding:'0 16px 0 24px' }}>
          <span style={{ fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase', color:'var(--accent)', fontWeight:700, background:'rgba(227,24,45,0.15)', padding:'3px 8px', borderRadius:'3px', whiteSpace:'nowrap' }}>Live</span>
        </div>
        <div style={{ flex:1, overflow:'hidden' }}>
          <div ref={tickerRef} style={{ display:'inline-block', whiteSpace:'nowrap' }}>
            <span style={{ fontSize:'11px', color:'var(--subtext)' }}>{tickerText}{tickerText}</span>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div style={{ maxWidth:'1060px', margin:'0 auto', padding:isMobile?'40px 24px 60px':'48px 40px 64px' }}>

        {/* FEATURED */}
        {secLabel('Featured Story')}
        <div className="mn-fade" data-delay="0.1"
          onClick={() => navigate('/media/news/' + articles[0].slug)}
          style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:0, marginBottom:'44px', border:'1px solid var(--glass-border)', borderRadius:'14px', overflow:'hidden', cursor:'pointer', opacity:0, transform:'translateY(30px)', transition:'border-color 0.25s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(227,24,45,0.4)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='var(--glass-border)'; }}>
          <div style={{ position:'relative', aspectRatio:'1/1' }}>
            <ImgSlot bg={articles[0].imgBg} />
          </div>
          <div style={{ padding:'32px 28px', display:'flex', flexDirection:'column', justifyContent:'space-between', borderLeft:isMobile?'none':'1px solid var(--glass-border)', background:'rgba(255,255,255,0.015)' }}>
            <div>
              <span style={{ display:'inline-block', background:'var(--accent)', color:'#fff', fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase', padding:'4px 10px', borderRadius:'3px', fontWeight:700, marginBottom:'14px' }}>Featured</span>
              <div style={{ fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase', fontWeight:700, color:'var(--accent)', marginBottom:'10px' }}>Corporate · Infrastructure</div>
              <div style={{ fontSize:isMobile?'16px':'20px', fontWeight:900, lineHeight:1.2, textTransform:'uppercase', letterSpacing:'-0.5px', marginBottom:'14px', fontFamily:'var(--font-heading)' }}>{articles[0].title}</div>
              <p style={{ fontSize:'13px', color:'var(--subtext)', lineHeight:1.7 }}>Selected as the primary steel supplier for Rooppur — Bangladesh's first nuclear facility, marking a historic milestone.</p>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'10px', color:'var(--subtext)', marginTop:'20px' }}>
              <span>{articles[0].date}</span>
              <span style={{ width:'3px', height:'3px', borderRadius:'50%', background:'var(--subtext)' }}/>
              <span>{articles[0].read}</span>
              <span style={{ marginLeft:'auto', color:'var(--accent)', fontWeight:700 }}>Read More →</span>
            </div>
          </div>
        </div>

        {/* CARD GRID */}
        {secLabel('More Stories')}
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)', gap:'20px', marginBottom:'44px' }}>
          {articles.slice(1, 7).map((article) => (
            <div key={article.id} className="mn-card"
              onClick={() => navigate('/media/news/' + article.slug)}
              style={{ borderRadius:'12px', overflow:'hidden', border:'1px solid var(--glass-border)', background:'var(--glass)', display:'flex', flexDirection:'column', cursor:'pointer', transition:'border-color 0.25s, transform 0.25s', opacity:0, transform:'translateY(30px)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(227,24,45,0.35)'; e.currentTarget.style.transform='translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--glass-border)'; e.currentTarget.style.transform='translateY(0)'; }}>
              <div style={{ position:'relative', aspectRatio:'1/1' }}>
                <ImgSlot bg={article.imgBg} />
                <span style={{ position:'absolute', top:'10px', left:'10px', background:article.badgeBg, color:article.badgeColor, border:'1px solid rgba(255,255,255,0.15)', fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', padding:'3px 8px', borderRadius:'3px', fontWeight:700 }}>{article.badge}</span>
              </div>
              <div style={{ padding:'16px 18px 18px', flex:1, display:'flex', flexDirection:'column' }}>
                <div style={{ fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase', fontWeight:700, color:article.color, marginBottom:'8px' }}>{article.cat}</div>
                <div style={{ fontSize:'13px', fontWeight:800, lineHeight:1.3, flex:1, textTransform:'uppercase', letterSpacing:'-0.2px', fontFamily:'var(--font-heading)', marginBottom:'12px' }}>{article.title}</div>
                <div style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'10px', color:'var(--subtext)' }}>
                  <span>{article.date}</span>
                  <span style={{ marginLeft:'auto', color:'var(--accent)', fontWeight:700 }}>Read →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* TRENDING */}
        {secLabel('Trending')}
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:'12px' }}>
          {articles.slice(6, 9).concat([articles[1]]).map((article, i) => (
            <div key={article.id} className="mn-li"
              onClick={() => navigate('/media/news/' + article.slug)}
              style={{ display:'flex', gap:'14px', padding:'16px 18px', border:'1px solid var(--glass-border)', borderRadius:'10px', background:'var(--glass)', cursor:'pointer', alignItems:'flex-start', transition:'all 0.2s', opacity:0, transform:'translateX(-20px)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(227,24,45,0.35)'; e.currentTarget.style.background='rgba(227,24,45,0.03)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--glass-border)'; e.currentTarget.style.background='var(--glass)'; }}>
              <div style={{ fontSize:'26px', fontWeight:900, color:'rgba(227,24,45,0.18)', flexShrink:0, lineHeight:1, width:'32px' }}>0{i+1}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:'12px', fontWeight:700, lineHeight:1.4, marginBottom:'5px', textTransform:'uppercase', letterSpacing:'-0.2px' }}>{article.title}</div>
                <div style={{ fontSize:'10px', color:'var(--subtext)' }}>{article.date} · {article.read}</div>
              </div>
              <div style={{ color:'var(--accent)', fontSize:'14px', flexShrink:0, marginTop:'2px' }}>→</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default MediaNewsPage;
