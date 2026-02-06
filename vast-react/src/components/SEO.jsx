import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, type = 'website', image, schema }) => {
    const siteTitle = "Vast Creative Studios";
    const siteUrl = "https://vastcreativestudios.com";
    const defaultImage = "/og-image.jpg";

    const metaTitle = title ? `${title} | ${siteTitle}` : "Vast Creative Studios | Top Marketing & Web Development Agency in Jabalpur, MP";
    const metaDescription = description || "Premier marketing and promoting agency in Jabalpur, Madhya Pradesh. Specialists in social media marketing, web development, video production, and branding.";
    const metaKeywords = keywords || "Marketing Agency Jabalpur, Digital Marketing Madhya Pradesh, Web Development, Social Media Marketing, Vast Creative Studios, Video Production, Branding Agency Jabalpur, SEO Services MP";
    const metaImage = image ? `${siteUrl}${image}` : `${siteUrl}${defaultImage}`;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <meta name="author" content={siteTitle} />
            <meta name="robots" content="index, follow" />
            <meta name="language" content="English" />

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={siteUrl} />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />

            {/* JSON-LD Structured Data */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
