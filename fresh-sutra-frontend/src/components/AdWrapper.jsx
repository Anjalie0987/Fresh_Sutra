import React, { useState, useEffect, useRef } from 'react';

const AdWrapper = ({ 
    children, 
    variant = 'banner', 
    fallbackHeight, 
    className, 
    label = "Sponsored" 
}) => {
    const [status, setStatus] = useState('loading'); // 'loading', 'loaded', 'failed', 'empty'
    const containerRef = useRef(null);
    const observerRef = useRef(null);
    const timeoutRef = useRef(null);

    // Map variants to default height skeletons to prevent layout shifts
    const getFallbackHeight = () => {
        if (fallbackHeight !== undefined) return fallbackHeight;
        switch (variant) {
            case 'banner':
                return 90;
            case 'listing':
                return 120;
            case 'inline':
                return 250;
            default:
                return 90;
        }
    };

    const actualFallbackHeight = getFallbackHeight();

    useEffect(() => {
        if (!containerRef.current) return;
        const insElement = containerRef.current.querySelector('ins.adsbygoogle');

        if (!insElement) {
            setStatus('failed');
            return;
        }

        // 1. Intersection Observer for Lazy Loading
        const intersectionObserver = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry && entry.isIntersecting) {
                // Initialize/load ad once it enters viewport vicinity
                loadAd();
                intersectionObserver.disconnect();
            }
        }, {
            rootMargin: '200px' // Start loading when 200px from viewport
        });

        intersectionObserver.observe(containerRef.current);

        const loadAd = () => {
            // Guard: Check if adsbygoogle script is blocked/missing
            if (!window.adsbygoogle) {
                setStatus('failed');
                return;
            }

            // 2. MutationObserver to watch Google Adsense status updates
            // Google Ads tag sets data-ad-status to 'filled' or 'unfilled'
            observerRef.current = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'data-ad-status') {
                        const adStatus = insElement.getAttribute('data-ad-status');
                        if (adStatus === 'filled') {
                            setStatus('loaded');
                            if (timeoutRef.current) clearTimeout(timeoutRef.current);
                        } else if (adStatus === 'unfilled') {
                            setStatus('empty');
                            if (timeoutRef.current) clearTimeout(timeoutRef.current);
                        }
                    }
                });
            });

            observerRef.current.observe(insElement, {
                attributes: true,
                attributeFilter: ['data-ad-status']
            });

            // Check initial state in case it is already loaded
            const initialStatus = insElement.getAttribute('data-ad-status');
            if (initialStatus === 'filled') {
                setStatus('loaded');
                return;
            } else if (initialStatus === 'unfilled') {
                setStatus('empty');
                return;
            }

            // 3. Safety timeout: if ad hasn't loaded in 4.5 seconds, check or collapse
            timeoutRef.current = setTimeout(() => {
                const currentStatus = insElement.getAttribute('data-ad-status');
                const hasIframe = insElement.querySelector('iframe');

                if (currentStatus === 'filled' || hasIframe) {
                    setStatus('loaded');
                } else if (currentStatus === 'unfilled') {
                    setStatus('empty');
                } else {
                    // Fallback to failed/empty so we hide empty space
                    setStatus('failed');
                }
            }, 4500);

            try {
                // Safely push empty object to window.adsbygoogle if not already handled
                if (!insElement.dataset.adsbygoogleStatus) {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                }
            } catch (e) {
                console.warn("Google AdSense initialization catch:", e);
                setStatus('failed');
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }
        };

        return () => {
            intersectionObserver.disconnect();
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    // Completely remove component from DOM if empty or failed to collapse space
    if (status === 'empty' || status === 'failed') {
        return null;
    }

    return (
        <div 
            ref={containerRef}
            className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${className || ''}`}
        >
            {status === 'loading' && (
                <div 
                    className="flex flex-col items-center justify-center bg-gray-50/50 border border-dashed border-gray-200 rounded-2xl w-full animate-pulse transition-opacity duration-300"
                    style={{ height: `${actualFallbackHeight}px` }}
                >
                    <div className="text-[9px] uppercase font-bold text-gray-400 tracking-wider mb-2">
                        {label}
                    </div>
                    <div className="w-1/3 h-1.5 bg-gray-200/80 rounded-full mb-1"></div>
                    <div className="w-1/4 h-1.5 bg-gray-200/80 rounded-full"></div>
                </div>
            )}
            
            {/* The Ad Container is visible only when loaded */}
            <div 
                className={`transition-opacity duration-500 ease-in ${
                    status === 'loaded' ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'
                }`}
            >
                <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2 text-center">
                    {label}
                </div>
                {children}
            </div>
        </div>
    );
};

export default AdWrapper;
