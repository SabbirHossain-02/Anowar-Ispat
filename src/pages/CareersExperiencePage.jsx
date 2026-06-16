import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const values = [
  { color:'#E3182D', bg:'rgba(227,24,45,0.08)', border:'rgba(227,24,45,0.2)', title:'Integrity', text:'Highest ethical standards in every interaction and decision we make.' },
  { color:'#3b82f6', bg:'rgba(59,130,246,0.08)', border:'rgba(59,130,246,0.2)', title:'Teamwork', text:'Collaboration and mutual respect drive our collective success every day.' },
  { color:'#22c55e', bg:'rgba(34,197,94,0.08)', border:'rgba(34,197,94,0.2)', title:'Excellence', text:'The highest quality in every product, process, and service we deliver.' },
];

const perks = [
  { color:'#E3182D', title:'Competitive Salary', text:'Market-leading pay with annual performance bonuses.' },
  { color:'#3b82f6', title:'Healthcare Coverage', text:'Medical insurance for employees and their families.' },
  { color:'#22c55e', title:'Career Growth', text:'Structured training and clear promotion pathways.' },
  { color:'#eab308', title:'Transport Facility', text:'Company-provided transport for all staff.' },
  { color:'#a855f7', title:'Provident Fund', text:'Employer-matched fund and gratuity benefits.' },
  { color:'#ec4899', title:'Generous Leave', text:'Annual, medical, and festival leave entitlements.' },
];

const stories = [
  { name:'Md. Rafiqul Islam', role:'Senior Engineer', years:'8 Years', color:'#3b82f6', avatarBg:'rgba(59,130,246,0.12)', img:'/images/employee-rafiqul.jpg', quote:'Anwar Ispat gave me the platform to grow from a junior engineer to leading a team of 20. The mentorship and culture here is truly unmatched.' },
  { name:'Nusrat Jahan', role:'HR Manager', years:'5 Years', color:'#ec4899', avatarBg:'rgba(236,72,153,0.12)', img:'/images/employee-nusrat.jpg', quote:'The culture here genuinely values people. I have grown both professionally and personally since joining Anwar Ispat five years ago.' },
  { name:'Karim Ahmed', role:'Production Supervisor', years:'12 Years', color:'#22c55e', avatarBg:'rgba(34,197,94,0.12)', img:'/images/employee-karim.jpg', quote:'12 years at Anwar Ispat and I still look forward to every day at work. This company truly invests in its people and their futures.' },
  { name:'Fatema Begum', role:'Finance Manager', years:'6 Years', color:'#eab308', avatarBg:'rgba(234,179,8,0.12)', img:'/images/employee-fatema.jpg', quote:'The opportunities for growth here are exceptional. I started as a junior analyst and now lead the entire finance team for the group.' },
];

