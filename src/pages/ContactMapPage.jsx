import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const locations = [
  { color:'#E3182D', title:'Head Office', address:'Chawk Bazar, Dhaka-1211', badge:'HQ', mapUrl:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.3!2d90.4!3d23.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sChawk+Bazar%2C+Dhaka!5e0!3m2!1sen!2sbd!4v1' },
  { color:'#3b82f6', title:'Narayanganj Factory', address:'Industrial Zone, Narayanganj', badge:'FACTORY', mapUrl:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654!2d90.5!3d23.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b5c1b3deeed5%3A0xbef9f89f1f789232!2sNarayanganj!5e0!3m2!1sen!2sbd!4v1' },
  { color:'#22c55e', title:'Chittagong Sales Office', address:'Agrabad, Chittagong-4100', badge:'SALES', mapUrl:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689!2d91.8!3d22.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd8a64e3d5b63%3A0xd7c64b4d536c28e5!2sAgrabad%2C+Chittagong!5e0!3m2!1sen!2sbd!4v1' },
  { color:'#eab308', title:'Sylhet Branch Office', address:'Zindabazar, Sylhet-3100', badge:'BRANCH', mapUrl:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3617!2d91.8!3d24.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375054d3d270329d%3A0x4e36e7e83e8a1f8!2sZindabazar%2C+Sylhet!5e0!3m2!1sen!2sbd!4v1' },
];

const ContactMapPage = () => {
  const containerRef = useRef(null);
  const [activeMap, setActiveMap] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useGSAP(() => {
    gsap.fromTo('.cm-hero-tag', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.4, delay:0, ease:'power3.out' });
    gsap.fromTo('.cm-hero-title', { opacity:0, y:40 }, { opacity:1, y:0, duration:0.5, delay:0.05, ease:'power3.out' });
    gsap.fromTo('.cm-hero-sub', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.4, delay:0.1, ease:'power3.out' });
    gsap.utils.toArray('.cm-fade').forEach(el => {
      ScrollTrigger.create({ trigger:el, start:'top 88%', onEnter:() => gsap.to(el, { opacity:1, y:0, duration:0.7, delay:parseFloat(el.dataset.delay||0), ease:'power3.out' }) });
    });
  }, { scope:containerRef });

  const secLabel = (text) => (
    <div className="cm-fade" data-delay="0" style={{ fontSize:'10px', letterSpacing:'3px', color:'var(--accent)', textTransform:'uppercase', marginBottom:'18px', display:'flex', alignItems:'center', gap:'12px', opacity:0, transform:'translateY(20px)' }}>
      {text}<div style={{ flex:1, height:'1px', background:'var(--glass-border)' }}/>
    </div>
  );

  const active = locations[activeMap];

  return (
    <div ref={containerRef} style={{ background:'var(--primary)', color:'var(--text)', minHeight:'100vh', paddingTop:'80px', overflowX:'hidden' }}>

      <section style={{ padding:isMobile?'16px 24px 16px':'20px 40px 16px', borderBottom:'1px solid var(--glass-border)', position:'relative', overflow:'hidden', textAlign:'center' }}>
        <div style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', width:'600px', height:'220px', background:'radial-gradient(ellipse, rgba(227,24,45,0.12) 0%, transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ maxWidth:'860px', margin:'0 auto' }}>
          <div className="cm-hero-tag" style={{ fontSize:'10px', letterSpacing:'4px', color:'var(--accent)', textTransform:'uppercase', marginBottom:'14px' }}>// Find Our Way</div>
          <h1 className="cm-hero-title" style={{ fontSize:'clamp(30px,5vw,52px)', fontWeight:900, lineHeight:1.05, textTransform:'uppercase', letterSpacing:'-1px', marginBottom:'16px', opacity:0, fontFamily:'var(--font-heading)' }}>
            Google <span style={{ color:'var(--accent)' }}>Map</span>
          </h1>
          <p className="cm-hero-sub" style={{ fontSize:isMobile?'13px':'15px', color:'var(--subtext)', maxWidth:'480px', margin:'0 auto', lineHeight:1.8 }}>
            Locate our head office and all facilities across Bangladesh.
          </p>
        </div>
      </section>

      <div style={{ maxWidth:'1000px', margin:'0 auto', padding:isMobile?'36px 24px 60px':'44px 40px 64px' }}>

        {/* LOCATION TABS */}
        {secLabel('Select Location')}
        <div className="cm-fade" data-delay="0.1" style={{ display:'grid', gridTemplateColumns:isMobile?'1fr 1fr':'repeat(4,1fr)', gap:'10px', marginBottom:'24px', opacity:0, transform:'translateY(20px)' }}>
          {locations.map((loc, i) => (
            <button key={i} onClick={() => setActiveMap(i)}
              style={{ padding:'14px 16px', border:'1px solid ' + (activeMap===i ? loc.color + '60' : 'var(--glass-border)'), borderRadius:'10px', background: activeMap===i ? loc.color + '10' : 'var(--glass)', cursor:'pointer', transition:'all 0.2s', textAlign:'left' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'6px' }}>
                <div style={{ width:'8px', height:'8px', borderRadius:'50%', background: activeMap===i ? loc.color : 'var(--subtext)', opacity: activeMap===i ? 1 : 0.4 }}/>
                <span style={{ fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', color: activeMap===i ? loc.color : 'var(--subtext)', fontWeight:700 }}>{loc.badge}</span>
              </div>
              <div style={{ fontSize:'12px', fontWeight:700, color: activeMap===i ? 'var(--text)' : 'var(--subtext)', textTransform:'uppercase', letterSpacing:'-0.2px', lineHeight:1.3 }}>{loc.title}</div>
            </button>
          ))}
        </div>

        {/* MAP EMBED */}
        <div className="cm-fade" data-delay="0.2" style={{ borderRadius:'14px', overflow:'hidden', border:'1px solid ' + active.color + '30', marginBottom:'20px', opacity:0, transform:'translateY(20px)' }}>
          <iframe
            key={activeMap}
            src={active.mapUrl}
            width="100%"
            height={isMobile ? '300' : '420'}
            style={{ border:0, display:'block' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={active.title + ' Map'}
          />
        </div>

        {/* ACTIVE LOCATION INFO */}
        <div className="cm-fade" data-delay="0.3" style={{ padding:'20px 22px', background: active.color + '08', border:'1px solid ' + active.color + '25', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'14px', marginBottom:'36px', opacity:0, transform:'translateY(20px)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
            <div style={{ width:'48px', height:'48px', borderRadius:'12px', background: active.color + '15', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize:'14px', fontWeight:800, textTransform:'uppercase', letterSpacing:'-0.3px', marginBottom:'4px' }}>{active.title}</div>
              <div style={{ fontSize:'12px', color:'var(--subtext)' }}>{active.address}</div>
            </div>
          </div>
          <a href={'https://maps.google.com/?q=' + encodeURIComponent(active.address)} target="_blank" rel="noopener noreferrer"
            style={{ background:'var(--accent)', color:'#fff', padding:'10px 20px', borderRadius:'7px', fontSize:'10px', letterSpacing:'1.5px', textTransform:'uppercase', fontWeight:700, textDecoration:'none', display:'flex', alignItems:'center', gap:'6px' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Open in Google Maps
          </a>
        </div>

        {/* ALL PINS */}
        {secLabel('All Locations')}
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:'10px' }}>
          {locations.map((loc, i) => (
            <div key={i} onClick={() => setActiveMap(i)}
              style={{ display:'flex', gap:'12px', padding:'14px 16px', background:'var(--glass)', border:'1px solid ' + (activeMap===i ? loc.color + '40' : 'var(--glass-border)'), borderRadius:'10px', cursor:'pointer', transition:'all 0.2s', alignItems:'flex-start' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=loc.color + '40'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor= activeMap===i ? loc.color + '40' : 'var(--glass-border)'; }}>
              <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:loc.color, flexShrink:0, marginTop:'3px' }}/>
              <div>
                <div style={{ fontSize:'12px', fontWeight:700, textTransform:'uppercase', letterSpacing:'-0.2px', marginBottom:'3px' }}>{loc.title}</div>
                <div style={{ fontSize:'11px', color:'var(--subtext)', opacity:0.6 }}>{loc.address}</div>
              </div>
              {activeMap === i && <div style={{ marginLeft:'auto', fontSize:'10px', color:loc.color, fontWeight:700, flexShrink:0 }}>Active ✓</div>}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ContactMapPage;
