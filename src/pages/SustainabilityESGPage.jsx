import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    key: 'env',
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.04)',
    headBg: 'rgba(34,197,94,0.08)',
    iconBg: 'rgba(34,197,94,0.15)',
    title: 'Environmental',
    sub: 'Planet & Ecology',
    image: '/images/esg-environmental.jpg',
    imageLabel: 'Environmental Image',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c4.97-2.5 8-6.5 8-11V5l-8-3-8 3v6c0 4.5 3.03 8.5 8 11z"/>
      </svg>
    ),
    items: ['Renewable Energy', 'Waste Reduction & Recycling', 'Environmental Consciousness', 'Green Manufacturing'],
  },
  {
    key: 'soc',
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.04)',
    headBg: 'rgba(59,130,246,0.08)',
    iconBg: 'rgba(59,130,246,0.15)',
    title: 'Social',
    sub: 'People & Community',
    image: '/images/esg-social.jpg',
    imageLabel: 'Social Image',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    items: ['Community Engagement', 'Healthcare & Sanitation', 'Education', 'Employee Health and Safety'],
  },
  {
    key: 'gov',
    color: '#E3182D',
    bg: 'rgba(227,24,45,0.04)',
    headBg: 'rgba(227,24,45,0.08)',
    iconBg: 'rgba(227,24,45,0.15)',
    title: 'Governance',
    sub: 'Ethics & Accountability',
    image: '/images/esg-governance.jpg',
    imageLabel: 'Governance Image',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E3182D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    items: ['Ethics & Compliance', 'Risk Management', 'Transparency & Disclosure', 'Sustainability Reporting'],
  },
];

