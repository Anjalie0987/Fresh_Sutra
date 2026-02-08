import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

const AdSlot = ({ variant = 'banner', className }) => {
    const adRef = useRef(null);
    const [hideAd, setHideAd] = useState(false);

    // Standardized Variant Mapping
    // banner  -> Homepage, Footer, Wide sections (Display)
    // listing -> Store Lists, In-feed (In-feed)
    // inline  -> Store Details, Sidebar (Multiplex/Auto)

    const getAdAttributes = () => {
        switch (variant) {
            case 'banner':
                return {
                    slot: "1234567890", // TODO: Real Banner ID
                    format: "auto",
                    label: "Advertisement"
                };
            case 'listing':
                return {
                    slot: "1234567891", // TODO: Real In-Feed ID
                    format: "fluid", // Listing ads are usually fluid/in-feed
                    label: "Sponsored Store"
                };
            case 'inline':
                return {
                    slot: "1234567892", // TODO: Real Inline ID
                    format: "rectangle",
                    label: "Sponsored"
                };
            default: // Fallback to banner
                return {
                    slot: "1234567890",
                    format: "auto",
                    label: "Sponsored"
                };
        }
    };

    const { slot, format, label } = getAdAttributes();

    useEffect(() => {
        // Guard 1: Safety check for window object
        if (!window.adsbygoogle) {
            // "Ads must fail silently if blocked". We return cleanly.
            // This prevents duplicate script injection handling issues if the global script failed.
            return;
        }

        // Guard 2: Prevent duplicate pushes using local ref flag
        // This is safer than checking data-adsbygoogle-status which is managed by the script itself
        if (adRef.current && !adRef.current.dataset.loaded) {
            try {
                adRef.current.dataset.loaded = "true"; // Mark as handled
                window.adsbygoogle.push({});
            } catch (e) {
                console.warn("AdSense silent catch:", e);
                setHideAd(true); // Hide container on error
            }
        }
    }, []);

    if (hideAd) return null;

    return (
        <div className={classNames("flex justify-center items-center my-6 overflow-hidden w-full", className)}>
            <div className="text-center w-full">
                {/* Consistent Label */}
                <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2 text-center">
                    {label}
                </div>

                {/* Real Ad Unit */}
                <ins
                    ref={adRef}
                    className="adsbygoogle block"
                    style={{ display: 'block', width: '100%' }} // Replaced minWidth with width: 100% for mobile
                    data-ad-client="ca-pub-XXXXXXXXXXXXXXX" // TODO: Replace with Real Publisher ID
                    data-ad-slot={slot}
                    data-ad-format={format}
                    data-full-width-responsive="true"
                ></ins>
            </div>
        </div>
    );
};

export default AdSlot;
