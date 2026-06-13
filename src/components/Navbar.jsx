import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';

const Navbar = ({ onOpenContact, onNavigate }) => {
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLightMode, setIsLightMode] = useState(true);
    const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);

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
        { name: 'Home', page: 'home', hash: '' },
        {
            name: 'About Us',
            page: 'about',
            hash: '',
            dropdown: [
                { name: 'Vision, Mission & Values', page: 'about', hash: '' },
                { name: 'Leadership Team', page: 'about', hash: '#leadership' },
                { name: 'Awards & Recognition', page: 'about', hash: '#awards' }
            ]
        },
        {
            name: 'Products',
            page: 'products',
            hash: '',
            dropdown: [
                { name: 'Technical Specifications', page: 'products', hash: '' },
                { name: 'Download Catalog / Request Quote', type: 'quote' },
                { name: 'Certifications', page: 'home', hash: '#why-choose-us' }
            ]
        },
        {
            name: 'Sustainability',
            page: 'home',
            hash: '#sustainability',
            dropdown: [
                { name: 'Environmental, Social, Governance', page: 'home', hash: '#why-choose-us' },
                { name: 'CSR Activities', page: 'home', hash: '#why-choose-us' }
            ]
        },
        {
            name: 'Projects & Portfolio',
            page: 'projects',
            hash: '',
            dropdown: [
                { name: 'Project Gallery', page: 'projects', hash: '' }
            ]
        },
        {
            name: 'Media Center',
            page: 'home',
            hash: '#media-events',
            dropdown: [
                { name: 'News & Articles', page: 'home', hash: '#blog' },
                { name: 'Press Releases', page: 'home', hash: '#media-events' },
                { name: 'Event Gallery', page: 'home', hash: '#media-events' }
            ]
        },
        {
            name: 'Careers',
            page: 'home',
            hash: '#careers',
            dropdown: [
                { name: 'Open Positions', page: 'home', hash: '#why-choose-us' },
                { name: 'Employee Experience', page: 'home', hash: '#why-choose-us' }
            ]
        },
        {
            name: 'Contact Us',
            page: 'home',
            hash: '#contact',
            dropdown: [
                { name: 'Contact Form', type: 'contact' },
                { name: 'Office Locations', type: 'contact' },
                { name: 'Hotline / Email', type: 'contact' },
                { name: 'Google Map', type: 'contact' }
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
                            <img src="/Logo.png" alt="Anwar Ispat Logo" width="150" height="40" style={{ height: 'clamp(30px, 5vw, 50px)', width: 'auto', objectFit: 'contain' }} />
                        </a>
                    </div>

                    {/* Desktop Links */}
                    <div className="nav-links">
                        {navLinks.filter(link => !link.isContact).map((link) => (
                            <div key={link.name} className="nav-item">
                                <a
                                    href={link.hash || '#'}
                                    className="nav-link"
                                    onClick={(e) => {
                                        if (link.dropdown) {
                                            e.preventDefault();
                                        } else {
                                            handleNavClick(e, link);
                                        }
                                    }}
                                >
                                    {link.name}
                                    {link.dropdown && <ChevronDown size={12} className="dropdown-caret" />}
                                </a>
                                {link.dropdown && (
                                    <div className="dropdown-menu">
                                        {link.dropdown.map((subItem) => (
                                            <a
                                                key={subItem.name}
                                                href={subItem.hash || '#'}
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
                                                e.preventDefault();
                                                if (subItem.type === 'contact') {
                                                    onOpenContact();
                                                }
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
