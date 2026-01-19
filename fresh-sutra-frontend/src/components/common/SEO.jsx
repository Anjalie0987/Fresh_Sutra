import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const SEO = ({
    title,
    description,
    keywords,
    image,
    url,
    type = 'website'
}) => {
    const siteTitle = 'Fresh Sutra';
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const siteUrl = window.location.origin;
    const currentUrl = url || window.location.href;
    const defaultImage = `${siteUrl}/share-image.jpg`; // Placeholder

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content="Fresh Sutra" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="canonical" href={currentUrl} />
            <meta name="robots" content="index, follow" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image || defaultImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={currentUrl} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image || defaultImage} />
        </Helmet>
    );
};

SEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.string,
    image: PropTypes.string,
    url: PropTypes.string,
    type: PropTypes.string,
};

SEO.defaultProps = {
    description: 'Fresh Sutra - Fresh juice delivery and healthy lifestyle.',
    keywords: 'fresh juice near me, fresh juice delivery, juice stores nearby, cold pressed juice, healthy juice brands, Fresh Sutra',
};

export default SEO;
