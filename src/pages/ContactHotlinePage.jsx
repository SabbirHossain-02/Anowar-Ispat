import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const phones = [
  { color:'#E3182D', bg:'rgba(227,24,45,0.1)', label:'Sales Hotline', number:'+880 2-XXXX-XXXX', hours:'Sun–Thu · 9:00 AM – 6:00 PM', desc:'For product inquiries, quotes, and sales support.' },
  { color:'#22c55e', bg:'rgba(34,197,94,0.1)', label:'Factory / Technical', number:'+880 1XXX-XXXXXX', hours:'24/7 Emergency Line', desc:'For technical support, factory operations and urgent matters.' },
  { color:'#3b82f6', bg:'rgba(59,130,246,0.1)', label:'Corporate Office', number:'+880 2-XXXX-XXXX', hours:'Sun–Thu · 9:00 AM – 5:00 PM', desc:'For corporate affairs, partnerships and general inquiries.' },
];

const emails = [
  { color:'#3b82f6', bg:'rgba(59,130,246,0.1)', label:'General Enquiry', email:'info@anwarispat.com', desc:'For all general inquiries and information requests.' },
  { color:'#a855f7', bg:'rgba(168,85,247,0.1)', label:'Media / PR', email:'media@anwarispat.com', desc:'For press, media coverage and public relations.' },
  { color:'#22c55e', bg:'rgba(34,197,94,0.1)', label:'Sales & Orders', email:'sales@anwarispat.com', desc:'For product orders, pricing and sales inquiries.' },
  { color:'#eab308', bg:'rgba(234,179,8,0.1)', label:'Careers', email:'careers@anwarispat.com', desc:'For job applications and recruitment inquiries.' },
];

const socials = [
  { name:'Facebook', color:'#1877f2', bg:'rgba(24,119,242,0.1)', handle:'@AnwarIspat', href:'https://facebook.com' },
  { name:'LinkedIn', color:'#0077b5', bg:'rgba(0,119,181,0.1)', handle:'Anwar Ispat Ltd.', href:'https://linkedin.com' },
  { name:'YouTube', color:'#ff0000', bg:'rgba(255,0,0,0.1)', handle:'@AnwarIspatOfficial', href:'https://youtube.com' },
];

