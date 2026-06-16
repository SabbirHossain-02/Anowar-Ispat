import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useParams, useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const articles = [
  { id:0, slug:'rooppur-nuclear-power-plant', cat:'Corporate · Infrastructure', color:'#E3182D', title:"Anwar Ispat Supplies Steel for Bangladesh's Rooppur Nuclear Power Plant", date:'June 12, 2026', read:'5 min read', imgBg:'rgba(227,24,45,0.15)', tags:['Infrastructure','Nuclear','Steel Supply','Bangladesh'], body:["Anwar Ispat has been officially selected as the primary steel supplier for the landmark Rooppur Nuclear Power Plant — Bangladesh's first nuclear facility. This historic contract marks a defining chapter in the company's journey spanning nearly five decades.","The Rooppur plant, located in Pabna district, is one of the largest infrastructure projects in Bangladesh's history. Anwar Ispat's 500W-grade reinforcing bars are being used in the structural foundations and reactor building components.","\"This is not just a business contract — it is a testament to the trust that Bangladesh places in Anwar Ispat's quality and reliability,\" said the Managing Director at a signing ceremony in Dhaka.","The project is expected to generate approximately 2,400 MW of electricity upon completion, contributing significantly to the national grid and supporting Bangladesh's Vision 2041 energy targets.","Anwar Ispat's 500W TMT bars meet the stringent quality requirements for nuclear infrastructure, including earthquake resistance, high ductility, and consistent mechanical properties that ensure long-term structural integrity."] },
  { id:1, slug:'national-steel-excellence-award-2026', cat:'Awards & Recognition', color:'#3b82f6', title:'Anwar Ispat Wins National Steel Excellence Award 2026', date:'June 8, 2026', read:'3 min read', imgBg:'rgba(59,130,246,0.15)', tags:['Awards','Excellence','Recognition','2026'], body:["Anwar Ispat has been honored with the prestigious National Steel Excellence Award 2026, recognizing the company's outstanding contribution to Bangladesh's construction and infrastructure sector.","The award was presented at a ceremony held in Dhaka, attended by industry leaders, government officials, and representatives from major construction firms across the country.","This recognition reflects Anwar Ispat's commitment to maintaining the highest standards of quality, innovation, and sustainable manufacturing practices over nearly 50 years of operation.","The Managing Director accepted the award on behalf of the company, thanking the dedicated team whose relentless pursuit of excellence made this achievement possible."] },
  { id:2, slug:'500w-tmt-bar-launch', cat:'Product Launch', color:'#22c55e', title:"New 500W TMT Bar: Bangladesh's Strongest Rebar Launched", date:'May 28, 2026', read:'4 min read', imgBg:'rgba(34,197,94,0.15)', tags:['500W TMT','Product Launch','Steel','Innovation'], body:["Anwar Ispat has officially launched the ANWARS 500W TMT Bar — a thermo-mechanically treated reinforcing bar engineered for the most demanding construction environments in Bangladesh.","The new product offers superior fatigue strength, enhanced corrosion resistance, and consistent mechanical properties, making it ideal for high-rise structures, bridges, and industrial facilities.","The 500W TMT Bar meets both BDS and ISO certification standards, further cementing Anwar Ispat's position as the nation's most trusted steel manufacturer.","The product has already received orders from several major construction companies involved in Bangladesh's ongoing infrastructure development projects."] },
  { id:3, slug:'padma-bridge-steel-supply', cat:'Infrastructure', color:'#eab308', title:'Padma Bridge Uses Anwar Ispat Steel in Key Structural Components', date:'May 15, 2026', read:'3 min read', imgBg:'rgba(234,179,8,0.15)', tags:['Padma Bridge','Infrastructure','Construction'], body:["Anwar Ispat's high-strength reinforcing steel has been used in several key structural components of the Padma Multipurpose Bridge — one of Bangladesh's most ambitious infrastructure projects.","The bridge, spanning 6.15 kilometers over the Padma River, required steel that meets the highest international standards for strength, ductility, and durability.","This contribution underscores Anwar Ispat's capability to supply materials for mega-infrastructure projects across the nation.","The Padma Bridge now stands as a testament to Bangladeshi engineering excellence, with Anwar Ispat's steel playing a crucial role in its structural integrity."] },
  { id:4, slug:'bgmea-partnership', cat:'Corporate', color:'#a855f7', title:'Anwar Group Partners with BGMEA for Infrastructure Development', date:'April 22, 2026', read:'2 min read', imgBg:'rgba(168,85,247,0.15)', tags:['Partnership','BGMEA','Corporate','Development'], body:["Anwar Group has signed a strategic partnership agreement with BGMEA to support infrastructure development across the garment sector.","The partnership will see Anwar Ispat supplying steel for the construction and expansion of garment factories, warehouses, and worker facilities across Bangladesh.","This collaboration is expected to strengthen Bangladesh's position as a global leader in the ready-made garment industry by providing world-class infrastructure support."] },
  { id:5, slug:'iso-certification-renewed', cat:'Certification', color:'#ec4899', title:'ISO 9001:2015 Certification Renewed for Anwar Ispat Facilities', date:'March 10, 2026', read:'2 min read', imgBg:'rgba(236,72,153,0.15)', tags:['ISO 9001','Certification','Quality','Standards'], body:["Anwar Ispat has successfully renewed its ISO 9001:2015 Quality Management System certification, reaffirming the company's commitment to delivering consistent, high-quality steel products.","The renewal followed a rigorous audit process covering all production facilities, quality control procedures, and supply chain management systems.","This certification demonstrates Anwar Ispat's adherence to international quality benchmarks and provides assurance to clients about the reliability of its steel products."] },
  { id:6, slug:'production-capacity-expansion', cat:'Corporate', color:'#E3182D', title:'Anwar Ispat Expands Production Capacity by 40% in 2026', date:'June 2026', read:'2 min read', imgBg:'rgba(227,24,45,0.08)', tags:['Expansion','Production','2026','Growth'], body:["Anwar Ispat has announced a major expansion of its production capacity, with a 40% increase targeted for completion by end of 2026.","The expansion includes new rolling mill lines and upgraded induction furnace systems. This strategic investment positions Anwar Ispat to meet growing demand driven by Bangladesh's infrastructure development program.","The expanded capacity will enable Anwar Ispat to serve larger projects simultaneously while maintaining its hallmark quality standards."] },
  { id:7, slug:'csr-scholarships-2026', cat:'CSR', color:'#22c55e', title:'CSR Initiative: 500 Scholarships Distributed Across Bangladesh', date:'May 2026', read:'3 min read', imgBg:'rgba(34,197,94,0.08)', tags:['CSR','Education','Scholarships','Community'], body:["As part of its ongoing Corporate Social Responsibility program, Anwar Ispat and Anwar Group have distributed 500 scholarships to meritorious students from low-income families across Bangladesh.","The scholarships, covering education expenses from secondary to university level, reflect the group's deep-rooted conviction towards community empowerment and social development.","Recipients were selected based on academic merit and financial need, with special consideration given to students from rural areas who face limited educational opportunities."] },
  { id:8, slug:'48-years-of-excellence', cat:'Corporate', color:'#eab308', title:'Anwar Group Celebrates 48 Years of Steel Excellence', date:'April 2026', read:'4 min read', imgBg:'rgba(234,179,8,0.08)', tags:['Anniversary','Heritage','48 Years','Excellence'], body:["Anwar Group marked its 48th anniversary with a grand celebration highlighting nearly five decades of contribution to Bangladesh's steel industry and national infrastructure development.","From the founding of Khaled Iron in 1978 to becoming Bangladesh's most trusted steel brand, the journey of Anwar Ispat is a story of vision, perseverance, and unwavering commitment to quality.","The celebration was attended by industry veterans, government representatives, and long-term partners who have been part of Anwar Ispat's remarkable journey across the decades.","Looking ahead, the group reaffirmed its commitment to innovation and sustainability, pledging to continue playing a pivotal role in Bangladesh's infrastructure story for generations to come."] },
];

const NewsArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  const article = articles.find(a => a.slug === slug);
  const related = articles.filter(a => a.slug !== slug).slice(0, 3);

  const url = `https://anwarispat.com/media/news/${slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useGSAP(() => {
    gsap.fromTo('.na-fade', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 0.2, ease: 'power3.out' });
    gsap.utils.toArray('.na-scroll').forEach(el => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      });
    });
  }, { scope: containerRef });

  if (!article) {
    return (
      <div style={{ background: 'var(--primary)', color: 'var(--text)', minHeight: '100vh', paddingTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
        <div style={{ fontSize: '48px', fontWeight: 900, color: 'var(--accent)' }}>404</div>
        <div style={{ fontSize: '16px', color: 'var(--subtext)' }}>Article not found</div>
        <button onClick={() => navigate('/media/news')} style={{ marginTop: '12px', background: 'var(--accent)', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '6px', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', fontWeight: 700 }}>← Back to News</button>
      </div>
    );
  }

  const platforms = [
    { name: 'Facebook', color: '#1877f2', bg: 'rgba(24,119,242,0.08)', border: 'rgba(24,119,242,0.25)', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
    { name: 'LinkedIn', color: '#0077b5', bg: 'rgba(0,119,181,0.08)', border: 'rgba(0,119,181,0.25)', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
    { name: 'WhatsApp', color: '#25d366', bg: 'rgba(37,211,102,0.08)', border: 'rgba(37,211,102,0.25)', href: `https://wa.me/?text=${encodeURIComponent(article.title + ' ' + url)}`, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg> },
  ];

  return (
    <div ref={containerRef} style={{ background: 'var(--primary)', color: 'var(--text)', minHeight: '100vh', paddingTop: '80px', overflowX: 'hidden' }}>

      {/* BREADCRUMB */}
      <div style={{ padding: isMobile ? '12px 24px' : '12px 40px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--subtext)', borderBottom: '1px solid var(--glass-border)', flexWrap: 'wrap' }}>
        {[['Home', '/'], ['Media Center', '/media/news'], ['News & Articles', '/media/news']].map(([label, path], i) => (
          <React.Fragment key={i}>
            <span onClick={() => navigate(path)} style={{ color: 'var(--subtext)', cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--subtext)'; }}>{label}</span>
            <span style={{ color: '#333' }}>›</span>
          </React.Fragment>
        ))}
        <span style={{ color: 'var(--text)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{article.title.substring(0, 40)}...</span>
      </div>

      {/* HERO */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: isMobile ? '28px 24px 0' : '40px 40px 0' }}>
        <button className="na-fade" onClick={() => navigate('/media/news')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--subtext)', background: 'transparent', border: 'none', cursor: 'pointer', marginBottom: '24px', transition: 'color 0.2s', padding: 0 }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--subtext)'; }}>
          ← Back to News
        </button>

        <div className="na-fade" style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700, color: article.color, marginBottom: '14px' }}>{article.cat}</div>

        <h1 className="na-fade" style={{ fontSize: isMobile ? 'clamp(22px,5vw,32px)' : 'clamp(26px,4vw,42px)', fontWeight: 900, lineHeight: 1.1, textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: '20px', fontFamily: 'var(--font-heading)' }}>{article.title}</h1>

        <div className="na-fade" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: 'var(--subtext)', flexWrap: 'wrap', marginBottom: '28px' }}>
          <span>{article.date}</span>
          <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--subtext)', flexShrink: 0 }}/>
          <span>{article.read}</span>
          <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--subtext)', flexShrink: 0 }}/>
          <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Anwar Ispat</span>
        </div>
      </div>

      {/* FEATURED IMAGE */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: isMobile ? '0 24px 32px' : '0 40px 36px' }}>
        <div className="na-fade" style={{ width: '100%', height: isMobile ? '220px' : '400px', background: article.imgBg, borderRadius: '12px', border: `1px solid ${article.color}25`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke={`${article.color}40`} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
          </svg>
          <span style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: `${article.color}50` }}>Article Featured Image</span>
        </div>
      </div>

      {/* BODY - Two Column */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: isMobile ? '0 24px 60px' : '0 40px 72px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 260px', gap: isMobile ? '40px' : '56px', alignItems: 'start' }}>

        {/* ARTICLE TEXT */}
        <div>
          {article.body.map((para, i) => (
            <p key={i} className="na-scroll"
              style={{ fontSize: i === 0 ? '16px' : '15px', color: i === 0 ? 'var(--text)' : 'var(--subtext)', lineHeight: 1.9, marginBottom: '18px', opacity: 0, transform: 'translateY(20px)', fontWeight: i === 0 ? 500 : 400 }}>
              {i === 1 && <span style={{ display: 'block', width: '48px', height: '3px', background: 'var(--accent)', borderRadius: '2px', marginBottom: '20px' }}/>}
              {para}
            </p>
          ))}

          {/* TAGS */}
          <div className="na-scroll" style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--glass-border)', opacity: 0, transform: 'translateY(20px)' }}>
            <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--subtext)', marginBottom: '12px' }}>Tags</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {article.tags.map((tag, i) => (
                <span key={i} style={{ padding: '5px 14px', borderRadius: '20px', fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', border: '1px solid var(--glass-border)', color: 'var(--subtext)', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = article.color; e.currentTarget.style.color = article.color; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.color = 'var(--subtext)'; }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div style={{ position: isMobile ? 'relative' : 'sticky', top: '100px' }}>

          {/* SHARE */}
          <div className="na-scroll" style={{ marginBottom: '28px', opacity: 0, transform: 'translateY(20px)' }}>
            <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              Share
              <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }}/>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {platforms.map((p, i) => (
                <a key={i} href={p.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: p.bg, border: `1px solid ${p.border}`, borderRadius: '8px', color: p.color, textDecoration: 'none', fontSize: '12px', fontWeight: 600, transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; }}>
                  {p.icon} {p.name}
                </a>
              ))}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '9px 12px', marginTop: '4px' }}>
                <span style={{ fontSize: '10px', color: 'var(--subtext)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{url}</span>
                <button onClick={handleCopy} style={{ flexShrink: 0, background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(227,24,45,0.15)', border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : 'rgba(227,24,45,0.3)'}`, color: copied ? '#22c55e' : 'var(--accent)', padding: '4px 10px', borderRadius: '5px', fontSize: '10px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>
                  {copied ? '✓' : 'Copy'}
                </button>
              </div>
            </div>
          </div>

          {/* RELATED */}
          <div className="na-scroll" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              Related
              <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }}/>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {related.map((rel, i) => (
                <div key={i} onClick={() => navigate(`/media/news/${rel.slug}`)}
                  style={{ display: 'flex', gap: '12px', padding: '12px', border: '1px solid var(--glass-border)', borderRadius: '10px', background: 'var(--glass)', cursor: 'pointer', transition: 'all 0.2s', alignItems: 'flex-start' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${rel.color}50`; e.currentTarget.style.background = `${rel.color}08`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.background = 'var(--glass)'; }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '8px', background: rel.imgBg, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={`${rel.color}60`} strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, lineHeight: 1.4, textTransform: 'uppercase', letterSpacing: '-0.2px', marginBottom: '4px', color: 'var(--text)' }}>{rel.title}</div>
                    <div style={{ fontSize: '10px', color: 'var(--subtext)' }}>{rel.date}</div>
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

export default NewsArticlePage;