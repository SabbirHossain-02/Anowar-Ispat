import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const jobs = [
  { id:0, dept:'Engineering', color:'#3b82f6', catBg:'rgba(59,130,246,0.1)', title:'Senior Production Engineer', loc:'Narayanganj', type:'Full-time', exp:'5+ years', edu:'B.Sc. Engineering', posted:'June 10, 2026', featured:true },
  { id:1, dept:'Operations', color:'#eab308', catBg:'rgba(234,179,8,0.1)', title:'Quality Control Inspector', loc:'Narayanganj', type:'Full-time', exp:'3+ years', edu:'B.Sc. Metallurgy', posted:'June 12, 2026', featured:false },
  { id:2, dept:'Sales', color:'#22c55e', catBg:'rgba(34,197,94,0.1)', title:'Regional Sales Manager — Dhaka', loc:'Dhaka', type:'Full-time', exp:'5+ years', edu:'BBA/MBA', posted:'June 8, 2026', featured:false },
  { id:3, dept:'Finance', color:'#3b82f6', catBg:'rgba(59,130,246,0.1)', title:'Financial Analyst', loc:'Head Office', type:'Full-time', exp:'2+ years', edu:'B.Com/MBA', posted:'June 5, 2026', featured:false },
  { id:4, dept:'Engineering', color:'#a855f7', catBg:'rgba(168,85,247,0.1)', title:'Maintenance Engineer', loc:'Narayanganj', type:'Full-time', exp:'3+ years', edu:'B.Sc. Mechanical', posted:'May 30, 2026', featured:false },
  { id:5, dept:'HR', color:'#ec4899', catBg:'rgba(236,72,153,0.1)', title:'HR Business Partner', loc:'Head Office', type:'Full-time', exp:'4+ years', edu:'BBA/MBA HRM', posted:'May 25, 2026', featured:false },
];