const sdgs = [
  { label: 'Recycling & Waste Reduction', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E3182D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.5"/></svg> },
  { label: 'Supporting Local Communities', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E3182D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { label: 'Green Design & Manufacturing', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E3182D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg> },
  { label: 'Education', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E3182D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg> },
  { label: 'Renewable Energy Adoption', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E3182D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg> },
  { label: 'Reforestation', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E3182D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 22M9.5 2.21C7 5.5 7 8 9.5 11c3-3.5 3-6.5 0-8.79"/></svg> },
  { label: 'Healthcare & Sanitation', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E3182D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> },
];

const ImageSlot = ({ src, alt, label, color }) => (
  <div style={{ width: '100%', height: '180px', position: 'relative', overflow: 'hidden', background: 'rgba(0,0,0,0.3)', borderBottom: `1px solid rgba(255,255,255,0.06)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
    <img src={src} alt={alt} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => { e.target.style.display = 'none'; }} />
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={`${color}60`} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
    </svg>
    <span style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: `${color}60` }}>{label}</span>
  </div>
);

const SustainabilityESGPage = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useGSAP(() => {
    gsap.fromTo('.esg-hero-tag', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' });
    gsap.fromTo('.esg-hero-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: 'power3.out' });
    gsap.fromTo('.esg-hero-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: 'power3.out' });
    gsap.fromTo('.esg-stats-row', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.9, ease: 'power3.out' });

    gsap.utils.toArray('.esg-fade').forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.7, delay: parseFloat(el.dataset.delay || 0), ease: 'power3.out' })
      });
    });

    gsap.utils.toArray('.esg-pillar-card').forEach((el, i) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.7, delay: i * 0.12, ease: 'power3.out' })
      });
    });

    gsap.utils.toArray('.esg-sdg-item').forEach((el, i) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 92%',
        onEnter: () => gsap.to(el, { opacity: 1, x: 0, duration: 0.5, delay: (i % 3) * 0.08, ease: 'power3.out' })
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{ background: 'var(--primary)', color: 'var(--text)', minHeight: '100vh', paddingTop: '80px', overflowX: 'hidden' }}>

      {/* HERO */}
      <section style={{ padding: isMobile ? '56px 24px 40px' : '80px 40px 56px', borderBottom: '1px solid var(--glass-border)', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '700px', height: '280px', background: 'radial-gradient(ellipse, rgba(227,24,45,0.13) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div className="esg-hero-tag" style={{ fontSize: '11px', letterSpacing: '4px', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '18px', opacity: 0 }}>// Environmental, Social, Governance</div>
          <h1 className="esg-hero-title" style={{ fontSize: 'clamp(32px,5vw,58px)', fontWeight: 900, lineHeight: 1.05, textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: '20px', opacity: 0, fontFamily: 'var(--font-heading)' }}>
            Sustainable <span style={{ color: 'var(--accent)' }}>Steel</span><br />Development
          </h1>
          <p className="esg-hero-sub" style={{ fontSize: isMobile ? '14px' : '15px', color: 'var(--subtext)', maxWidth: '580px', margin: '0 auto 36px', lineHeight: 1.8, opacity: 0 }}>
            Championing SDGs through sustainable business practices, community empowerment, and environmental stewardship.
          </p>
          <div className="esg-stats-row" style={{ display: 'flex', justifyContent: 'center', gap: isMobile ? '28px' : '56px', flexWrap: 'wrap', opacity: 0 }}>
            {[{ n: '3', l: 'ESG Pillars' }, { n: '7', l: 'SDG Goals' }, { n: '48+', l: 'Years Responsible' }, { n: '0', l: 'Waste Water Policy' }].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--accent)' }}>{s.n}</div>
                <div style={{ fontSize: '10px', color: 'var(--subtext)', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '4px' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section style={{ padding: isMobile ? '40px 24px' : '48px 40px', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="esg-fade" data-delay="0" style={{ maxWidth: '900px', margin: '0 auto', background: 'rgba(227,24,45,0.05)', border: '1px solid rgba(227,24,45,0.2)', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'stretch', opacity: 0, transform: 'translateY(30px)' }}>
          <div style={{ width: isMobile ? '100%' : '260px', flexShrink: 0, background: 'rgba(227,24,45,0.08)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden', minHeight: isMobile ? '240px' : '320px' }}>
            <img src="/Manwar-Hossain-transparent-1by1-ar.png" alt="Manwar Hossain" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
          </div>
          <div style={{ flex: 1, padding: isMobile ? '28px 24px' : '40px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '56px', lineHeight: 0.7, color: 'var(--accent)', fontWeight: 900, marginBottom: '20px' }}>“</div>
            <p style={{ fontSize: isMobile ? '15px' : '19px', lineHeight: 1.75, fontStyle: 'italic', color: 'var(--text)', marginBottom: '24px' }}>
              I envision <span style={{ color: 'var(--accent)', fontStyle: 'normal', fontWeight: 700 }}>Anwar Group</span> not just as a business entity but as a catalyst for progress, for a <span style={{ color: 'var(--accent)', fontStyle: 'normal', fontWeight: 700 }}>sustainable</span> and equitable future.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '2px', background: 'var(--accent)', borderRadius: '2px' }} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '1px' }}>Manwar Hossain</div>
                <div style={{ fontSize: '11px', color: 'var(--subtext)', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '2px' }}>Chairman, Anwar Group</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ESG PILLARS */}
      <section style={{ padding: isMobile ? '48px 24px' : '60px 40px' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="esg-fade" data-delay="0" style={{ fontSize: '11px', letterSpacing: '4px', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '10px', opacity: 0, transform: 'translateY(20px)' }}>// Three Pillars</div>
            <h2 className="esg-fade" data-delay="0.1" style={{ fontSize: isMobile ? '26px' : '32px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.5px', fontFamily: 'var(--font-heading)', opacity: 0, transform: 'translateY(20px)' }}>Our ESG Framework</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: '20px' }}>
            {pillars.map((p) => (
              <div key={p.key} className="esg-pillar-card" style={{ background: p.bg, border: '1px solid var(--glass-border)', borderRadius: '14px', overflow: 'hidden', opacity: 0, transform: 'translateY(40px)', display: 'flex', flexDirection: 'column' }}>
                <ImageSlot src={p.image} alt={p.title} label={p.imageLabel} color={p.color} />
                <div style={{ background: `linear-gradient(135deg, ${p.headBg}, transparent)`, padding: '20px 22px 16px', borderBottom: '1px solid var(--glass-border)' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: p.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>{p.icon}</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: p.color, marginBottom: '3px', fontFamily: 'var(--font-heading)' }}>{p.title}</div>
                  <div style={{ fontSize: '11px', color: 'var(--subtext)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>{p.sub}</div>
                </div>
                <div style={{ padding: '18px 22px 22px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                  {p.items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--subtext)' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: p.color, flexShrink: 0 }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDG */}
      <section style={{ padding: isMobile ? '0 24px 56px' : '0 40px 64px', borderTop: '1px solid var(--glass-border)' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto', paddingTop: isMobile ? '40px' : '56px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div className="esg-fade" data-delay="0" style={{ fontSize: '11px', letterSpacing: '4px', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '10px', opacity: 0, transform: 'translateY(20px)' }}>// United Nations</div>
            <h2 className="esg-fade" data-delay="0.1" style={{ fontSize: isMobile ? '24px' : '30px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.5px', fontFamily: 'var(--font-heading)', opacity: 0, transform: 'translateY(20px)' }}>SDG Commitments</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3,1fr)', gap: '12px' }}>
            {sdgs.map((s, i) => (
              <div key={i} className="esg-sdg-item" style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: '10px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', opacity: 0, transform: 'translateX(-12px)', cursor: 'default', gridColumn: i === 6 ? '1 / -1' : 'auto' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(227,24,45,0.35)'; e.currentTarget.style.background = 'rgba(227,24,45,0.04)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.background = 'var(--glass)'; }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(227,24,45,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s.icon}</div>
                <div style={{ fontSize: '12px', color: 'var(--subtext)', fontWeight: 600, lineHeight: 1.3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section style={{ padding: isMobile ? '0 24px 60px' : '0 40px 80px', borderTop: '1px solid var(--glass-border)' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto', paddingTop: isMobile ? '40px' : '56px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '40px', alignItems: 'start' }}>
          <div className="esg-fade" data-delay="0" style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <div style={{ fontSize: '11px', letterSpacing: '4px', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '10px' }}>// Our Commitment</div>
            <h2 style={{ fontSize: isMobile ? '22px' : '26px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.5px', fontFamily: 'var(--font-heading)', marginBottom: '22px' }}>Sustainable Business Practices</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {['At Anwar Group of Industries, we recognize that our operations have an impact on the environment, and we are committed to minimizing that impact through sustainable practices.',
                'We strongly believe that taking care of its employees and giving back to the society have played a vital part in establishing the company as one of the oldest, largest and most diversified industrial groups.',
                'At the heart of our activities is the deep rooted conviction towards people and society at large, that emanates from the values that have been in the family for many centuries.'].map((t, i) => (
                <p key={i} style={{ fontSize: '14px', color: 'var(--subtext)', lineHeight: 1.85, margin: 0 }}>{t}</p>
              ))}
            </div>
          </div>
          <div className="esg-fade" data-delay="0.15" style={{ display: 'flex', flexDirection: 'column', gap: '14px', opacity: 0, transform: 'translateY(30px)' }}>
            {[
              { color: '#22c55e', label: 'Energy Saving', text: 'Implementing energy-saving reheating induction systems across all production facilities.' },
              { color: '#3b82f6', label: 'Zero Waste Water', text: 'Zero-waste water recycling policies ensuring minimal environmental footprint.' },
              { color: '#E3182D', label: 'Carbon Reduction', text: 'Committed to reducing industrial carbon footprint through modern green manufacturing.' },
            ].map((item, i) => (
              <div key={i} style={{ background: `${item.color}0f`, border: `1px solid ${item.color}33`, borderRadius: '12px', padding: '20px 22px' }}>
                <div style={{ fontSize: '11px', letterSpacing: '2px', color: item.color, textTransform: 'uppercase', marginBottom: '8px', fontWeight: 700 }}>{item.label}</div>
                <div style={{ fontSize: '13px', color: 'var(--subtext)', lineHeight: 1.7 }}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default SustainabilityESGPage;