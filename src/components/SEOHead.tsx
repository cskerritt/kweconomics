import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string[];
  schema?: object;
  noIndex?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({ title, description, canonical, keywords = [], schema, noIndex }) => {
  const kw = Array.isArray(keywords) ? keywords.join(', ') : '';
  // Derive a page-specific AI JSON URL from canonical or window.location
  let aiJsonHref: string | undefined;
  try {
    const path = canonical ? new URL(canonical).pathname : (typeof window !== 'undefined' ? window.location.pathname : undefined);
    if (path !== undefined) {
      aiJsonHref = path === '/' ? '/ai/pages/index.json' : `/ai/pages${path}.json`;
    }
  } catch {
    // ignore
  }
  return (
    <>
      <Helmet>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        {noIndex && <meta name="robots" content="noindex, nofollow" />}
        {kw && <meta name="keywords" content={kw} />}
        {canonical && <link rel="canonical" href={canonical} />}
        {aiJsonHref && <link rel="alternate" type="application/json" href={aiJsonHref} />}

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {canonical && <meta property="og:url" content={canonical} />}
        <meta property="og:site_name" content="Kincaid Wolstein Economics — in association with Kincaid Wolstein VRS" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>

      {schema && (
        <script id="structured-data" type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      )}
    </>
  );
};

export default SEOHead;
