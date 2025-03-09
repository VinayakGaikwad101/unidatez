import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, name = 'UniDatez', type = 'website', canonical }) => {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='robots' content='index, follow' />
      {canonical && <link rel='canonical' href={canonical} />}
      
      {/* OpenGraph tags */}
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content={type} />
      <meta property='og:site_name' content={name} />
      {canonical && <meta property='og:url' content={canonical} />}
      
      {/* Twitter Card tags */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
    </Helmet>
  );
};

export default SEO;
