import React from 'react';
import classNames from 'classnames';
import AdWrapper from './AdWrapper';

const AdSlot = ({ variant = 'banner', className }) => {
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

    return (
        <AdWrapper
            variant={variant}
            label={label}
            className={classNames("flex justify-center items-center my-6 w-full", className)}
        >
            <ins
                className="adsbygoogle block"
                style={{ display: 'block', width: '100%' }} // Replaced minWidth with width: 100% for mobile
                data-ad-client="ca-pub-XXXXXXXXXXXXXXX" // TODO: Replace with Real Publisher ID
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive="true"
            ></ins>
        </AdWrapper>
    );
};

export default AdSlot;