const ContactHotlinePage = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useGSAP(() => {
    gsap.fromTo('.ch-hero-tag', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.4, delay:0, ease:'power3.out' });
    gsap.fromTo('.ch-hero-title', { opacity:0, y:40 }, { opacity:1, y:0, duration:0.5, delay:0.05, ease:'power3.out' });
    gsap.fromTo('.ch-hero-sub', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.4, delay:0.1, ease:'power3.out' });
    gsap.utils.toArray('.ch-fade').forEach(el => {
      ScrollTrigger.create({ trigger:el, start:'top 88%', onEnter:() => gsap.to(el, { opacity:1, y:0, duration:0.7, delay:parseFloat(el.dataset.delay||0), ease:'power3.out' }) });
    });
    gsap.utils.toArray('.ch-card').forEach((el, i) => {
      ScrollTrigger.create({ trigger:el, start:'top 90%', onEnter:() => gsap.to(el, { opacity:1, y:0, duration:0.6, delay:i*0.08, ease:'power3.out' }) });
    });
  }, { scope:containerRef });

  const secLabel = (text) => (
    <div className="ch-fade" data-delay="0" style={{ fontSize:'10px', letterSpacing:'3px', color:'var(--accent)', textTransform:'uppercase', marginBottom:'18px', display:'flex', alignItems:'center', gap:'12px', opacity:0, transform:'translateY(20px)' }}>
      {text}<div style={{ flex:1, height:'1px', background:'var(--glass-border)' }}/>
    </div>
  );

  return (
    <div ref={containerRef} style={{ background:'var(--primary)', color:'var(--text)', minHeight:'100vh', paddingTop:'80px', overflowX:'hidden' }}>

      <section style={{ padding:isMobile?'16px 24px 16px':'20px 40px 16px', borderBottom:'1px solid var(--glass-border)', position:'relative', overflow:'hidden', textAlign:'center' }}>
        <div style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', width:'600px', height:'220px', background:'radial-gradient(ellipse, rgba(227,24,45,0.12) 0%, transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ maxWidth:'860px', margin:'0 auto' }}>
          <div className="ch-hero-tag" style={{ fontSize:'10px', letterSpacing:'4px', color:'var(--accent)', textTransform:'uppercase', marginBottom:'14px' }}>// Reach Out</div>
          <h1 className="ch-hero-title" style={{ fontSize:'clamp(30px,5vw,52px)', fontWeight:900, lineHeight:1.05, textTransform:'uppercase', letterSpacing:'-1px', marginBottom:'16px', opacity:0, fontFamily:'var(--font-heading)' }}>
            Hotline / <span style={{ color:'var(--accent)' }}>Email</span>
          </h1>
          <p className="ch-hero-sub" style={{ fontSize:isMobile?'13px':'15px', color:'var(--subtext)', maxWidth:'480px', margin:'0 auto', lineHeight:1.8 }}>
            Get in touch with our team directly via phone, email, or social media channels.
          </p>
        </div>
      </section>

      <div style={{ maxWidth:'920px', margin:'0 auto', padding:isMobile?'36px 24px 60px':'44px 40px 64px' }}>

        {secLabel('Phone Lines')}
        <div style={{ display:'flex', flexDirection:'column', gap:'10px', marginBottom:'40px' }}>
          {phones.map((p, i) => (
            <a key={i} href={'tel:' + p.number} className="ch-card"
              style={{ display:'flex', alignItems:'center', gap:'18px', padding:'20px 22px', background:'var(--glass)', border:'1px solid var(--glass-border)', borderRadius:'12px', cursor:'pointer', transition:'all 0.2s', opacity:0, transform:'translateY(20px)', textDecoration:'none', color:'inherit' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=p.color + '50'; e.currentTarget.style.background=p.color + '06'; e.currentTarget.style.transform='translateX(4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--glass-border)'; e.currentTarget.style.background='var(--glass)'; e.currentTarget.style.transform='translateX(0)'; }}>
              <div style={{ width:'52px', height:'52px', borderRadius:'14px', background:p.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72c.127.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.86a16 16 0 0 0 6 6l1.27-.97a2 2 0 0 1 2.11-.45c.91.34 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:'10px', letterSpacing:'2px', color:p.color, textTransform:'uppercase', marginBottom:'5px', fontWeight:700 }}>{p.label}</div>
                <div style={{ fontSize:isMobile?'18px':'22px', fontWeight:900, letterSpacing:'-0.5px', marginBottom:'4px' }}>{p.number}</div>
                <div style={{ fontSize:'11px', color:'var(--subtext)', opacity:0.6 }}>{p.hours}</div>
              </div>
              <div style={{ fontSize:'10px', color:'var(--accent)', fontWeight:700, flexShrink:0 }}>Call →</div>
            </a>
          ))}
        </div>

        {secLabel('Email')}
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:'10px', marginBottom:'40px' }}>
          {emails.map((em, i) => (
            <a key={i} href={'mailto:' + em.email} className="ch-card"
              style={{ display:'flex', alignItems:'flex-start', gap:'14px', padding:'18px 20px', background:'var(--glass)', border:'1px solid var(--glass-border)', borderRadius:'12px', cursor:'pointer', transition:'all 0.2s', opacity:0, transform:'translateY(20px)', textDecoration:'none', color:'inherit' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=em.color + '50'; e.currentTarget.style.background=em.color + '06'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--glass-border)'; e.currentTarget.style.background='var(--glass)'; }}>
              <div style={{ width:'44px', height:'44px', borderRadius:'12px', background:em.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={em.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:'9px', letterSpacing:'2px', color:em.color, textTransform:'uppercase', marginBottom:'5px', fontWeight:700 }}>{em.label}</div>
                <div style={{ fontSize:'13px', fontWeight:700, marginBottom:'4px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{em.email}</div>
                <div style={{ fontSize:'11px', color:'var(--subtext)', opacity:0.6, lineHeight:1.5 }}>{em.desc}</div>
              </div>
            </a>
          ))}
        </div>

        {secLabel('Social Media')}
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)', gap:'10px' }}>
          {socials.map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="ch-card"
              style={{ display:'flex', alignItems:'center', gap:'14px', padding:'18px 20px', background:'var(--glass)', border:'1px solid var(--glass-border)', borderRadius:'12px', cursor:'pointer', transition:'all 0.2s', opacity:0, transform:'translateY(20px)', textDecoration:'none', color:'inherit' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=s.color + '50'; e.currentTarget.style.background=s.color + '08'; e.currentTarget.style.transform='translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--glass-border)'; e.currentTarget.style.background='var(--glass)'; e.currentTarget.style.transform='translateY(0)'; }}>
              <div style={{ width:'44px', height:'44px', borderRadius:'12px', background:s.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <div style={{ width:'12px', height:'12px', borderRadius:'50%', background:s.color }}/>
              </div>
              <div>
                <div style={{ fontSize:'13px', fontWeight:700, marginBottom:'3px' }}>{s.name}</div>
                <div style={{ fontSize:'11px', color:'var(--subtext)', opacity:0.6 }}>{s.handle}</div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ContactHotlinePage;
