import React, { useEffect, useRef } from 'react';
import { X, MapPin, Phone, Mail } from 'lucide-react';
import gsap from 'gsap';

const ContactModal = ({ isOpen, onClose }) => {
    const modalRef = useRef(null);
    const contentRef = useRef(null);
    const gridLinesRef = useRef([]);
    const textStaggerRef = useRef([]);

    useEffect(() => {
        if (!modalRef.current) return;

        if (isOpen) {
            // Setup initial states
            gsap.set(modalRef.current, { display: 'flex' });
            gsap.set(contentRef.current, { y: -50, opacity: 0 });
            gsap.set(gridLinesRef.current, { scaleX: 0, scaleY: 0 });
            gsap.set(textStaggerRef.current, { opacity: 0, y: 20 });

            const tl = gsap.timeline();

            // 1. Drop down container
            tl.to(modalRef.current, { background: 'rgba(11, 11, 11, 0.95)', backdropFilter: 'blur(20px)', duration: 0.5, ease: 'power2.out' })
                .to(contentRef.current, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.3');

            // 2. Animate Grid Lines
            tl.to(gridLinesRef.current, {
                scaleX: 1,
                scaleY: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power4.inOut',
                transformOrigin: 'left top'
            }, '-=0.2');

            // 3. Stagger Text & Inputs
            tl.to(textStaggerRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.05,
                ease: 'back.out(1.2)'
            }, '-=0.3');

        } else {
            // Close Animation
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

    const addToRefs = (el, refArray) => {
        if (el && !refArray.current.includes(el)) {
            refArray.current.push(el);
        }
    };

    return (
        <div ref={modalRef} className="contact-modal">
            <button onClick={onClose} className="close-modal-btn">
                <X size={32} />
            </button>

            <div ref={contentRef} className="contact-content-wrapper">
                <div className="contact-header" ref={el => addToRefs(el, textStaggerRef)}>
                    <h2 className="tech-heading">COMMAND CENTER : <span className="accent-text">COMMUNICATION</span></h2>
                    <p className="tech-subheading">SECURE INQUIRY CHANNEL ACTIVE.</p>
                </div>

                <div className="contact-grid">
                    {/* Horizontal dividing lines */}
                    <div className="grid-line h-line" ref={el => addToRefs(el, gridLinesRef)}></div>
                    <div className="grid-line h-line bottom" ref={el => addToRefs(el, gridLinesRef)}></div>

                    {/* Vertical dividing lines */}
                    <div className="grid-line v-line left" ref={el => addToRefs(el, gridLinesRef)}></div>
                    <div className="grid-line v-line center" ref={el => addToRefs(el, gridLinesRef)}></div>
                    <div className="grid-line v-line right" ref={el => addToRefs(el, gridLinesRef)}></div>

                    {/* Left Column: Info */}
                    <div className="contact-cell info-cell">
                        <div className="info-item" ref={el => addToRefs(el, textStaggerRef)}>
                            <MapPin className="info-icon" />
                            <div>
                                <h4 className="label">HQ LOCATION</h4>
                                <p>Baitul Hossain Building (12th Floor)<br />27 Dilkusha Commercial Area, Dhaka - 1000, Bangladesh</p>
                            </div>
                        </div>

                        <div className="info-item" ref={el => addToRefs(el, textStaggerRef)}>
                            <Phone className="info-icon" />
                            <div>
                                <h4 className="label">DIRECT LINE</h4>
                                <p>+880 2223 384037</p>
                            </div>
                        </div>

                        <div className="info-item" ref={el => addToRefs(el, textStaggerRef)}>
                            <Mail className="info-icon" />
                            <div>
                                <h4 className="label">SECURE COMM</h4>
                                <p>mail@anwargroup.net</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="contact-cell form-cell">
                        <form className="command-form" onSubmit={(e) => e.preventDefault()}>
                            <div className="input-group" ref={el => addToRefs(el, textStaggerRef)}>
                                <label>IDENTIFICATION [NAME]</label>
                                <input type="text" placeholder="Enter full designation..." />
                            </div>

                            <div className="input-group" ref={el => addToRefs(el, textStaggerRef)}>
                                <label>RETURN POINT [EMAIL]</label>
                                <input type="email" placeholder="Enter secure address..." />
                            </div>

                            <div className="input-group" ref={el => addToRefs(el, textStaggerRef)}>
                                <label>SUBJECT MATTER [INQUIRY]</label>
                                <input type="text" placeholder="Specify objective..." />
                            </div>

                            <div className="input-group" ref={el => addToRefs(el, textStaggerRef)}>
                                <label>DATA LOG [MESSAGE]</label>
                                <textarea rows="4" placeholder="Input details here..."></textarea>
                            </div>

                            <button type="submit" className="command-submit-btn" ref={el => addToRefs(el, textStaggerRef)}>
                                <span className="btn-text">INITIALIZE TRANSMISSION</span>
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


