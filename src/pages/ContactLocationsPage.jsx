import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const locations = [
  { color:'#E3182D', bg:'rgba(227,24,45,0.1)', badge:'HQ', title:'Head Office', address:'Anwar Ispat Complex, Chawk Bazar, Dhaka-1211, Bangladesh', phone:'+880 2-XXXX-XXXX', hours:'Sun–Thu: 9:00 AM – 6:00 PM', email:'info@anwarispat.com' },
  { color:'#3b82f6', bg:'rgba(59,130,246,0.1)', badge:'FACTORY', title:'Narayanganj Factory', address:'Anwar Ispat Rolling Mill, Narayanganj Industrial Zone, Bangladesh', phone:'+880 1XXX-XXXXXX', hours:'24/7 Operations', email:'factory@anwarispat.com' },
  { color:'#22c55e', bg:'rgba(34,197,94,0.1)', badge:'SALES', title:'Chittagong Sales Office', address:'Agrabad Commercial Area, Chittagong-4100, Bangladesh', phone:'+880 31-XXX-XXXX', hours:'Sun–Thu: 9:00 AM – 5:00 PM', email:'ctg@anwarispat.com' },
  { color:'#eab308', bg:'rgba(234,179,8,0.1)', badge:'BRANCH', title:'Sylhet Branch Office', address:'Zindabazar Commercial Area, Sylhet-3100, Bangladesh', phone:'+880 821-XXX-XXX', hours:'Sun–Thu: 9:00 AM – 5:00 PM', email:'sylhet@anwarispat.com' },
];

