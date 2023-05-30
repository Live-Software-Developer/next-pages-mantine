import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import HeaderAndFooterWrapper from '../layouts/HeaderAndFooterWrapper';
import SEOHeader, { SEOHeaderProps } from '../components/seo/SEOHeader';
import { DEFAULT_APP_URL } from '../config/constants';
import { Text } from '@mantine/core';

function About() {

  const pageMeta: SEOHeaderProps = {
    title: `About Us`,
    description: "Learn about Live Software Developer Limited, our mission, values, and the services we offer.",
    keywords: " about us, Live Software Developer Limited, software development, web hosting, software development, domain registration, IT services, tech company",
    twitter_card: "summary_large_image",
    url: `${DEFAULT_APP_URL}/contact-us`,
    image: `${DEFAULT_APP_URL}/images/contactus.png`
  }

  return (
    <>
      <SEOHeader {...pageMeta} />
      <Text>
        Write about you here
      </Text>
    </>
  );
}


About.PageLayout = HeaderAndFooterWrapper

export default About