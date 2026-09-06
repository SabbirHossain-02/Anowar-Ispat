import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { useContent } from '../lib/content';

// মেনুর নামগুলো অ্যাডমিন প্যানেল থেকে বদলানো যায়। প্রতিটি ঘরের প্রথম
// লাইন উপরের নাম, তার নিচের লাইনগুলো ড্রপ-ডাউন — ক্রম অনুযায়ী বসে।
// ঠিকানাগুলো কোডেই থাকে, নইলে একটা বানান ভুলে পাতা হারিয়ে যেত।
const NAV_DEFAULTS = {
    menu: {
        about: ['About Us', 'Vision, Mission & Values', 'Leadership Team', 'Heritage'],
        products: ['Products', 'Our Product Range', 'Product Specifications', 'Certifications', 'Download Catalog / Request Quote'],
        sustainability: ['Sustainability', 'Environmental, Social, Governance', 'CSR Activities'],
        landmarks: ['Landmarks', 'Project Gallery'],
        media: ['Media Center', 'News & Articles', 'Press Releases', 'Event Gallery'],
        careers: ['Careers', 'Open Positions', 'Employee Experience'],
        contact: ['Contact Us', 'Contact Form', 'Office Locations', 'Hotline / Email', 'Google Map'],
    },
    quoteBtn: 'GET QUOTE',
};

