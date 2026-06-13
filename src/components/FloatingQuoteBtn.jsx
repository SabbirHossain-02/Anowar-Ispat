import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';

const FloatingQuoteBtn = () => {
    const [isVisible, setIsVisible] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const checkVisibility = () => {
            const target = document.getElementById('about-us');
            if (target) {
                const rect = target.getBoundingClientRect();
                const windowHeight = window.innerHeight || document.documentElement.clientHeight;
                
                // If the vision and leadership section is in the viewport
                if (rect.top <= windowHeight && rect.bottom >= 0) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }
            } else {
                // If section doesn't exist on this page, it should be visible
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', checkVisibility);
        window.addEventListener('resize', checkVisibility);
        
        // Initial check
        checkVisibility();

        return () => {
            window.removeEventListener('scroll', checkVisibility);
            window.removeEventListener('resize', checkVisibility);
        };
    }, [location.pathname]);

    return (
        <button
            className={`floating-quote-btn ${isVisible ? 'visible' : ''}`}
            onClick={() => window.dispatchEvent(new CustomEvent('open-quote'))}
            aria-label="Get Quote"
        >
            <MessageSquare size={20} />
            <span>GET QUOTE</span>
        </button>
    );
};

export default FloatingQuoteBtn;

