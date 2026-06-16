import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const values = [
  { title: 'Continuous Innovation', desc: 'Aspire to continuously introduce new products and services to support the economic growth of Bangladesh.', span: false },
  { title: 'Business Diversity', desc: 'Strive to maintain position as the most diversified group in Bangladesh, responding efficiently to evolving customer needs and market trends.', span: false },
  { title: 'Environmental Consciousness', desc: 'Embrace environmental responsibility and social accountability by adhering to sustainable and ethical business practices.', span: false },
  { title: 'Quality Leadership', desc: 'Uphold a reputation for quality leadership in every industry we operate in by upholding the highest standards of quality in all products and services.', span: false },
  { title: 'Employee Friendliness', desc: 'Facilitate professional growth of our people through investment in training and development programs.', span: true },
];

const ImageSlot = ({ src, alt, label, accentColor }) => (
  <div style={{ width: '100%', height: '200px', position: 'relative', overflow: 'hidden', background: accentColor === 'red' ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.2)', borderBottom: accentColor === 'red' ? '1px solid rgba(227,24,45,0.2)' : '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
    <img src={src} alt={alt} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      onError={e => { e.target.style.display = 'none'; }} />
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke={accentColor === 'red' ? 'rgba(227,24,45,0.5)' : 'rgba(255,255,255,0.2)'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
    </svg>
    <span style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: accentColor === 'red' ? 'rgba(227,24,45,0.5)' : 'rgba(255,255,255,0.25)' }}>{label}</span>
    <span style={{ position: 'absolute', bottom: '8px', right: '10px', fontSize: '10px', color: 'rgba(255,255,255,0.2)', letterSpacing: '1px' }}>{src}</span>
  </div>
);

const VisionMissionPage = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useGSAP(() => {
    gsap.fromTo('.vm-hero-tag', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' });
    gsap.fromTo('.vm-hero-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: 'power3.out' });
    gsap.fromTo('.vm-hero-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.7, ease: 'power3.out' });

    gsap.utils.toArray('.vm-fade').forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.7, delay: parseFloat(el.dataset.delay || 0), ease: 'power3.out' })
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{ background: 'var(--primary)', color: 'var(--text)', minHeight: '100vh', paddingTop: '80px', overflowX: 'hidden' }}>

      {/* Hero */}
      <section style={{ padding: isMobile ? '60px 24px 48px' : '80px 40px 60px', borderBottom: '1px solid var(--glass-border)', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '600px', height: '300px', background: 'radial-gradient(ellipse, rgba(227,24,45,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div className="vm-hero-tag" style={{ fontSize: '11px', letterSpacing: '4px', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '20px', opacity: 0 }}>// Purpose & Direction</div>
          <h1 className="vm-hero-title" style={{ fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 900, lineHeight: 1.05, textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: '24px', opacity: 0, fontFamily: 'var(--font-heading)' }}>
            SINCE <span style={{ color: 'var(--accent)' }}>1834</span>,<br />FORGED IN PURPOSE
          </h1>
          <p className="vm-hero-sub" style={{ fontSize: isMobile ? '14px' : '16px', color: 'var(--subtext)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.8, opacity: 0 }}>
            Anwar Group has been at the forefront of industry in Bangladesh, evolving from a single trading operation to a diverse set of ventures - built on vision, mission, and unwavering values.
          </p>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section style={{ padding: isMobile ? '48px 24px' : '64px 40px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '28px', alignItems: 'start' }}>

          {/* Vision Card */}
          <div className="vm-fade" data-delay="0" style={{ borderRadius: '16px', overflow: 'hidden', background: 'rgba(227,24,45,0.06)', border: '1px solid rgba(227,24,45,0.25)', opacity: 0, transform: 'translateY(30px)' }}>
            <ImageSlot src="/images/vision.jpg" alt="Vision" label="Vision Image" accentColor="red" />
            <div style={{ padding: isMobile ? '24px' : '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                <div style={{ width: '38px', height: '38px', background: 'var(--accent)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </div>
                <span style={{ fontSize: '11px', letterSpacing: '3px', color: 'var(--accent)', textTransform: 'uppercase' }}>Vision</span>
              </div>
              <h2 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 800, lineHeight: 1.1, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '-0.5px', fontFamily: 'var(--font-heading)' }}>Continuing The Heritage</h2>
              <div style={{ width: '40px', height: '3px', background: 'var(--accent)', marginBottom: '14px', borderRadius: '2px' }} />
              <p style={{ fontSize: '14px', color: 'var(--subtext)', lineHeight: 1.8 }}>Continuing the heritage of being pioneers in industries and leaders in development across Bangladesh and beyond.</p>
            </div>
          </div>

          {/* Mission Card */}
          <div className="vm-fade" data-delay="0.12" style={{ borderRadius: '16px', overflow: 'hidden', background: 'var(--glass)', border: '1px solid var(--glass-border)', opacity: 0, transform: 'translateY(30px)' }}>
            <ImageSlot src="/images/mission.jpg" alt="Mission" label="Mission Image" accentColor="white" />
            <div style={{ padding: isMobile ? '24px' : '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                <div style={{ width: '38px', height: '38px', background: 'rgba(255,255,255,0.1)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                </div>
                <span style={{ fontSize: '11px', letterSpacing: '3px', color: 'var(--accent)', textTransform: 'uppercase' }}>Mission</span>
              </div>
              <h2 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 800, lineHeight: 1.1, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '-0.5px', fontFamily: 'var(--font-heading)' }}>Transformative Growth</h2>
              <div style={{ width: '40px', height: '3px', background: 'var(--accent)', marginBottom: '14px', borderRadius: '2px' }} />
              <p style={{ fontSize: '14px', color: 'var(--subtext)', lineHeight: 1.8 }}>At Anwar Group, our vision and mission converge in a steadfast pursuit of transformative growth and societal progress. Rooted in heritage, guided by sustainability, ethics, and innovation.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Values */}
      <section style={{ padding: isMobile ? '0 24px 60px' : '0 40px 80px', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid var(--glass-border)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ padding: isMobile ? '40px 0 28px' : '56px 0 40px', textAlign: 'center' }}>
            <div className="vm-fade" data-delay="0" style={{ fontSize: '11px', letterSpacing: '4px', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '10px', opacity: 0, transform: 'translateY(20px)' }}>// Our Core</div>
            <h2 className="vm-fade" data-delay="0.1" style={{ fontSize: isMobile ? '28px' : '36px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.5px', fontFamily: 'var(--font-heading)', opacity: 0, transform: 'translateY(20px)' }}>Values</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '14px' }}>
            {values.map((v, i) => (
              <div key={i} className="vm-fade" data-delay={i * 0.08}
                style={{ gridColumn: v.span && !isMobile ? '1 / -1' : 'auto', borderLeft: '3px solid var(--accent)', padding: isMobile ? '18px 20px' : '22px 28px', background: 'var(--glass)', borderRadius: '0 10px 10px 0', opacity: 0, transform: 'translateY(20px)', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(227,24,45,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--glass)'; }}>
                <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text)', marginBottom: '8px' }}>{v.title}</div>
                <p style={{ fontSize: '13px', color: 'var(--subtext)', lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default VisionMissionPage;