const ContactLocationsPage = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useGSAP(() => {
    gsap.fromTo('.cl-hero-tag', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.4, delay:0, ease:'power3.out' });
    gsap.fromTo('.cl-hero-title', { opacity:0, y:40 }, { opacity:1, y:0, duration:0.5, delay:0.05, ease:'power3.out' });
    gsap.fromTo('.cl-hero-sub', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.4, delay:0.1, ease:'power3.out' });
    gsap.utils.toArray('.cl-fade').forEach(el => {
      ScrollTrigger.create({ trigger:el, start:'top 88%', onEnter:() => gsap.to(el, { opacity:1, y:0, duration:0.7, delay:parseFloat(el.dataset.delay||0), ease:'power3.out' }) });
    });
    gsap.utils.toArray('.cl-card').forEach((el, i) => {
      ScrollTrigger.create({ trigger:el, start:'top 90%', onEnter:() => gsap.to(el, { opacity:1, y:0, duration:0.6, delay:i*0.1, ease:'power3.out' }) });
    });
  }, { scope:containerRef });

  const secLabel = (text) => (
    <div className="cl-fade" data-delay="0" style={{ fontSize:'10px', letterSpacing:'3px', color:'var(--accent)', textTransform:'uppercase', marginBottom:'18px', display:'flex', alignItems:'center', gap:'12px', opacity:0, transform:'translateY(20px)' }}>
      {text}<div style={{ flex:1, height:'1px', background:'var(--glass-border)' }}/>
    </div>
  );

  return (
    <div ref={containerRef} style={{ background:'var(--primary)', color:'var(--text)', minHeight:'100vh', paddingTop:'80px', overflowX:'hidden' }}>

      <section style={{ padding:isMobile?'16px 24px 16px':'20px 40px 16px', borderBottom:'1px solid var(--glass-border)', position:'relative', overflow:'hidden', textAlign:'center' }}>
        <div style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', width:'600px', height:'220px', background:'radial-gradient(ellipse, rgba(227,24,45,0.12) 0%, transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ maxWidth:'860px', margin:'0 auto' }}>
          <div className="cl-hero-tag" style={{ fontSize:'10px', letterSpacing:'4px', color:'var(--accent)', textTransform:'uppercase', marginBottom:'14px' }}>// Find Us</div>
          <h1 className="cl-hero-title" style={{ fontSize:'clamp(30px,5vw,52px)', fontWeight:900, lineHeight:1.05, textTransform:'uppercase', letterSpacing:'-1px', marginBottom:'16px', opacity:0, fontFamily:'var(--font-heading)' }}>
            Office <span style={{ color:'var(--accent)' }}>Locations</span>
          </h1>
          <p className="cl-hero-sub" style={{ fontSize:isMobile?'13px':'15px', color:'var(--subtext)', maxWidth:'480px', margin:'0 auto 24px', lineHeight:1.8 }}>
            Visit us at our offices and facilities across Bangladesh.
          </p>
          <div style={{ display:'flex', justifyContent:'center', gap:isMobile?'24px':'44px', flexWrap:'wrap' }}>
            {[{n:'4',l:'Locations'},{n:'48+',l:'Years'},{n:'2000+',l:'Team Members'}].map((s,i) => (
              <div key={i} style={{ textAlign:'center' }}>
                <div style={{ fontSize:'30px', fontWeight:900, color:'var(--accent)' }}>{s.n}</div>
                <div style={{ fontSize:'9px', color:'var(--subtext)', letterSpacing:'2px', textTransform:'uppercase', marginTop:'4px' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ maxWidth:'960px', margin:'0 auto', padding:isMobile?'36px 24px 60px':'44px 40px 64px' }}>
        {secLabel('Our Offices')}
        <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
          {locations.map((loc, i) => (
            <div key={i} className="cl-card"
              onClick={() => setActive(i)}
              style={{ borderRadius:'14px', overflow:'hidden', border:'1px solid ' + (active===i ? loc.color + '50' : 'var(--glass-border)'), background: active===i ? loc.color + '06' : 'var(--glass)', cursor:'pointer', transition:'all 0.25s', opacity:0, transform:'translateY(30px)' }}>
              <div style={{ padding:'20px 24px', display:'flex', alignItems:'flex-start', gap:'18px' }}>
                <div style={{ width:'52px', height:'52px', borderRadius:'14px', background:loc.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={loc.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'8px', flexWrap:'wrap' }}>
                    <div style={{ fontSize:'15px', fontWeight:800, textTransform:'uppercase', letterSpacing:'-0.3px', fontFamily:'var(--font-heading)' }}>{loc.title}</div>
                    <span style={{ background:loc.bg, color:loc.color, border:'1px solid ' + loc.color + '40', fontSize:'8px', letterSpacing:'2px', textTransform:'uppercase', padding:'3px 8px', borderRadius:'3px', fontWeight:700 }}>{loc.badge}</span>
                  </div>
                  <p style={{ fontSize:'12px', color:'var(--subtext)', lineHeight:1.7, marginBottom:'12px' }}>{loc.address}</p>
                  <div style={{ display:'flex', gap:'18px', flexWrap:'wrap' }}>
                    <a href={'tel:' + loc.phone} style={{ fontSize:'12px', color:loc.color, fontWeight:600, textDecoration:'none', display:'flex', alignItems:'center', gap:'5px' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72c.127.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.86a16 16 0 0 0 6 6l1.27-.97a2 2 0 0 1 2.11-.45c.91.34 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      {loc.phone}
                    </a>
                    <span style={{ fontSize:'12px', color:'var(--subtext)', opacity:0.6, display:'flex', alignItems:'center', gap:'5px' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {loc.hours}
                    </span>
                  </div>
                </div>
                <div style={{ fontSize:'18px', color: active===i ? loc.color : 'var(--subtext)', opacity: active===i ? 1 : 0.3, transition:'all 0.2s', flexShrink:0 }}>{active===i ? '▼' : '▶'}</div>
              </div>
              {active === i && (
                <div style={{ padding:'16px 24px 20px', borderTop:'1px solid var(--glass-border)', display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr 1fr', gap:'14px' }}>
                  <div>
                    <div style={{ fontSize:'9px', letterSpacing:'2px', color:'var(--subtext)', textTransform:'uppercase', marginBottom:'5px' }}>Email</div>
                    <a href={'mailto:' + loc.email} style={{ fontSize:'12px', color:loc.color, textDecoration:'none', fontWeight:600 }}>{loc.email}</a>
                  </div>
                  <div>
                    <div style={{ fontSize:'9px', letterSpacing:'2px', color:'var(--subtext)', textTransform:'uppercase', marginBottom:'5px' }}>Hours</div>
                    <div style={{ fontSize:'12px', fontWeight:600 }}>{loc.hours}</div>
                  </div>
                  <a href={'https://maps.google.com/?q=' + encodeURIComponent(loc.address)} target="_blank" rel="noopener noreferrer"
                    style={{ display:'inline-flex', alignItems:'center', gap:'6px', background:'var(--accent)', color:'#fff', padding:'8px 14px', borderRadius:'6px', fontSize:'10px', letterSpacing:'1px', textTransform:'uppercase', fontWeight:700, textDecoration:'none', alignSelf:'center' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    View on Map
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactLocationsPage;