const Navbar = ({ onOpenContact, onNavigate }) => {
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLightMode, setIsLightMode] = useState(true);
    const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);

    const c = useContent('navbar', NAV_DEFAULTS);
    // লাইনটা মুছে ফেললে বা কম লাইন থাকলে কোডের নামটাই ফিরে আসে
    const L = (k, i) => {
        const list = c.menu && c.menu[k];
        const fallback = NAV_DEFAULTS.menu[k][i];
        return (Array.isArray(list) && list[i]) || fallback;
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('themeMode');
        if (savedTheme === 'dark') {
            setIsLightMode(false);
            document.body.classList.remove('light-mode');
        } else {
            setIsLightMode(true);
            document.body.classList.add('light-mode');
        }
    }, []);

    const toggleTheme = () => {
        const newMode = !isLightMode;
        setIsLightMode(newMode);
        document.body.classList.toggle('light-mode', newMode);
        localStorage.setItem('themeMode', newMode ? 'light' : 'dark');
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        {
            name: L('about', 0),
            page: 'about',
            hash: '',
            dropdown: [
                { name: L('about', 1), page: 'about/vision', hash: '' },
                { name: L('about', 2), page: 'about/leadership', hash: '' },
                { name: L('about', 3), page: 'about/heritage', hash: '' }
            ]
        },
        {
            name: L('products', 0),
            page: 'products',
            hash: '',
            dropdown: [
                { name: L('products', 1), page: 'products/range', hash: '' },
                { name: L('products', 2), page: 'products/specifications', hash: '' },
                { name: L('products', 3), page: 'products/certifications', hash: '' },
                { name: L('products', 4), type: 'quote' }
            ]
        },
        {
            name: L('sustainability', 0),
            page: 'sustainability/esg',
            hash: '',
            dropdown: [
                { name: L('sustainability', 1), page: 'sustainability/esg', hash: '' },
                { name: L('sustainability', 2), page: 'sustainability/csr', hash: '' }
            ]
        },
        {
            name: L('landmarks', 0),
            page: 'projects',
            hash: '',
            dropdown: [
                { name: L('landmarks', 1), page: 'projects', hash: '' }
            ]
        },
        {
            name: L('media', 0),
            page: 'media/news',
            hash: '',
            dropdown: [
                { name: L('media', 1), page: 'media/news', hash: '' },
                { name: L('media', 2), page: 'media/press', hash: '' },
                { name: L('media', 3), page: 'media/events', hash: '' }
            ]
        },
        {
            name: L('careers', 0),
            page: 'careers/positions',
            hash: '',
            dropdown: [
                { name: L('careers', 1), page: 'careers/positions', hash: '' },
                { name: L('careers', 2), page: 'careers/experience', hash: '' }
            ]
        },
        {
            name: L('contact', 0),
            page: 'contact',
            hash: '',
            isContact: true,
            dropdown: [
                { name: L('contact', 1), page: 'contact/form', hash: '' },
                { name: L('contact', 2), page: 'contact/locations', hash: '' },
                { name: L('contact', 3), page: 'contact/hotline', hash: '' },
                { name: L('contact', 4), page: 'contact/map', hash: '' }
            ]
        }
    ];

    const handleNavClick = (e, link) => {
        e.preventDefault();
        if (onNavigate) {
            onNavigate(link.page, link.hash);
        } else {
            if (link.hash) {
                const element = document.querySelector(link.hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
        setMobileMenuOpen(false);
    };

    return (
        <>
            <nav className={`navbar ${scrolled ? 'nav-scrolled' : ''}`}>
                <div className="nav-container">
                    {/* Logo */}
                    <div className="nav-logo">
                        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('home'); }}>
                            <img src="/logo-badge.jpeg" alt="Anwar Ispat Logo" width="150" height="40" style={{ height: 'clamp(30px, 5vw, 50px)', width: 'auto', objectFit: 'contain', borderRadius: '6px' }} />
                        </a>
                    </div>

                    {/* Desktop Links */}
                    <div className="nav-links">
                        {navLinks.filter(link => !link.isContact).map((link) => (
                            <div key={link.name} className="nav-item">
                                <a
                                    href={link.page ? `/${link.page}` : (link.hash || '#')}
                                    className="nav-link"
                                    onClick={(e) => handleNavClick(e, link)}
                                >
                                    {link.name}
                                    {link.dropdown && <ChevronDown size={12} className="dropdown-caret" />}
                                </a>
                                {link.dropdown && (
                                    <div className="dropdown-menu">
                                        {link.dropdown.map((subItem) => (
                                            <a
                                                key={subItem.name}
                                                href={subItem.page ? `/${subItem.page}` : (subItem.hash || '#')}
                                                className="dropdown-item"
                                                onClick={(e) => {
                                                    if (subItem.type === 'quote') {
                                                        e.preventDefault();
                                                        window.dispatchEvent(new CustomEvent('open-quote'));
                                                    } else if (subItem.type === 'contact') {
                                                        e.preventDefault();
                                                        onOpenContact();
                                                    } else {
                                                        handleNavClick(e, subItem);
                                                    }
                                                }}
                                            >
                                                {subItem.name}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Right Side Tools */}
                    <div className="nav-tools">
                        <button
                            className="icon-btn"
                            onClick={toggleTheme}
                            aria-label="Toggle Theme"
                        >
                            {isLightMode ? <Moon size={20} /> : <Sun size={20} />}
                        </button>

                        <div className={`search-container ${searchOpen ? 'open' : ''}`}>
                            <button
                                className="icon-btn"
                                onClick={() => setSearchOpen(!searchOpen)}
                                aria-label="Toggle Search"
                            >
                                <Search size={20} />
                            </button>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search..."
                                style={{
                                    width: searchOpen ? (window.innerWidth < 400 ? '100px' : '150px') : '0',
                                    opacity: searchOpen ? 1 : 0,
                                    pointerEvents: searchOpen ? 'all' : 'none'
                                }}
                            />
                        </div>

                        {navLinks.filter(link => link.isContact).map((link) => (
                            <div key={link.name} className="nav-item contact-dropdown-wrapper">
                                <button className="nav-contact-btn" style={{ cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    CONTACT <ChevronDown size={12} className="dropdown-caret" style={{ color: '#fff' }} />
                                </button>
                                <div className="dropdown-menu contact-dropdown-menu">
                                    {link.dropdown.map((subItem) => (
                                        <a
                                            key={subItem.name}
                                            href={subItem.hash || '#'}
                                            className="dropdown-item"
                                            onClick={(e) => {
                                                handleNavClick(e, subItem);
                                            }}
                                        >
                                            {subItem.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Mobile Toggle */}
                        <button
                            className="mobile-toggle icon-btn"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle Menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-links">
                    {navLinks.map((link) => {
                        const hasDropdown = !!link.dropdown;
                        const isOpen = activeMobileDropdown === link.name;

                        return (
                            <div key={link.name} className="mobile-nav-item">
                                <a
                                    href={link.hash || '#'}
                                    className="mobile-link"
                                    onClick={(e) => {
                                        if (hasDropdown) {
                                            e.preventDefault();
                                            setActiveMobileDropdown(isOpen ? null : link.name);
                                        } else {
                                            handleNavClick(e, link);
                                        }
                                    }}
                                >
                                    {link.name}
                                    {hasDropdown && <ChevronDown size={16} className="dropdown-caret" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease', marginLeft: '6px' }} />}
                                </a>
                                {hasDropdown && (
                                    <div className="mobile-dropdown-menu" style={{
                                        maxHeight: isOpen ? '250px' : '0',
                                        opacity: isOpen ? 1 : 0,
                                        overflow: 'hidden',
                                        transition: 'all 0.3s ease-in-out',
                                        paddingLeft: '1rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.75rem',
                                        marginTop: isOpen ? '0.5rem' : '0',
                                        marginBottom: isOpen ? '0.5rem' : '0',
                                        alignItems: 'center'
                                    }}>
                                        {link.dropdown.map((subItem) => (
                                            <a
                                                key={subItem.name}
                                                href={subItem.hash || '#'}
                                                className="mobile-dropdown-link"
                                                onClick={(e) => {
                                                    if (subItem.type === 'quote') {
                                                        e.preventDefault();
                                                        window.dispatchEvent(new CustomEvent('open-quote'));
                                                        setMobileMenuOpen(false);
                                                    } else if (subItem.type === 'contact') {
                                                        e.preventDefault();
                                                        onOpenContact();
                                                        setMobileMenuOpen(false);
                                                    } else {
                                                        handleNavClick(e, subItem);
                                                    }
                                                }}
                                                style={{
                                                    color: 'var(--subtext)',
                                                    textDecoration: 'none',
                                                    fontSize: '0.9rem',
                                                    textTransform: 'uppercase',
                                                    fontFamily: 'var(--font-main)',
                                                    letterSpacing: '0.1em'
                                                }}
                                            >
                                                {subItem.name}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    <div style={{ marginTop: '2rem' }}>
                        <a
                            href="#contact"
                            className="nav-contact-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                onOpenContact();
                                setMobileMenuOpen(false);
                            }}
                            style={{ display: 'inline-block' }}
                        >
                            CONTACT
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
