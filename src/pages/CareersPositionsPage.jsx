import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import PageBanner from '../components/PageBanner';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SECTION_PAD = 'clamp(2.25rem, 4vw, 3.5rem)';
const CONTAINER = {
    maxWidth: '1180px',
    margin: '0 auto',
    padding: '0 clamp(1.25rem, 5vw, 3rem)',
};

// আগের পাতায় ছয়টি নির্দিষ্ট পদ বিজ্ঞাপিত ছিল — পদ, জেলা, অভিজ্ঞতা,
// তারিখসহ। কোনোটিই সত্যি নয়, ব্যাকএন্ডে চাকরির টেবিলও নেই। তাই
// এখানে কেবল যে বিভাগগুলোতে নিয়োগ হয় সেগুলোর নাম, কোনো শূন্যপদ নয়।
const DISCIPLINES = [
    'Engineering',
    'Production',
    'Quality control',
    'Operations',
    'Sales',
    'Finance',
    'Human resources',
];

const STEPS = [
    {
        title: 'Send your CV',
        text: 'Write to careers@anwarispat.com with your CV attached and the area of work you are applying for in the subject line.',
    },
    {
        title: 'We review',
        text: 'Applications are read against current and upcoming requirements. You will hear from us if there is a fit.',
    },
    {
        title: 'Interview and offer',
        text: 'Shortlisted candidates are called for interview at the head office or the Narayanganj works, depending on the role.',
    },
];

const APPLY_TO = 'careers@anwarispat.com';

