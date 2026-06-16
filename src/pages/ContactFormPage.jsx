import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactFormPage = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [form, setForm] = useState({ name:'', company:'', email:'', phone:'', subject:'Product Inquiry', message:'' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useGSAP(() => {
    gsap.fromTo('.cf-wrap', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.6, ease:'power3.out' });
  }, { scope:containerRef });

  const inp = { width:'100%', background:'var(--glass)', border:'1px solid var(--glass-border)', borderRadius:'8px', padding:'11px 14px', color:'var(--text)', fontSize:'13px', outline:'none', transition:'border-color 0.2s', fontFamily:'inherit' };
  const lbl = { fontSize:'10px', letterSpacing:'1.5px', textTransform:'uppercase', color:'var(--subtext)', marginBottom:'6px', display:'block' };

  return (
    <div ref={containerRef} style={{ background:'var(--primary)', color:'var(--text)', minHeight:'100vh', paddingTop:'80px', overflowX:'hidden' }}>
      <div className="cf-wrap" style={{ maxWidth:'960px', margin:'0 auto', padding:isMobile?'32px 24px 60px':'36px 40px 64px', opacity:0 }}>

        {/* COMPACT HEADER */}
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'32px', paddingBottom:'24px', borderBottom:'1px solid var(--glass-border)', flexWrap:'wrap', gap:'12px' }}>
          <div>
            <div style={{ fontSize:'10px', letterSpacing:'4px', color:'var(--accent)', textTransform:'uppercase', marginBottom:'6px' }}>// Get In Touch</div>
            <h1 style={{ fontSize:'clamp(28px,4vw,48px)', fontWeight:900, textTransform:'uppercase', letterSpacing:'-1px', lineHeight:1, fontFamily:'var(--font-heading)' }}>
              Contact <span style={{ color:'var(--accent)' }}>Form</span>
            </h1>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:'12px', color:'var(--accent)', fontWeight:700 }}>Within 24 Hours</div>
            <div style={{ fontSize:'10px', color:'var(--subtext)', marginTop:'2px' }}>Response time</div>
          </div>
        </div>

        {/* FORM + SIDEBAR */}
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 280px', gap:'28px', alignItems:'start' }}>
          <div>
            {sent ? (
              <div style={{ padding:'32px', background:'rgba(34,197,94,0.06)', border:'1px solid rgba(34,197,94,0.2)', borderRadius:'12px', textAlign:'center' }}>
                <div style={{ fontSize:'32px', marginBottom:'12px' }}>✓</div>
                <div style={{ fontSize:'16px', fontWeight:700, color:'#22c55e', marginBottom:'8px' }}>Message Sent!</div>
                <p style={{ fontSize:'13px', color:'var(--subtext)', lineHeight:1.7 }}>Thank you. We will get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)} style={{ marginTop:'16px', background:'transparent', border:'1px solid rgba(34,197,94,0.3)', color:'#22c55e', padding:'8px 20px', borderRadius:'6px', fontSize:'11px', letterSpacing:'1px', textTransform:'uppercase', cursor:'pointer' }}>Send Another</button>
              </div>
            ) : (
              <div>
                <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:'12px', marginBottom:'12px' }}>
                  <div><label style={lbl}>Full Name *</label><input style={inp} value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="Your full name" onFocus={e=>{e.target.style.borderColor='var(--accent)'}} onBlur={e=>{e.target.style.borderColor='var(--glass-border)'}}/></div>
                  <div><label style={lbl}>Company</label><input style={inp} value={form.company} onChange={e => setForm({...form, company:e.target.value})} placeholder="Company name" onFocus={e=>{e.target.style.borderColor='var(--accent)'}} onBlur={e=>{e.target.style.borderColor='var(--glass-border)'}}/></div>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:'12px', marginBottom:'12px' }}>
                  <div><label style={lbl}>Email *</label><input style={inp} type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} placeholder="your@email.com" onFocus={e=>{e.target.style.borderColor='var(--accent)'}} onBlur={e=>{e.target.style.borderColor='var(--glass-border)'}}/></div>
                  <div><label style={lbl}>Phone</label><input style={inp} value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} placeholder="+880 1XXX-XXXXXX" onFocus={e=>{e.target.style.borderColor='var(--accent)'}} onBlur={e=>{e.target.style.borderColor='var(--glass-border)'}}/></div>
                </div>
                <div style={{ marginBottom:'12px' }}>
                  <label style={lbl}>Subject</label>
                  <select style={{ ...inp, cursor:'pointer', appearance:'none' }} value={form.subject} onChange={e => setForm({...form, subject:e.target.value})} onFocus={e=>{e.target.style.borderColor='var(--accent)'}} onBlur={e=>{e.target.style.borderColor='var(--glass-border)'}}>
                    {['Product Inquiry','Get a Quote','Technical Support','Partnership','Other'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom:'16px' }}>
                  <label style={lbl}>Message *</label>
                  <textarea style={{ ...inp, resize:'vertical', minHeight:'140px' }} value={form.message} onChange={e => setForm({...form, message:e.target.value})} placeholder="Tell us about your requirement..." onFocus={e=>{e.target.style.borderColor='var(--accent)'}} onBlur={e=>{e.target.style.borderColor='var(--glass-border)'}}/>
                </div>
                <button onClick={() => setSent(true)} style={{ width:'100%', background:'var(--accent)', color:'#fff', border:'none', padding:'13px', borderRadius:'8px', fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', fontWeight:700, cursor:'pointer' }}>
                  Send Message →
                </button>
              </div>
            )}
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:'10px', position:isMobile?'relative':'sticky', top:'100px' }}>
            <div style={{ padding:'16px', background:'rgba(227,24,45,0.05)', border:'1px solid rgba(227,24,45,0.15)', borderRadius:'10px' }}>
              <div style={{ fontSize:'9px', letterSpacing:'2px', color:'var(--accent)', textTransform:'uppercase', marginBottom:'6px' }}>Response Time</div>
              <div style={{ fontSize:'14px', fontWeight:700 }}>Within 24 Hours</div>
              <div style={{ fontSize:'11px', color:'var(--subtext)', marginTop:'2px' }}>Business days only</div>
            </div>
            {[{label:'Head Office',value:'Chawk Bazar, Dhaka-1211',sub:'Bangladesh'},{label:'Working Hours',value:'Sun – Thu',sub:'9:00 AM – 6:00 PM'},{label:'General Email',value:'info@anwarispat.com',sub:'For all inquiries'}].map((item,i) => (
              <div key={i} style={{ padding:'16px', background:'var(--glass)', border:'1px solid var(--glass-border)', borderRadius:'10px' }}>
                <div style={{ fontSize:'9px', letterSpacing:'2px', color:'var(--subtext)', textTransform:'uppercase', marginBottom:'6px' }}>{item.label}</div>
                <div style={{ fontSize:'13px', fontWeight:600 }}>{item.value}</div>
                <div style={{ fontSize:'11px', color:'var(--subtext)', marginTop:'2px' }}>{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFormPage;
