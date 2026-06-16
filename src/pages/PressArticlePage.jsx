import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const releases = [
  { id:0, slug:'strategic-expansion-2026', pr:'PR-2026-001', cat:'Corporate', color:'#E3182D', catBg:'rgba(227,24,45,0.1)', title:'Anwar Ispat Announces Strategic Expansion and New Product Line Launch for 2026', date:'June 16, 2026', read:'3 min read', imgBg:'rgba(227,24,45,0.15)', tags:['Corporate','Expansion','2026','Strategy'], body:['The Board of Directors of Anwar Ispat Limited hereby announces a major strategic expansion initiative targeting a 40% increase in production capacity, alongside the official launch of the ANWARS 500W TMT Bar series for the fiscal year 2026.','This expansion initiative includes the commissioning of new rolling mill lines and upgraded induction furnace systems at the Narayanganj production facility. The capital investment is estimated at BDT 850 crore, to be funded through a combination of retained earnings and long-term debt financing.','The Board has further resolved to launch the ANWARS 500W TMT Bar — a thermo-mechanically treated reinforcing bar engineered for high-rise structures and critical infrastructure projects across Bangladesh.','Management projects that the expanded capacity will enable Anwar Ispat to fulfill contracts for multiple large-scale government and private sector infrastructure projects simultaneously, while maintaining its hallmark quality standards certified under ISO 9001:2015 and BDS specifications.','The Board expresses its confidence that these strategic investments will consolidate Anwar Ispat\'s position as Bangladesh\'s most trusted steel manufacturer and deliver long-term value to all stakeholders.'] },
  { id:1, slug:'q1-financial-results-2026', pr:'PR-2026-002', cat:'Financial', color:'#3b82f6', catBg:'rgba(59,130,246,0.1)', title:'Q1 2026 Financial Results — Record Revenue Growth of 28%', date:'May 30, 2026', read:'4 min read', imgBg:'rgba(59,130,246,0.12)', tags:['Financial','Q1 2026','Revenue','Growth'], body:['Anwar Ispat Limited is pleased to report its unaudited financial results for the first quarter ended March 31, 2026. The company recorded a revenue of BDT 2,340 crore, representing a 28% year-on-year growth compared to Q1 2025.','Gross profit margin improved to 18.4% from 16.2% in the corresponding period, driven by operational efficiencies and favorable raw material prices. EBITDA grew by 34% to BDT 312 crore.','The strong performance was underpinned by robust demand from the construction sector, particularly government-led infrastructure projects including highway expansion, bridge construction, and urban development initiatives under the Annual Development Programme.','The Board of Directors has declared an interim dividend of BDT 2.50 per share for Q1 2026, reflecting the company\'s continued commitment to delivering value to its shareholders.','Management remains optimistic about the outlook for the remainder of 2026, citing strong order backlog and continued investment in capacity expansion.'] },
  { id:2, slug:'iso-certification-renewal-2026', pr:'PR-2026-003', cat:'Regulatory', color:'#22c55e', catBg:'rgba(34,197,94,0.1)', title:'ISO 9001:2015 & BDS Certification Renewal — Quality Assurance Confirmed', date:'May 10, 2026', read:'2 min read', imgBg:'rgba(34,197,94,0.12)', tags:['ISO 9001','Certification','Quality','Regulatory'], body:['Anwar Ispat Limited announces the successful renewal of its ISO 9001:2015 Quality Management System certification, following a comprehensive third-party audit conducted by Bureau Veritas Certification Bangladesh.','The audit covered all aspects of the company\'s production processes, quality control systems, supply chain management, and customer service protocols across all manufacturing facilities.','Additionally, the company has renewed its Bangladesh Standards and Testing Institution (BSTI) certification for all product grades including ANWARS 500DWR, 420DWR, and the newly launched 500W TMT Bar series.','This dual certification renewal reaffirms Anwar Ispat\'s unwavering commitment to delivering consistently high-quality steel products that meet both national and international standards.','The Management thanks the dedicated quality assurance team and all employees whose diligence and professionalism made this achievement possible.'] },
  { id:3, slug:'narayanganj-rolling-mill-2026', pr:'PR-2026-004', cat:'Operational', color:'#eab308', catBg:'rgba(234,179,8,0.1)', title:'New Rolling Mill Facility Commissioned in Narayanganj Industrial Zone', date:'April 20, 2026', read:'3 min read', imgBg:'rgba(234,179,8,0.12)', tags:['Operations','Rolling Mill','Narayanganj','Infrastructure'], body:['Anwar Ispat Limited is pleased to announce the successful commissioning of its new Rolling Mill Facility at the Narayanganj Industrial Zone. The facility represents a BDT 320 crore investment in state-of-the-art steel processing technology.','The new mill features a high-speed continuous rolling system capable of producing 500,000 metric tonnes of reinforcing bar annually. The facility incorporates the latest energy-saving induction heating technology, reducing energy consumption by approximately 22% compared to conventional systems.','The commissioning ceremony was attended by senior management, government representatives, and industry partners. The facility is expected to be fully operational at rated capacity within 90 days of commissioning.','This investment is a key component of Anwar Ispat\'s capacity expansion strategy for 2026 and underscores the company\'s commitment to meeting the growing demand for high-quality steel in Bangladesh\'s construction and infrastructure sectors.'] },
  { id:4, slug:'esg-report-2025', pr:'PR-2026-005', cat:'ESG', color:'#22c55e', catBg:'rgba(34,197,94,0.1)', title:'Anwar Ispat ESG Report 2025 Released — Zero Waste Water Policy Achieved', date:'April 5, 2026', read:'5 min read', imgBg:'rgba(34,197,94,0.08)', tags:['ESG','Environment','Sustainability','2025'], body:['Anwar Ispat Limited is proud to release its Environmental, Social and Governance (ESG) Report for the fiscal year 2025, marking a significant milestone in the company\'s sustainability journey.','The 2025 ESG Report highlights the achievement of the company\'s Zero Waste Water Policy across all manufacturing facilities — a commitment made in the 2023 ESG roadmap. All process water is now treated and recycled within closed-loop systems, achieving zero liquid discharge to the environment.','In the social dimension, Anwar Ispat distributed 500 scholarships to meritorious students from low-income families across Bangladesh, operated 20 free medical camps serving over 15,000 beneficiaries, and planted 5,000 trees as part of its reforestation initiative.','On governance, the company strengthened its Board composition with the addition of two independent directors, enhancing oversight and transparency in decision-making processes.','Anwar Ispat remains committed to advancing its ESG agenda and will publish updated targets for 2026-2028 in the coming quarter.'] },
  { id:5, slug:'bgmea-partnership-ratified', pr:'PR-2026-006', cat:'Corporate', color:'#E3182D', catBg:'rgba(227,24,45,0.1)', title:'Board Resolution: Strategic Partnership with BGMEA Ratified', date:'March 18, 2026', read:'2 min read', imgBg:'rgba(227,24,45,0.08)', tags:['Partnership','BGMEA','Corporate','Strategy'], body:['The Board of Directors of Anwar Ispat Limited has ratified the Strategic Partnership Agreement with the Bangladesh Garment Manufacturers and Exporters Association (BGMEA), effective from April 1, 2026.','Under this partnership, Anwar Ispat will serve as the preferred steel supplier for infrastructure development projects across BGMEA member facilities, including factory construction, expansion, and renovation projects.','The partnership encompasses a three-year supply agreement covering an estimated 120,000 metric tonnes of reinforcing steel, representing a total contract value of approximately BDT 720 crore at current market prices.','This strategic alliance reinforces Anwar Ispat\'s position as the partner of choice for Bangladesh\'s key industrial sectors and supports the garment industry\'s ongoing infrastructure modernization drive.','The Board expresses its appreciation to the management teams of both organizations for their diligence in negotiating and finalizing this mutually beneficial partnership.'] },
];

const PressArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [slug]);

  const release = releases.find(r => r.slug === slug);
  const related = releases.filter(r => r.slug !== slug).slice(0, 3);
  const url = 'https://anwarispat.com/media/press/' + slug;

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  useGSAP(() => {
    gsap.fromTo('.pa-fade', { opacity:0, y:30 }, { opacity:1, y:0, duration:0.8, stagger:0.1, delay:0.2, ease:'power3.out' });
    gsap.utils.toArray('.pa-scroll').forEach(el => {
      ScrollTrigger.create({ trigger:el, start:'top 88%', onEnter:() => gsap.to(el, { opacity:1, y:0, duration:0.6, ease:'power3.out' }) });
    });
  }, { scope:containerRef });

  if (!release) {
    return (
      <div style={{ background:'var(--primary)', color:'var(--text)', minHeight:'100vh', paddingTop:'80px', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:'16px' }}>
        <div style={{ fontSize:'48px', fontWeight:900, color:'var(--accent)' }}>404</div>
        <div style={{ fontSize:'16px', color:'var(--subtext)' }}>Press release not found</div>
        <button onClick={() => navigate('/media/press')} style={{ marginTop:'12px', background:'var(--accent)', color:'#fff', border:'none', padding:'10px 24px', borderRadius:'6px', fontSize:'12px', letterSpacing:'1px', textTransform:'uppercase', cursor:'pointer', fontWeight:700 }}>← Back to Press</button>
      </div>
    );
  }

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
            <span style={{ opacity:0.3 }}>›</span>
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
          ← Back to Press Releases
        </button>

        <div className="pa-fade" style={{ display:'flex', gap:'8px', marginBottom:'14px', flexWrap:'wrap' }}>
          <span style={{ display:'inline-block', background:'var(--accent)', color:'#fff', fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', padding:'3px 9px', borderRadius:'3px', fontWeight:700 }}>Official Statement</span>
          <span style={{ display:'inline-block', background:release.catBg, color:release.color, fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', padding:'3px 9px', borderRadius:'3px', fontWeight:700, border:'1px solid ' + release.color + '40' }}>{release.cat}</span>
          <span style={{ display:'inline-block', background:'var(--glass)', color:'var(--subtext)', fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', padding:'3px 9px', borderRadius:'3px', fontWeight:700, border:'1px solid var(--glass-border)' }}>{release.pr}</span>
        </div>

        <h1 className="pa-fade" style={{ fontSize:isMobile?'clamp(20px,5vw,28px)':'clamp(24px,4vw,38px)', fontWeight:900, lineHeight:1.1, textTransform:'uppercase', letterSpacing:'-1px', marginBottom:'18px', fontFamily:'var(--font-heading)' }}>{release.title}</h1>

        <div className="pa-fade" style={{ display:'flex', alignItems:'center', gap:'10px', fontSize:'12px', color:'var(--subtext)', flexWrap:'wrap', marginBottom:'28px' }}>
          <span>{release.date}</span>
          <span style={{ width:'3px', height:'3px', borderRadius:'50%', background:'var(--subtext)', flexShrink:0 }}/>
          <span>{release.read}</span>
          <span style={{ width:'3px', height:'3px', borderRadius:'50%', background:'var(--subtext)', flexShrink:0 }}/>
          <span style={{ color:'var(--accent)', fontWeight:600 }}>Anwar Ispat</span>
        </div>
      </div>

      {/* FEATURED IMAGE */}
      <div style={{ maxWidth:'900px', margin:'0 auto', padding:isMobile?'0 24px 32px':'0 40px 36px' }}>
        <div className="pa-fade" style={{ width:'100%', height:isMobile?'200px':'380px', background:release.imgBg, borderRadius:'12px', border:'1px solid ' + release.color + '25', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'12px' }}>
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke={release.color + '40'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
          <span style={{ fontSize:'10px', letterSpacing:'2px', textTransform:'uppercase', color:release.color + '50' }}>Official Press Release Image</span>
        </div>
      </div>

      {/* BODY */}
      <div style={{ maxWidth:'900px', margin:'0 auto', padding:isMobile?'0 24px 60px':'0 40px 72px', display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 240px', gap:isMobile?'40px':'56px', alignItems:'start' }}>

        {/* ARTICLE */}
        <div>
          <div className="pa-fade" style={{ padding:'16px 20px', background:release.catBg, border:'1px solid ' + release.color + '30', borderLeft:'3px solid ' + release.color, borderRadius:'0 8px 8px 0', marginBottom:'28px' }}>
            <div style={{ fontSize:'10px', letterSpacing:'2px', color:release.color, textTransform:'uppercase', fontWeight:700, marginBottom:'4px' }}>For Immediate Release</div>
            <div style={{ fontSize:'12px', color:'var(--subtext)', lineHeight:1.6 }}>{release.date} — Dhaka, Bangladesh — Anwar Ispat Limited</div>
          </div>

          {release.body.map((para, i) => (
            <p key={i} className="pa-scroll"
              style={{ fontSize:i===0?'15px':'14px', color:i===0?'var(--text)':'var(--subtext)', lineHeight:1.9, marginBottom:'18px', opacity:0, transform:'translateY(20px)', fontWeight:i===0?500:400 }}>
              {i===1 && <span style={{ display:'block', width:'40px', height:'3px', background:'var(--accent)', borderRadius:'2px', marginBottom:'20px' }}/>}
              {para}
            </p>
          ))}

          {/* CONTACT */}
          <div className="pa-scroll" style={{ marginTop:'32px', padding:'20px 22px', background:'var(--glass)', border:'1px solid var(--glass-border)', borderRadius:'10px', opacity:0, transform:'translateY(20px)' }}>
            <div style={{ fontSize:'10px', letterSpacing:'2px', textTransform:'uppercase', color:'var(--accent)', marginBottom:'12px', fontWeight:700 }}>Media Contact</div>
            <div style={{ fontSize:'13px', fontWeight:700, marginBottom:'4px' }}>Corporate Communications</div>
            <div style={{ fontSize:'12px', color:'var(--subtext)', lineHeight:1.7 }}>Anwar Ispat Limited<br/>Email: media@anwarispat.com<br/>Phone: +880 2-XXXX-XXXX</div>
          </div>

          {/* TAGS */}
          <div className="pa-scroll" style={{ marginTop:'24px', paddingTop:'22px', borderTop:'1px solid var(--glass-border)', opacity:0, transform:'translateY(20px)' }}>
            <div style={{ fontSize:'10px', letterSpacing:'2px', textTransform:'uppercase', color:'var(--subtext)', marginBottom:'10px' }}>Tags</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
              {release.tags.map((tag,i) => (
                <span key={i} style={{ padding:'4px 14px', borderRadius:'20px', fontSize:'10px', letterSpacing:'1.5px', textTransform:'uppercase', border:'1px solid var(--glass-border)', color:'var(--subtext)', cursor:'pointer', transition:'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=release.color; e.currentTarget.style.color=release.color; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--glass-border)'; e.currentTarget.style.color='var(--subtext)'; }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div style={{ position:isMobile?'relative':'sticky', top:'100px' }}>

          {/* DOWNLOAD */}
          <div className="pa-scroll" style={{ marginBottom:'24px', opacity:0, transform:'translateY(20px)' }}>
            <div style={{ fontSize:'10px', letterSpacing:'3px', textTransform:'uppercase', color:'var(--accent)', marginBottom:'14px', display:'flex', alignItems:'center', gap:'10px' }}>
              Download<div style={{ flex:1, height:'1px', background:'var(--glass-border)' }}/>
            </div>
            <button onClick={() => alert('PDF download coming soon')}
              style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', padding:'12px', background:'var(--accent)', color:'#fff', border:'none', borderRadius:'8px', fontSize:'11px', letterSpacing:'1.5px', textTransform:'uppercase', fontWeight:700, cursor:'pointer', marginBottom:'8px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download PDF
            </button>
          </div>

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
                  {copied?'✓':'Copy'}
                </button>
              </div>
            </div>
          </div>

          {/* RELATED */}
          <div className="pa-scroll" style={{ opacity:0, transform:'translateY(20px)' }}>
            <div style={{ fontSize:'10px', letterSpacing:'3px', textTransform:'uppercase', color:'var(--accent)', marginBottom:'14px', display:'flex', alignItems:'center', gap:'10px' }}>
              Related<div style={{ flex:1, height:'1px', background:'var(--glass-border)' }}/>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
              {related.map((r,i) => (
                <div key={i} onClick={() => navigate('/media/press/' + r.slug)}
                  style={{ display:'flex', gap:'12px', padding:'12px', border:'1px solid var(--glass-border)', borderRadius:'10px', background:'var(--glass)', cursor:'pointer', transition:'all 0.2s', alignItems:'flex-start' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=r.color + '50'; e.currentTarget.style.background=r.color + '08'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--glass-border)'; e.currentTarget.style.background='var(--glass)'; }}>
                  <div style={{ width:'48px', height:'48px', borderRadius:'8px', background:r.catBg, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={r.color + '80'} strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:'9px', color:r.color, letterSpacing:'1.5px', textTransform:'uppercase', fontWeight:700, marginBottom:'4px' }}>{r.pr}</div>
                    <div style={{ fontSize:'11px', fontWeight:700, lineHeight:1.4, textTransform:'uppercase', letterSpacing:'-0.2px' }}>{r.title}</div>
                    <div style={{ fontSize:'10px', color:'var(--subtext)', marginTop:'4px' }}>{r.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PressArticlePage;
