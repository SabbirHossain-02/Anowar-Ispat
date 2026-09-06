import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '../lib/content';
import { PRESS_DEFAULTS, releaseSlug, paragraphs, tone } from '../lib/press';

gsap.registerPlugin(ScrollTrigger);

const PressArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // তালিকার পাতা যে লেখা দেখায়, এখানেও সেটাই — একই কী
  const c = useContent('media-press', PRESS_DEFAULTS);
  const releases = c.releases;

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [slug]);

  const index = releases.findIndex((r, i) => releaseSlug(r, i) === slug);
  const release = index < 0 ? null : releases[index];
  const url = 'https://anwarispat.com/media/press/' + slug;

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  useGSAP(() => {
    gsap.fromTo('.pa-fade', { opacity:0, y:30 }, { opacity:1, y:0, duration:0.8, stagger:0.1, delay:0.2, ease:'power3.out' });
    gsap.utils.toArray('.pa-scroll').forEach(el => {
      ScrollTrigger.create({ trigger:el, start:'top 88%', onEnter:() => gsap.to(el, { opacity:1, y:0, duration:0.6, ease:'power3.out' }) });
    });
  }, { scope:containerRef, dependencies:[index] });

  if (!release) {
    return (
      <div style={{ background:'var(--primary)', color:'var(--text)', minHeight:'100vh', paddingTop:'80px', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:'16px' }}>
        <div style={{ fontSize:'48px', fontWeight:900, color:'var(--accent)' }}>404</div>
        <div style={{ fontSize:'16px', color:'var(--subtext)' }}>{c.notFound}</div>
        <button onClick={() => navigate('/media/press')} style={{ marginTop:'12px', background:'var(--accent)', color:'#fff', border:'none', padding:'10px 24px', borderRadius:'6px', fontSize:'12px', letterSpacing:'1px', textTransform:'uppercase', cursor:'pointer', fontWeight:700 }}>&#8592; Back to Press</button>
      </div>
    );
  }

  // রং তালিকার পাতার মতোই ক্রম অনুযায়ী, লেখার সঙ্গে সংরক্ষিত নয়
  const color = tone(index);
  const catBg = color + '1a';
  const body = paragraphs(release.body);
  const related = releases.map((r, i) => ({ r, i })).filter(x => x.i !== index).slice(0, 3);

  const platforms = [
    { name:'LinkedIn', color:'#0077b5', bg:'rgba(0,119,181,0.08)', border:'rgba(0,119,181,0.25)', href:'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url) },
    { name:'Facebook', color:'#1877f2', bg:'rgba(24,119,242,0.08)', border:'rgba(24,119,242,0.25)', href:'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) },
    { name:'WhatsApp', color:'#25d366', bg:'rgba(37,211,102,0.08)', border:'rgba(37,211,102,0.25)', href:'https://wa.me/?text=' + encodeURIComponent(release.title + ' ' + url) },
  ];

  return (
    <div ref={containerRef} style={{ background:'var(--primary)', color:'var(--text)', minHeight:'100vh', paddingTop:'80px', overflowX:'hidden' }}>

      {/* BREADCRUMB */}
      <div style={{ padding:isMobile?'10px 24px':'10px 40px', display:'flex', alignItems:'center', gap:'8px', fontSize:'11px', color:'var(--subtext)', borderBottom:'1px solid var(--glass-border)', flexWrap:'wrap' }}>
        {[['Home','/'],['Media Center','/media/press'],['Press Releases','/media/press']].map(([label,path],i) => (
          <React.Fragment key={i}>
            <span onClick={() => navigate(path)} style={{ cursor:'pointer', transition:'color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color='var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.color='var(--subtext)'; }}>{label}</span>
            <span style={{ opacity:0.3 }}>&#8250;</span>
          </React.Fragment>
        ))}
        <span style={{ color:'var(--text)', maxWidth:'220px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{release.pr}</span>
      </div>

      {/* HERO */}
      <div style={{ maxWidth:'900px', margin:'0 auto', padding:isMobile?'28px 24px 0':'40px 40px 0' }}>
        <button className="pa-fade" onClick={() => navigate('/media/press')}
          style={{ display:'inline-flex', alignItems:'center', gap:'8px', fontSize:'11px', letterSpacing:'1.5px', textTransform:'uppercase', color:'var(--subtext)', background:'transparent', border:'none', cursor:'pointer', marginBottom:'24px', padding:0, transition:'color 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.color='var(--accent)'; }}
          onMouseLeave={e => { e.currentTarget.style.color='var(--subtext)'; }}>
          &#8592; Back to Press Releases
        </button>

        <div className="pa-fade" style={{ display:'flex', gap:'8px', marginBottom:'14px', flexWrap:'wrap' }}>
          <span style={{ display:'inline-block', background:'var(--accent)', color:'#fff', fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', padding:'3px 9px', borderRadius:'3px', fontWeight:700 }}>{c.stamp}</span>
          {release.cat && <span style={{ display:'inline-block', background:catBg, color:color, fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', padding:'3px 9px', borderRadius:'3px', fontWeight:700, border:'1px solid ' + color + '40' }}>{release.cat}</span>}
          {release.pr && <span style={{ display:'inline-block', background:'var(--glass)', color:'var(--subtext)', fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', padding:'3px 9px', borderRadius:'3px', fontWeight:700, border:'1px solid var(--glass-border)' }}>{release.pr}</span>}
        </div>

        <h1 className="pa-fade" style={{ fontSize:isMobile?'clamp(20px,5vw,28px)':'clamp(24px,4vw,38px)', fontWeight:900, lineHeight:1.1, textTransform:'uppercase', letterSpacing:'-1px', marginBottom:'18px', fontFamily:'var(--font-heading)' }}>{release.title}</h1>

        <div className="pa-fade" style={{ display:'flex', alignItems:'center', gap:'10px', fontSize:'12px', color:'var(--subtext)', flexWrap:'wrap', marginBottom:'28px' }}>
          {release.date && <span>{release.date}</span>}
          <span style={{ width:'3px', height:'3px', borderRadius:'50%', background:'var(--subtext)', flexShrink:0 }}/>
          {release.read && <span>{release.read}</span>}
          <span style={{ width:'3px', height:'3px', borderRadius:'50%', background:'var(--subtext)', flexShrink:0 }}/>
          <span style={{ color:'var(--accent)', fontWeight:600 }}>Anwar Ispat</span>
        </div>
      </div>

      {/* BODY */}
      <div style={{ maxWidth:'900px', margin:'0 auto', padding:isMobile?'0 24px 60px':'0 40px 72px', display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 240px', gap:isMobile?'40px':'56px', alignItems:'start' }}>

        {/* ARTICLE */}
        <div>
          <div className="pa-fade" style={{ padding:'16px 20px', background:catBg, borderLeft:'3px solid ' + color, borderRadius:'0 8px 8px 0', marginBottom:'28px' }}>
            <div style={{ fontSize:'10px', letterSpacing:'2px', color:color, textTransform:'uppercase', fontWeight:700, marginBottom:'4px' }}>{c.immediate}</div>
            <div style={{ fontSize:'12px', color:'var(--subtext)', lineHeight:1.6 }}>{release.date} &#8212; Dhaka, Bangladesh &#8212; Anwar Ispat Limited</div>
          </div>

          {body.map((para, i) => (
            <p key={i} className="pa-scroll"
              style={{ fontSize:i===0?'15px':'14px', color:i===0?'var(--text)':'var(--subtext)', lineHeight:1.9, marginBottom:'18px', opacity:0, transform:'translateY(20px)', fontWeight:i===0?500:400 }}>
              {i===1 && <span style={{ display:'block', width:'40px', height:'3px', background:'var(--accent)', borderRadius:'2px', marginBottom:'20px' }}/>}
              {para}
            </p>
          ))}

          {/* CONTACT */}
          <div className="pa-scroll" style={{ marginTop:'32px', padding:'20px 22px', background:'var(--glass)', border:'1px solid var(--glass-border)', borderRadius:'10px', opacity:0, transform:'translateY(20px)' }}>
            <div style={{ fontSize:'10px', letterSpacing:'2px', textTransform:'uppercase', color:'var(--accent)', marginBottom:'12px', fontWeight:700 }}>{c.contactLabel}</div>
            <div style={{ fontSize:'13px', fontWeight:700, marginBottom:'4px' }}>{c.mediaTitle}</div>
            <div style={{ fontSize:'12px', color:'var(--subtext)', lineHeight:1.7 }}>
              Anwar Ispat Limited<br/>
              <a href={'mailto:' + c.mediaEmail} style={{ color:'inherit' }}>{c.mediaEmail}</a><br/>
              <a href={'tel:' + String(c.mediaPhone).replace(/[^0-9+]/g, '')} style={{ color:'inherit' }}>{c.mediaPhone}</a>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div style={{ position:isMobile?'relative':'sticky', top:'100px' }}>

          {/* SHARE */}
          <div className="pa-scroll" style={{ marginBottom:'24px', opacity:0, transform:'translateY(20px)' }}>
            <div style={{ fontSize:'10px', letterSpacing:'3px', textTransform:'uppercase', color:'var(--accent)', marginBottom:'14px', display:'flex', alignItems:'center', gap:'10px' }}>
              Share<div style={{ flex:1, height:'1px', background:'var(--glass-border)' }}/>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
              {platforms.map((p,i) => (
                <a key={i} href={p.href} target="_blank" rel="noopener noreferrer"
                  style={{ display:'flex', alignItems:'center', gap:'10px', padding:'10px 14px', background:p.bg, border:'1px solid ' + p.border, borderRadius:'8px', color:p.color, textDecoration:'none', fontSize:'12px', fontWeight:600, transition:'transform 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateX(4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform='translateX(0)'; }}>
                  {p.name}
                </a>
              ))}
              <div style={{ display:'flex', gap:'8px', alignItems:'center', background:'var(--glass)', border:'1px solid var(--glass-border)', borderRadius:'8px', padding:'9px 12px', marginTop:'4px' }}>
                <span style={{ fontSize:'10px', color:'var(--subtext)', flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{url}</span>
                <button onClick={handleCopy} style={{ flexShrink:0, background:copied?'rgba(34,197,94,0.15)':'rgba(227,24,45,0.15)', border:'1px solid ' + (copied?'rgba(34,197,94,0.3)':'rgba(227,24,45,0.3)'), color:copied?'#22c55e':'var(--accent)', padding:'4px 10px', borderRadius:'5px', fontSize:'10px', fontWeight:700, cursor:'pointer', transition:'all 0.2s' }}>
                  {copied?'Copied':'Copy'}
                </button>
              </div>
            </div>
          </div>

          {/* RELATED */}
          {related.length > 0 && (
          <div className="pa-scroll" style={{ opacity:0, transform:'translateY(20px)' }}>
            <div style={{ fontSize:'10px', letterSpacing:'3px', textTransform:'uppercase', color:'var(--accent)', marginBottom:'14px', display:'flex', alignItems:'center', gap:'10px' }}>
              Related<div style={{ flex:1, height:'1px', background:'var(--glass-border)' }}/>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
              {related.map(({ r, i }) => (
                <div key={i} onClick={() => navigate('/media/press/' + releaseSlug(r, i))}
                  style={{ display:'flex', gap:'12px', padding:'12px', border:'1px solid var(--glass-border)', borderRadius:'10px', background:'var(--glass)', cursor:'pointer', transition:'all 0.2s', alignItems:'flex-start' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=tone(i) + '50'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--glass-border)'; }}>
                  <div style={{ width:'48px', height:'48px', borderRadius:'8px', background:tone(i) + '1a', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={tone(i)} strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:'9px', color:tone(i), letterSpacing:'1.5px', textTransform:'uppercase', fontWeight:700, marginBottom:'4px' }}>{r.pr}</div>
                    <div style={{ fontSize:'11px', fontWeight:700, lineHeight:1.4, textTransform:'uppercase', letterSpacing:'-0.2px' }}>{r.title}</div>
                    <div style={{ fontSize:'10px', color:'var(--subtext)', marginTop:'4px' }}>{r.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default PressArticlePage;