const CareersExperiencePage = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useGSAP(() => {
    gsap.fromTo('.ce-hero-tag', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.8, delay:0.2, ease:'power3.out' });
    gsap.fromTo('.ce-hero-title', { opacity:0, y:40 }, { opacity:1, y:0, duration:1, delay:0.3, ease:'power3.out' });
    gsap.fromTo('.ce-hero-sub', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.8, delay:0.5, ease:'power3.out' });
    gsap.fromTo('.ce-stats', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.8, delay:0.7, ease:'power3.out' });
    gsap.utils.toArray('.ce-fade').forEach(el => {
      ScrollTrigger.create({ trigger:el, start:'top 88%', onEnter:() => gsap.to(el, { opacity:1, y:0, duration:0.7, delay:parseFloat(el.dataset.delay||0), ease:'power3.out' }) });
    });
    gsap.utils.toArray('.ce-val').forEach((el, i) => {
      ScrollTrigger.create({ trigger:el, start:'top 90%', onEnter:() => gsap.to(el, { opacity:1, y:0, duration:0.6, delay:i*0.1, ease:'power3.out' }) });
    });
    gsap.utils.toArray('.ce-perk').forEach((el, i) => {
      ScrollTrigger.create({ trigger:el, start:'top 92%', onEnter:() => gsap.to(el, { opacity:1, x:0, duration:0.5, delay:(i%2)*0.08, ease:'power3.out' }) });
    });
    gsap.utils.toArray('.ce-story').forEach((el, i) => {
      ScrollTrigger.create({ trigger:el, start:'top 88%', onEnter:() => gsap.to(el, { opacity:1, y:0, duration:0.7, delay:(i%2)*0.12, ease:'power3.out' }) });
    });
  }, { scope:containerRef });

  const secLabel = (text) => (
    <div className="ce-fade" data-delay="0" style={{ fontSize:'10px', letterSpacing:'3px', color:'var(--accent)', textTransform:'uppercase', marginBottom:'20px', display:'flex', alignItems:'center', gap:'12px', opacity:0, transform:'translateY(20px)' }}>
      {text}<div style={{ flex:1, height:'1px', background:'var(--glass-border)' }}/>
    </div>
  );

  return (
    <div ref={containerRef} style={{ background:'var(--primary)', color:'var(--text)', minHeight:'100vh', paddingTop:'80px', overflowX:'hidden' }}>

      {/* HERO */}
      <section style={{ padding:isMobile?'32px 24px 32px':'40px 40px 36px', borderBottom:'1px solid var(--glass-border)', position:'relative', overflow:'hidden', textAlign:'center' }}>
        <div style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', width:'600px', height:'220px', background:'radial-gradient(ellipse, rgba(227,24,45,0.12) 0%, transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ maxWidth:'860px', margin:'0 auto' }}>
          <div className="ce-hero-tag" style={{ fontSize:'10px', letterSpacing:'4px', color:'var(--accent)', textTransform:'uppercase', marginBottom:'14px', opacity:0 }}>// Life at Anwar Ispat</div>
          <h1 className="ce-hero-title" style={{ fontSize:'clamp(30px,5vw,52px)', fontWeight:900, lineHeight:1.05, textTransform:'uppercase', letterSpacing:'-1px', marginBottom:'16px', opacity:0, fontFamily:'var(--font-heading)' }}>
            Employee <span style={{ color:'var(--accent)' }}>Experience</span>
          </h1>
          <p className="ce-hero-sub" style={{ fontSize:isMobile?'13px':'15px', color:'var(--subtext)', maxWidth:'500px', margin:'0 auto 24px', lineHeight:1.8, opacity:0 }}>
            A workplace built on trust, growth, and purpose. Discover what makes Anwar Ispat a great place to build your career.
          </p>
          <div className="ce-stats" style={{ display:'flex', justifyContent:'center', gap:isMobile?'24px':'44px', flexWrap:'wrap', opacity:0 }}>
            {[{n:'2000+',l:'Employees'},{n:'48+',l:'Years Legacy'},{n:'95%',l:'Retention Rate'},{n:'5',l:'Locations'}].map((s,i) => (
              <div key={i} style={{ textAlign:'center' }}>
                <div style={{ fontSize:'30px', fontWeight:900, color:'var(--accent)' }}>{s.n}</div>
                <div style={{ fontSize:'9px', color:'var(--subtext)', letterSpacing:'2px', textTransform:'uppercase', marginTop:'4px' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ maxWidth:'960px', margin:'0 auto', padding:isMobile?'36px 24px 60px':'44px 40px 64px' }}>

        {/* VALUES */}
        {secLabel('Our Values')}
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)', gap:'14px', marginBottom:'44px' }}>
          {values.map((v, i) => (
            <div key={i} className="ce-val"
              style={{ borderRadius:'12px', padding:'22px', border:'1px solid ' + v.border, background:v.bg, position:'relative', overflow:'hidden', opacity:0, transform:'translateY(30px)' }}>
              <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'2px', background:v.color }}/>
              <div style={{ width:'44px', height:'44px', borderRadius:'12px', background:v.color + '20', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'14px' }}>
                <div style={{ width:'12px', height:'12px', borderRadius:'50%', background:v.color }}/>
              </div>
              <div style={{ fontSize:'14px', fontWeight:800, textTransform:'uppercase', color:v.color, marginBottom:'8px', letterSpacing:'0.5px' }}>{v.title}</div>
              <p style={{ fontSize:'12px', color:'var(--subtext)', lineHeight:1.7 }}>{v.text}</p>
            </div>
          ))}
        </div>

        {/* PERKS */}
        {secLabel('Benefits & Perks')}
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:'10px', marginBottom:'44px' }}>
          {perks.map((p, i) => (
            <div key={i} className="ce-perk"
              style={{ display:'flex', alignItems:'flex-start', gap:'14px', padding:'16px 18px', background:'var(--glass)', border:'1px solid var(--glass-border)', borderLeft:'3px solid ' + p.color, borderRadius:'0 10px 10px 0', opacity:0, transform:'translateX(-20px)' }}>
              <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:p.color, flexShrink:0, marginTop:'4px' }}/>
              <div>
                <div style={{ fontSize:'12px', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.5px', color:p.color, marginBottom:'5px' }}>{p.title}</div>
                <p style={{ fontSize:'12px', color:'var(--subtext)', lineHeight:1.6 }}>{p.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* EMPLOYEE STORIES */}
        {secLabel('Employee Stories')}
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:'16px' }}>
          {stories.map((s, i) => (
            <div key={i} className="ce-story"
              style={{ borderRadius:'14px', overflow:'hidden', border:'1px solid var(--glass-border)', background:'var(--glass)', opacity:0, transform:'translateY(30px)' }}>
              {/* IMAGE SLOT */}
              <div style={{ position:'relative', width:'100%', height:'200px', background:s.avatarBg, overflow:'hidden' }}>
                <img src={s.img} alt={s.name}
                  style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center', display:'block' }}
                  onError={e => { e.target.style.display='none'; }} />
                <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'10px' }}>
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke={s.color + '40'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span style={{ fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase', color:s.color + '60' }}>Employee Photo</span>
                </div>
              </div>
              {/* CONTENT */}
              <div style={{ padding:'20px 22px 24px' }}>
                <div style={{ fontSize:'32px', color:'var(--accent)', lineHeight:0.7, marginBottom:'14px', fontWeight:900 }}>"</div>
                <p style={{ fontSize:'13px', color:'var(--subtext)', lineHeight:1.85, fontStyle:'italic', marginBottom:'18px' }}>{s.quote}</p>
                <div style={{ display:'flex', alignItems:'center', gap:'12px', paddingTop:'14px', borderTop:'1px solid var(--glass-border)' }}>
                  <div style={{ width:'38px', height:'38px', borderRadius:'50%', background:s.avatarBg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'13px', fontWeight:700, color:s.color, flexShrink:0 }}>
                    {s.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                  </div>
                  <div>
                    <div style={{ fontSize:'13px', fontWeight:700 }}>{s.name}</div>
                    <div style={{ fontSize:'10px', color:'var(--subtext)', marginTop:'2px' }}>{s.role} · {s.years}</div>
                  </div>
                  <div style={{ marginLeft:'auto', fontSize:'10px', color:s.color, fontWeight:700 }}>{s.years}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CareersExperiencePage;
