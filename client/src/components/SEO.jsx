import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, name = 'UniDatez', type = 'website', canonical }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "UniDatez",
    "alternateName": "UniDatez - University Dating Platform",
    "url": "https://unidatez.com",
    "description": "UniDatez is the exclusive dating platform for university students, helping them connect and find meaningful relationships within their campus community.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://unidatez.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='robots' content='index, follow' />
      <meta name='keywords' content='UniDatez, university dating, student dating, campus dating, college dating platform, UniDatez app' />
      <meta name='application-name' content='UniDatez' />
      {canonical && <link rel='canonical' href={canonical} />}
      
      {/* OpenGraph tags */}
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content={type} />
      <meta property='og:site_name' content={name} />
      {canonical && <meta property='og:url' content={canonical} />}
      <meta property='og:locale' content='en_US' />
      
      {/* Twitter Card tags */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:site' content='@unidatez' />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};

export default SEO;
