import React, { useEffect, useRef, useState } from 'react';
import { X, MapPin, Phone, Mail } from 'lucide-react';
import gsap from 'gsap';
import { useContent } from '../lib/content';

// অ্যাডমিন কিছু না বদলালে এগুলোই দেখা যায়
const DEFAULTS = {
    title: 'Contact',
    accent: 'Anwar Ispat',
    sub: 'Tell us what you need and the right desk will answer.',
    addrLabel: 'HEAD OFFICE',
    addr: 'Baitul Hossain Building (12th Floor), 27 Dilkusha Commercial Area, Dhaka - 1000, Bangladesh',
    phoneLabel: 'TELEPHONE',
    phone: '+880 2223 384037',
    mailLabel: 'EMAIL',
    mail: 'mail@anwargroup.net',
    fName: 'NAME',
    fEmail: 'EMAIL',
    fSubject: 'SUBJECT',
    fMessage: 'MESSAGE',
    submit: 'SEND MESSAGE',
    ok: 'Thank you — your message has reached us. We will reply shortly.',
    failed: 'The message could not be sent. Please try again.',
};

const ContactModal = ({ isOpen, onClose }) => {
    const modalRef = useRef(null);
    const contentRef = useRef(null);
    const gridLinesRef = useRef([]);
    const textStaggerRef = useRef([]);

    const c = useContent('contact-modal', DEFAULTS);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState(null); // 'ok' | 'error' | null

    const addToRefs = (el, refArray) => {
        if (el && !refArray.current.includes(el)) {
            refArray.current.push(el);
        }
    };

    // মূল অ্যানিমেশন আগের মতোই — কেবল খোলার সময় আগের বার্তাটি মোছা হয়
    useEffect(() => {
        if (!modalRef.current) return;

        if (isOpen) {
            setStatus(null);

            gsap.set(modalRef.current, { display: 'flex' });
            gsap.set(contentRef.current, { y: -50, opacity: 0 });
            gsap.set(gridLinesRef.current, { scaleX: 0, scaleY: 0 });
            gsap.set(textStaggerRef.current, { opacity: 0, y: 20 });

            const tl = gsap.timeline();

            tl.to(modalRef.current, { background: 'rgba(11, 11, 11, 0.95)', backdropFilter: 'blur(20px)', duration: 0.5, ease: 'power2.out' })
                .to(contentRef.current, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.3');

            tl.to(gridLinesRef.current, {
                scaleX: 1,
                scaleY: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power4.inOut',
                transformOrigin: 'left top'
            }, '-=0.2');

            tl.to(textStaggerRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.05,
                ease: 'back.out(1.2)'
            }, '-=0.3');

        } else {
            gsap.to(modalRef.current, {
                background: 'transparent',
                backdropFilter: 'blur(0px)',
                duration: 0.4,
                ease: 'power2.in',
                onComplete: () => {
                    gsap.set(modalRef.current, { display: 'none' });
                }
            });
            gsap.to(contentRef.current, { y: -50, opacity: 0, duration: 0.3, ease: 'power2.in' });
            gsap.to(gridLinesRef.current, { scaleX: 0, scaleY: 0, duration: 0.2 });
            gsap.to(textStaggerRef.current, { opacity: 0, duration: 0.2 });
        }
    }, [isOpen]);

    // পাঠানোর আগে ছিল শুধু preventDefault — বার্তা কোথাও যেত না।
    // এখন সেটি অ্যাডমিন প্যানেলের Messages এ জমা হয়।
    const send = async (e) => {
        e.preventDefault();
        if (!name.trim() || !email.trim()) { setStatus('error'); return; }
        setSending(true);
        setStatus(null);
        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, subject, body, source: 'modal' }),
            });
            if (!res.ok) throw new Error('failed');
            setStatus('ok');
            setName(''); setEmail(''); setSubject(''); setBody('');
        } catch {
            setStatus('error');
        } finally {
            setSending(false);
        }
    };

    return (
        <div ref={modalRef} className="contact-modal" data-lenis-prevent="true">
            <button onClick={onClose} className="close-modal-btn">
                <X size={32} />
            </button>

            <div ref={contentRef} className="contact-content-wrapper">
                <div className="contact-header" ref={(el) => addToRefs(el, textStaggerRef)}>
                    <h2 className="tech-heading">{c.title} <span className="accent-text">{c.accent}</span></h2>
                    <p className="tech-subheading">{c.sub}</p>
                </div>

                <div className="contact-grid">
                    <div className="grid-line h-line" ref={(el) => addToRefs(el, gridLinesRef)}></div>
                    <div className="grid-line h-line bottom" ref={(el) => addToRefs(el, gridLinesRef)}></div>
                    <div className="grid-line v-line left" ref={(el) => addToRefs(el, gridLinesRef)}></div>
                    <div className="grid-line v-line center" ref={(el) => addToRefs(el, gridLinesRef)}></div>
                    <div className="grid-line v-line right" ref={(el) => addToRefs(el, gridLinesRef)}></div>

                    {/* বাঁ দিক: যোগাযোগ */}
                    <div className="contact-cell info-cell">
                        <div className="info-item" ref={(el) => addToRefs(el, textStaggerRef)}>
                            <MapPin className="info-icon" />
                            <div>
                                <h4 className="label">{c.addrLabel}</h4>
                                <p>{c.addr}</p>
                            </div>
                        </div>

                        <div className="info-item" ref={(el) => addToRefs(el, textStaggerRef)}>
                            <Phone className="info-icon" />
                            <div>
                                <h4 className="label">{c.phoneLabel}</h4>
                                <p><a href={'tel:' + String(c.phone).replace(/[^0-9+]/g, '')}>{c.phone}</a></p>
                            </div>
                        </div>

                        <div className="info-item" ref={(el) => addToRefs(el, textStaggerRef)}>
                            <Mail className="info-icon" />
                            <div>
                                <h4 className="label">{c.mailLabel}</h4>
                                <p><a href={'mailto:' + c.mail}>{c.mail}</a></p>
                            </div>
                        </div>
                    </div>

                    {/* ডান দিক: ফর্ম */}
                    <div className="contact-cell form-cell">
                        <form className="command-form" onSubmit={send}>
                            <div className="input-group" ref={(el) => addToRefs(el, textStaggerRef)}>
                                <label>{c.fName}</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>

                            <div className="input-group" ref={(el) => addToRefs(el, textStaggerRef)}>
                                <label>{c.fEmail}</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>

                            <div className="input-group" ref={(el) => addToRefs(el, textStaggerRef)}>
                                <label>{c.fSubject}</label>
                                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
                            </div>

                            <div className="input-group" ref={(el) => addToRefs(el, textStaggerRef)}>
                                <label>{c.fMessage}</label>
                                <textarea rows="4" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                            </div>

                            {status === 'ok' && (
                                <p style={{ color: '#22c55e', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '0.9rem' }}>
                                    {c.ok}
                                </p>
                            )}
                            {status === 'error' && (
                                <p style={{ color: 'var(--accent)', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '0.9rem' }}>
                                    {c.failed}
                                </p>
                            )}

                            <button
                                type="submit"
                                className="command-submit-btn"
                                disabled={sending}
                                ref={(el) => addToRefs(el, textStaggerRef)}
                            >
                                <span className="btn-text">{sending ? 'SENDING…' : c.submit}</span>
                                <span className="shine"></span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactModal;
