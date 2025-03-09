import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, name = 'UniDatez', type = 'website', canonical }) => {
  // Convert canonical URL to use www subdomain if it doesn't already
  const fullCanonical = canonical ? 
    (canonical.includes('www.') ? canonical : canonical.replace('https://', 'https://www.')) : 
    'https://www.unidatez.com';

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "UniDatez",
    "alternateName": "UniDatez - University Dating Platform",
    "url": "https://www.unidatez.com",
    "description": "UniDatez is the exclusive dating platform for university students, helping them connect and find meaningful relationships within their campus community.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.unidatez.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      "https://www.facebook.com/unidatez",
      "https://www.instagram.com/unidatez",
      "https://twitter.com/unidatez"
    ],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullCanonical
    }
  };

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='robots' content='index, follow, max-image-preview:large' />
      <meta name='keywords' content='UniDatez, university dating, student dating, campus dating, college dating platform, UniDatez app, university students, campus romance' />
      <meta name='application-name' content='UniDatez' />
      <link rel='canonical' href={fullCanonical} />
      
      {/* OpenGraph tags */}
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content={type} />
      <meta property='og:site_name' content={name} />
      <meta property='og:url' content={fullCanonical} />
      <meta property='og:locale' content='en_US' />
      <meta property='og:image' content='https://www.unidatez.com/logo.jpg' />
      
      {/* Twitter Card tags */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:site' content='@unidatez' />
      <meta name='twitter:image' content='https://www.unidatez.com/logo.jpg' />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};

export default SEO;
