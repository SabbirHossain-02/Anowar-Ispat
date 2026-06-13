import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';

const QuoteModal = ({ isOpen, onClose }) => {
    const modalRef = useRef(null);
    const contentRef = useRef(null);
    const gridLinesRef = useRef([]);
    const textStaggerRef = useRef([]);

    const [selectedProduct, setSelectedProduct] = useState("Anwars 500CWR");
    const [sizeMM, setSizeMM] = useState("");
    const [quantityTon, setQuantityTon] = useState("");
    const [quantityPcs, setQuantityPcs] = useState("");
    const [additionalProducts, setAdditionalProducts] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [policeStation, setPoliceStation] = useState("");
    const [district, setDistrict] = useState("");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

    useEffect(() => {
        if (!modalRef.current) return;
        if (isOpen) {
            window.dispatchEvent(new CustomEvent('lenis-stop'));
            gsap.set(modalRef.current, { display: 'flex' });
            gsap.set(contentRef.current, { y: -50, opacity: 0 });
            gsap.set(gridLinesRef.current, { scaleX: 0, scaleY: 0 });
            gsap.set(textStaggerRef.current, { opacity: 0, y: 20 });
            const tl = gsap.timeline();
            tl.to(modalRef.current, { background: 'rgba(11,11,11,0.95)', backdropFilter: 'blur(20px)', duration: 0.5, ease: 'power2.out' })
              .to(contentRef.current, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.3');
            tl.to(gridLinesRef.current, { scaleX: 1, scaleY: 1, duration: 0.6, stagger: 0.1, ease: 'power4.inOut', transformOrigin: 'left top' }, '-=0.2');
            tl.to(textStaggerRef.current, { opacity: 1, y: 0, duration: 0.4, stagger: 0.03, ease: 'back.out(1.2)' }, '-=0.3');
        } else {
            window.dispatchEvent(new CustomEvent('lenis-start'));
            gsap.to(modalRef.current, {
                background: 'transparent', backdropFilter: 'blur(0px)', duration: 0.4, ease: 'power2.in',
                onComplete: () => gsap.set(modalRef.current, { display: 'none' })
            });
            gsap.to(contentRef.current, { y: -50, opacity: 0, duration: 0.3, ease: 'power2.in' });
            gsap.to(gridLinesRef.current, { scaleX: 0, scaleY: 0, duration: 0.2 });
            gsap.to(textStaggerRef.current, { opacity: 0, duration: 0.2 });
        }
    }, [isOpen]);

    const addToRefs = (el, refArray) => {
        if (el && !refArray.current.includes(el)) refArray.current.push(el);
    };

    const resetForm = () => {
        setSelectedProduct("Anwars 500CWR");
        setSizeMM(""); setQuantityTon(""); setQuantityPcs("");
        setAdditionalProducts(""); setBusinessName(""); setFullName("");
        setEmail(""); setMobile(""); setAddress("");
        setPoliceStation(""); setDistrict(""); setMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!fullName.trim() || !mobile.trim()) {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(null), 3000);
            return;
        }
        setSubmitting(true);
        setSubmitStatus(null);
        try {
            const res = await fetch('/api/quotations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    product_name: selectedProduct,
                    size_mm: sizeMM,
                    quantity_ton: quantityTon || null,
                    quantity_pcs: quantityPcs || null,
                    additional_products: additionalProducts,
                    business_name: businessName,
                    full_name: fullName,
                    email, mobile, address,
                    police_station: policeStation,
                    district, message,
                }),
            });
            if (res.ok) {
                setSubmitStatus('success');
                resetForm();
                setTimeout(() => { setSubmitStatus(null); onClose(); }, 2500);
            } else {
                setSubmitStatus('error');
                setTimeout(() => setSubmitStatus(null), 3000);
            }
        } catch {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(null), 3000);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div ref={modalRef} className="contact-modal" style={{ zIndex: 3000, overflowY: 'auto' }} data-lenis-prevent="true">
            <button onClick={onClose} className="close-modal-btn" style={{ position: 'fixed' }}>
                <X size={32} />
            </button>

            <div ref={contentRef} className="contact-content-wrapper" style={{ maxWidth: '1200px', margin: 'auto', padding: '4rem 0' }}>
                <div className="contact-header" ref={el => addToRefs(el, textStaggerRef)} style={{ marginBottom: '2rem' }}>
                    <h2 className="tech-heading" style={{ color: 'var(--text)' }}>REQUEST A <span className="accent-text">QUOTATION</span></h2>
                    <p className="tech-subheading">Submit your requirements for an exact estimation.</p>

                    {submitStatus === 'success' && (
                        <div style={{ marginTop: '1rem', padding: '1rem 2rem', background: 'rgba(0,200,100,0.12)', border: '1px solid rgba(0,200,100,0.4)', borderRadius: '8px', color: '#00cc66', fontFamily: 'monospace', letterSpacing: '0.1em', fontSize: '0.9rem' }}>
                            ✓ QUOTATION SUBMITTED SUCCESSFULLY — We will contact you shortly.
                        </div>
                    )}
                    {submitStatus === 'error' && (
                        <div style={{ marginTop: '1rem', padding: '1rem 2rem', background: 'rgba(227,24,45,0.12)', border: '1px solid rgba(227,24,45,0.4)', borderRadius: '8px', color: '#E3182D', fontFamily: 'monospace', letterSpacing: '0.1em', fontSize: '0.9rem' }}>
                            ✕ {!fullName.trim() || !mobile.trim() ? 'Full Name and Mobile Number are required.' : 'Submission failed. Please try again.'}
                        </div>
                    )}
                </div>

                <div className="contact-grid quote-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '3rem', padding: '3rem' }}>
                    <div className="grid-line h-line" ref={el => addToRefs(el, gridLinesRef)}></div>
                    <div className="grid-line h-line bottom" ref={el => addToRefs(el, gridLinesRef)}></div>
                    <div className="grid-line v-line left" ref={el => addToRefs(el, gridLinesRef)}></div>
                    <div className="grid-line v-line center" style={{ left: '50%' }} ref={el => addToRefs(el, gridLinesRef)}></div>
                    <div className="grid-line v-line right" ref={el => addToRefs(el, gridLinesRef)}></div>

                    {/* Left Column */}
                    <div className="form-cell" style={{ paddingLeft: 0 }}>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text)' }} ref={el => addToRefs(el, textStaggerRef)}>
                            01. <span className="accent-text">Product Information</span>
                        </h3>
                        <div className="command-form">
                            <div className="input-group" ref={el => addToRefs(el, textStaggerRef)}>
                                <label>PRODUCT NAME</label>
                                <select value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)}
                                    style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--subtext)', padding: '0.8rem', fontFamily: 'var(--font-main)', fontSize: '0.9rem' }}>
                                    <option value="Anwars 500CWR">Anwars 500CWR TMT Rebar</option>
                                    <option value="Anwars 500DWR">Anwars 500DWR High-Tensile</option>
                                    <option value="Anwars 420DWR">Anwars 420DWR Rebar</option>
                                    <option value="Other">Other Product</option>
                                </select>
                            </div>
                            <div className="input-group" ref={el => addToRefs(el, textStaggerRef)}>
                                <label>SIZE (MM)</label>
                                <select value={sizeMM} onChange={e => setSizeMM(e.target.value)}
                                    style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--subtext)', padding: '0.8rem', fontFamily: 'var(--font-main)', fontSize: '0.9rem' }}>
                                    <option value="">Select Size</option>
                                    {[8,10,12,16,20,22,25,28,32,40,50].map(s => <option key={s} value={s}>{s}mm</option>)}
                                </select>
                            </div>
                            <div className="form-row">
                                <div className="input-group" style={{ flex: 1 }} ref={el => addToRefs(el, textStaggerRef)}>
                                    <label>QUANTITY (TON)</label>
                                    <input type="number" placeholder="Enter Ton" value={quantityTon} onChange={e => setQuantityTon(e.target.value)} />
                                </div>
                                <div className="input-group" style={{ flex: 1 }} ref={el => addToRefs(el, textStaggerRef)}>
                                    <label>QUANTITY (PCS)</label>
                                    <input type="number" placeholder="Enter Pcs" value={quantityPcs} onChange={e => setQuantityPcs(e.target.value)} />
                                </div>
                            </div>
                            <div className="input-group" ref={el => addToRefs(el, textStaggerRef)}>
                                <label>ADDITIONAL PRODUCTS</label>
                                <textarea rows="3" placeholder="Product name, size, quantity" value={additionalProducts} onChange={e => setAdditionalProducts(e.target.value)}></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="form-cell" style={{ paddingLeft: '2rem' }}>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text)' }} ref={el => addToRefs(el, textStaggerRef)}>
                            02. <span className="accent-text">Contact Information</span>
                        </h3>
                        <div className="command-form">
                            <div className="form-row">
                                <div className="input-group" style={{ flex: 1 }} ref={el => addToRefs(el, textStaggerRef)}>
                                    <label>BUSINESS NAME</label>
                                    <input type="text" placeholder="Business Name" value={businessName} onChange={e => setBusinessName(e.target.value)} />
                                </div>
                                <div className="input-group" style={{ flex: 1 }} ref={el => addToRefs(el, textStaggerRef)}>
                                    <label>FULL NAME *</label>
                                    <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="input-group" style={{ flex: 1 }} ref={el => addToRefs(el, textStaggerRef)}>
                                    <label>EMAIL ADDRESS</label>
                                    <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div className="input-group" style={{ flex: 1 }} ref={el => addToRefs(el, textStaggerRef)}>
                                    <label>MOBILE NUMBER *</label>
                                    <input type="tel" placeholder="Enter your mobile number" value={mobile} onChange={e => setMobile(e.target.value)} />
                                </div>
                            </div>
                            <div className="input-group" ref={el => addToRefs(el, textStaggerRef)}>
                                <label>ADDRESS</label>
                                <input type="text" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
                            </div>
                            <div className="form-row">
                                <div className="input-group" style={{ flex: 1 }} ref={el => addToRefs(el, textStaggerRef)}>
                                    <label>POLICE STATION</label>
                                    <input type="text" placeholder="Enter police station" value={policeStation} onChange={e => setPoliceStation(e.target.value)} />
                                </div>
                                <div className="input-group" style={{ flex: 1 }} ref={el => addToRefs(el, textStaggerRef)}>
                                    <label>SELECT DISTRICT</label>
                                    <select value={district} onChange={e => setDistrict(e.target.value)}
                                        style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--subtext)', padding: '0.8rem', fontFamily: 'var(--font-main)', fontSize: '0.9rem' }}>
                                        <option value="">Select District</option>
                                        {["Dhaka","Chattogram","Sylhet","Rajshahi","Khulna","Barishal","Rangpur","Mymensingh"].map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="input-group" ref={el => addToRefs(el, textStaggerRef)}>
                                <label>MESSAGE</label>
                                <textarea rows="2" placeholder="Enter your message" value={message} onChange={e => setMessage(e.target.value)}></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }} ref={el => addToRefs(el, textStaggerRef)}>
                    <button className="command-submit-btn"
                        style={{ padding: '1rem 4rem', fontSize: '1rem', opacity: submitting ? 0.6 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}
                        onClick={handleSubmit} disabled={submitting}>
                        <span className="btn-text">{submitting ? 'SUBMITTING...' : 'SUBMIT QUOTATION REQUEST'}</span>
                        <span className="shine"></span>
                    </button>
                </div>
            </div>

            <style>{`
                .quote-grid option { background-color: var(--primary); color: var(--text); }
                .form-row { display: flex; gap: 1rem; }
                @media (max-width: 900px) {
                    .quote-grid { grid-template-columns: 1fr !important; padding: 1.5rem !important; }
                    .quote-grid .form-cell { padding-left: 0 !important; margin-top: 1rem; }
                    .quote-grid .v-line.center { display: none; }
                    .form-row { flex-direction: column; gap: 0; }
                }
            `}</style>
        </div>
    );
};

export default QuoteModal;