const CareersPositionsPage = () => {
    const rootRef = useRef(null);
    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    // শূন্যপদ আসে অ্যাডমিন প্যানেল থেকে। কিছু না থাকলে পাতাটি খালি
    // দেখায় না — খোলা আবেদনের আহ্বানই থেকে যায়।
    useEffect(() => {
        let cancelled = false;
        fetch('/api/jobs')
            .then((r) => (r.ok ? r.json() : []))
            .then((d) => { if (!cancelled) setJobs(Array.isArray(d) ? d : []); })
            .catch(() => { if (!cancelled) setJobs([]); })
            .finally(() => { if (!cancelled) setLoading(false); });
        return () => { cancelled = true; };
    }, []);

    useGSAP(() => {
        gsap.utils.toArray('.cr-reveal').forEach((el) => {
            gsap.from(el, {
                y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 90%' },
            });
        });
    }, { scope: rootRef, dependencies: [jobs.length, loading] });

    const mailtoFor = (title) =>
        `mailto:${APPLY_TO}?subject=${encodeURIComponent('Application: ' + title)}`;

    return (
        <div
            ref={rootRef}
            style={{ background: 'var(--primary)', color: 'var(--text)', minHeight: '100vh', overflowX: 'hidden' }}
        >
            <PageBanner
                image="/careers-banner.jpg"
                label="CAREERS"
                title="Open"
                accent="Positions"
                crumbs={[
                    { label: 'Home', to: '/' },
                    { label: 'Careers' },
                    { label: 'Open Positions' },
                ]}
            />

            {/* ---------------------------------------------------------- */}
            {/* OPENING — ডকুমেন্টের লাইনটাই মূল বক্তব্য */}
            {/* ---------------------------------------------------------- */}
            <section style={{
                minHeight: 'auto', display: 'block',
                ...CONTAINER,
                paddingTop: '30px',
                paddingBottom: `calc(${SECTION_PAD} * 1.2)`,
            }}>
                <div className="cr-open">
                    <div className="cr-reveal">
                        <span className="cr-eyebrow">CAREER OPPORTUNITIES</span>
                        <p className="cr-statement">
                            A chance for you to use your skills for future advancement.
                        </p>
                    </div>

                    <p className="cr-reveal cr-open-text">
                        Anwar Ispat has been rolling steel in Bangladesh for over four decades.
                        The mill runs on the people in it — engineers on the floor, inspectors at
                        the spectrometer, and the teams behind them.
                    </p>
                </div>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* DISCIPLINES */}
            {/* ---------------------------------------------------------- */}
            <section style={{
                minHeight: 'auto', display: 'block',
                paddingTop: SECTION_PAD, paddingBottom: SECTION_PAD,
                paddingLeft: 0, paddingRight: 0,
                background: 'var(--glass)',
            }}>
                <div style={CONTAINER}>
                    <span className="cr-reveal cr-eyebrow">WHERE WE RECRUIT</span>

                    {/* বাক্স বা কার্ড নয় — নামগুলোই বড় হরফে, একটানা */}
                    <p className="cr-reveal cr-disciplines">
                        {DISCIPLINES.map((d, i) => (
                            <span key={d}>
                                {d}
                                {i < DISCIPLINES.length - 1 && (
                                    <span className="cr-sep" aria-hidden="true">·</span>
                                )}
                            </span>
                        ))}
                    </p>
                </div>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* CURRENT VACANCIES + HOW TO APPLY */}
            {/* ---------------------------------------------------------- */}
            <section style={{
                minHeight: 'auto', display: 'block',
                ...CONTAINER,
                paddingTop: `calc(${SECTION_PAD} * 1.2)`,
                paddingBottom: `calc(${SECTION_PAD} * 1.4)`,
            }}>
                {/* শূন্যপদ থাকলে সেগুলোই আগে, নইলে খোলা আবেদনের কথা */}
                {jobs.length > 0 && (
                    <div className="cr-vacancies">
                        <span className="cr-reveal cr-eyebrow">
                            CURRENT VACANCIES — {String(jobs.length).padStart(2, '0')}
                        </span>

                        {jobs.map((j) => (
                            <article key={j.id} className="cr-reveal cr-job">
                                <div className="cr-job-head">
                                    <h2 className="cr-job-title">{j.title}</h2>
                                    <a className="cr-job-apply" href={mailtoFor(j.title)}>
                                        Apply <ArrowRight size={14} strokeWidth={2.2} />
                                    </a>
                                </div>

                                <p className="cr-job-tags">
                                    {[j.department, j.location, j.employment_type]
                                        .filter(Boolean)
                                        .map((t, i, arr) => (
                                            <span key={t}>
                                                {t}
                                                {i < arr.length - 1 && (
                                                    <span className="cr-sep" aria-hidden="true">·</span>
                                                )}
                                            </span>
                                        ))}
                                </p>

                                {j.description && <p className="cr-job-text">{j.description}</p>}

                                {(j.experience || j.education || j.deadline) && (
                                    <dl className="cr-job-facts">
                                        {j.experience && (
                                            <div><dt>Experience</dt><dd>{j.experience}</dd></div>
                                        )}
                                        {j.education && (
                                            <div><dt>Education</dt><dd>{j.education}</dd></div>
                                        )}
                                        {j.deadline && (
                                            <div><dt>Apply by</dt><dd>{j.deadline}</dd></div>
                                        )}
                                    </dl>
                                )}
                            </article>
                        ))}
                    </div>
                )}

                <div className="cr-apply">
                    <div className="cr-reveal cr-apply-lead">
                        <span className="cr-eyebrow">
                            {jobs.length > 0 ? 'OPEN APPLICATIONS' : 'CURRENT VACANCIES'}
                        </span>
                        <h2 className="cr-apply-title">
                            {jobs.length > 0
                                ? 'Nothing above a fit? Write to us anyway'
                                : 'Specific openings are posted here as they arise'}
                        </h2>
                        <p className="cr-apply-text">
                            {loading
                                ? 'Checking for current vacancies…'
                                : 'We accept open applications year-round. If your experience fits one of the areas above, send it to us and it will be held against upcoming requirements.'}
                        </p>

                        <a className="cr-cta" href={`mailto:${APPLY_TO}`}>
                            <Mail size={16} strokeWidth={2} />
                            {APPLY_TO}
                        </a>
                    </div>

                    <ol className="cr-reveal cr-steps">
                        {STEPS.map((s, i) => (
                            <li key={s.title}>
                                <span className="cr-step-n">{String(i + 1).padStart(2, '0')}</span>
                                <div>
                                    <h3 className="cr-step-title">{s.title}</h3>
                                    <p className="cr-step-text">{s.text}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>

                <button type="button" className="cr-reveal cr-next" onClick={() => navigate('/careers/experience')}>
                    What it is like to work here
                    <ArrowRight size={15} strokeWidth={2.2} />
                </button>
            </section>
        </div>
    );
};

export default CareersPositionsPage;