const CareersPositionsPage = () => {
  const containerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useGSAP(() => {
    gsap.fromTo('.cp-hero-tag', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.8, delay:0.2, ease:'power3.out' });
    gsap.fromTo('.cp-hero-title', { opacity:0, y:40 }, { opacity:1, y:0, duration:1, delay:0.3, ease:'power3.out' });
    gsap.fromTo('.cp-hero-sub', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.8, delay:0.5, ease:'power3.out' });
    gsap.fromTo('.cp-stats', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.8, delay:0.7, ease:'power3.out' });
    gsap.fromTo('.cp-cats', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.8, delay:0.8, ease:'power3.out' });
    gsap.utils.toArray('.cp-fade').forEach(el => {
      ScrollTrigger.create({ trigger:el, start:'top 88%', onEnter:() => gsap.to(el, { opacity:1, y:0, duration:0.7, delay:parseFloat(el.dataset.delay||0), ease:'power3.out' }) });
    });
    gsap.utils.toArray('.cp-job').forEach((el, i) => {
      ScrollTrigger.create({ trigger:el, start:'top 90%', onEnter:() => gsap.to(el, { opacity:1, x:0, duration:0.6, delay:i*0.07, ease:'power3.out' }) });
    });
  }, { scope:containerRef });

  const categories = ['All','Engineering','Operations','Sales','Finance','HR'];
  const featured = jobs[0];
  const filtered = jobs.slice(1).filter(j => activeCategory === 'All' || j.dept === activeCategory);

  const secLabel = (text) => (
    <div className="cp-fade" data-delay="0" style={{ fontSize:'10px', letterSpacing:'3px', color:'var(--accent)', textTransform:'uppercase', marginBottom:'20px', display:'flex', alignItems:'center', gap:'12px', opacity:0, transform:'translateY(20px)' }}>
      {text}<div style={{ flex:1, height:'1px', background:'var(--glass-border)' }}/>
    </div>
  );

  return (
    <div ref={containerRef} style={{ background:'var(--primary)', color:'var(--text)', minHeight:'100vh', paddingTop:'80px', overflowX:'hidden' }}>

      <section style={{ padding:isMobile?'32px 24px 32px':'40px 40px 36px', borderBottom:'1px solid var(--glass-border)', position:'relative', overflow:'hidden', textAlign:'center' }}>
        <div style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', width:'600px', height:'220px', background:'radial-gradient(ellipse, rgba(227,24,45,0.12) 0%, transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ maxWidth:'860px', margin:'0 auto' }}>
          <div className="cp-hero-tag" style={{ fontSize:'10px', letterSpacing:'4px', color:'var(--accent)', textTransform:'uppercase', marginBottom:'14px', opacity:0 }}>// Join Our Team</div>
          <h1 className="cp-hero-title" style={{ fontSize:'clamp(30px,5vw,52px)', fontWeight:900, lineHeight:1.05, textTransform:'uppercase', letterSpacing:'-1px', marginBottom:'16px', opacity:0, fontFamily:'var(--font-heading)' }}>
            Open <span style={{ color:'var(--accent)' }}>Positions</span>
          </h1>
          <p className="cp-hero-sub" style={{ fontSize:isMobile?'13px':'15px', color:'var(--subtext)', maxWidth:'480px', margin:'0 auto 24px', lineHeight:1.8, opacity:0 }}>
            Build your career at Bangladesh's most trusted steel manufacturer. We're hiring across engineering, sales, and operations.
          </p>
          <div className="cp-stats" style={{ display:'flex', justifyContent:'center', gap:isMobile?'28px':'48px', marginBottom:'24px', flexWrap:'wrap', opacity:0 }}>
            {[{n:'12+',l:'Open Roles'},{n:'5',l:'Departments'},{n:'2000+',l:'Employees'}].map((s,i) => (
              <div key={i} style={{ textAlign:'center' }}>
                <div style={{ fontSize:'34px', fontWeight:900, color:'var(--accent)' }}>{s.n}</div>
                <div style={{ fontSize:'9px', color:'var(--subtext)', letterSpacing:'2.5px', textTransform:'uppercase', marginTop:'4px' }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div className="cp-cats" style={{ display:'flex', gap:'8px', flexWrap:'wrap', justifyContent:'center', opacity:0 }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                style={{ padding:'6px 16px', border:activeCategory===cat?'1px solid var(--accent)':'1px solid var(--glass-border)', borderRadius:'20px', fontSize:'10px', letterSpacing:'1.5px', textTransform:'uppercase', color:activeCategory===cat?'#fff':'var(--subtext)', background:activeCategory===cat?'var(--accent)':'transparent', cursor:'pointer', transition:'all 0.2s' }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div style={{ maxWidth:'940px', margin:'0 auto', padding:isMobile?'36px 24px 60px':'44px 40px 64px' }}>

        {secLabel('Featured Role')}
        <div className="cp-fade" data-delay="0.1"
          style={{ background:'linear-gradient(135deg, rgba(227,24,45,0.06) 0%, rgba(0,0,0,0) 60%)', border:'1px solid rgba(227,24,45,0.22)', borderRadius:'14px', padding:isMobile?'22px':'28px', marginBottom:'36px', position:'relative', overflow:'hidden', opacity:0, transform:'translateY(30px)' }}>
          <div style={{ position:'absolute', top:0, right:0, width:'200px', height:'200px', background:'radial-gradient(circle, rgba(227,24,45,0.07), transparent 70%)', pointerEvents:'none' }}/>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'16px', flexWrap:'wrap' }}>
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', gap:'8px', marginBottom:'14px', flexWrap:'wrap', alignItems:'center' }}>
                <span style={{ display:'inline-block', background:'var(--accent)', color:'#fff', fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', padding:'3px 9px', borderRadius:'3px', fontWeight:700 }}>Hot Role</span>
                <span style={{ display:'inline-block', background:'rgba(59,130,246,0.12)', color:'#3b82f6', border:'1px solid rgba(59,130,246,0.25)', fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', padding:'3px 9px', borderRadius:'3px', fontWeight:700 }}>Engineering</span>
                <span style={{ display:'inline-block', background:'var(--glass)', color:'var(--subtext)', border:'1px solid var(--glass-border)', fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', padding:'3px 9px', borderRadius:'3px', fontWeight:700 }}>Full-time</span>
              </div>
              <div style={{ fontSize:isMobile?'18px':'22px', fontWeight:900, textTransform:'uppercase', letterSpacing:'-0.5px', marginBottom:'10px', fontFamily:'var(--font-heading)' }}>{featured.title}</div>
              <p style={{ fontSize:'13px', color:'var(--subtext)', lineHeight:1.75, marginBottom:'16px' }}>Lead production processes at our Narayanganj facility. Oversee quality control, equipment maintenance, and team supervision for reinforcing bar manufacturing.</p>
              <div style={{ display:'flex', gap:'18px', flexWrap:'wrap' }}>
                {[{icon:'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 10m-3 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0', label:featured.loc},{icon:'M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c3 3 9 3 12 0v-5', label:featured.edu + ' · ' + featured.exp},{icon:'M3 4h18v2H3zM3 9h18v2H3zM3 14h10v2H3z', label:'Posted ' + featured.posted}].map((m,i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:'5px', fontSize:'11px', color:'var(--subtext)', opacity:0.7 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={m.icon}/></svg>
                    {m.label}
                  </div>
                ))}
              </div>
            </div>
            <button style={{ background:'var(--accent)', color:'#fff', border:'none', padding:'11px 22px', borderRadius:'7px', fontSize:'10px', letterSpacing:'1.5px', textTransform:'uppercase', fontWeight:700, cursor:'pointer', flexShrink:0 }}>Apply Now →</button>
          </div>
        </div>

        {secLabel('All Positions')}
        <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
          {filtered.map((job, i) => (
            <div key={job.id} className="cp-job"
              style={{ display:'flex', alignItems:'center', gap:'16px', padding:'16px 20px', background:'var(--glass)', border:'1px solid var(--glass-border)', borderRadius:'10px', cursor:'pointer', transition:'all 0.2s', opacity:0, transform:'translateX(-20px)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(227,24,45,0.3)'; e.currentTarget.style.background='rgba(227,24,45,0.03)'; e.currentTarget.style.transform='translateX(4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--glass-border)'; e.currentTarget.style.background='var(--glass)'; e.currentTarget.style.transform='translateX(0)'; }}>
              <div style={{ width:'42px', height:'42px', borderRadius:'10px', background:job.catBg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={job.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:'13px', fontWeight:700, textTransform:'uppercase', letterSpacing:'-0.2px', marginBottom:'6px' }}>{job.title}</div>
                <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' }}>
                  <span style={{ fontSize:'9px', letterSpacing:'1px', textTransform:'uppercase', color:job.color, fontWeight:700 }}>{job.dept}</span>
                  <span style={{ fontSize:'9px', color:'var(--subtext)', opacity:0.5 }}>·</span>
                  <span style={{ fontSize:'9px', color:'var(--subtext)', opacity:0.6 }}>{job.loc}</span>
                  <span style={{ fontSize:'9px', color:'var(--subtext)', opacity:0.5 }}>·</span>
                  <span style={{ fontSize:'9px', color:'var(--subtext)', opacity:0.6 }}>{job.type}</span>
                </div>
              </div>
              <div style={{ fontSize:'10px', color:'var(--subtext)', opacity:0.4, flexShrink:0, marginRight:'12px' }}>{job.posted.split(' ').slice(0,2).join(' ')}</div>
              <span style={{ fontSize:'10px', color:'var(--accent)', fontWeight:700, flexShrink:0 }}>Apply →</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CareersPositionsPage;
