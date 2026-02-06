import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Expertise from './components/Expertise';
import Roadmap from './components/Roadmap';
import Footer from './components/Footer';
import SEO from './components/SEO';
import Prism from './components/Prism';

function App() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Vast Creative Studios",
    "url": "https://vastcreativestudios.com",
    "logo": "https://vastcreativestudios.com/assets/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+918827706855",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://www.instagram.com/vast_creative.studios",
      "https://www.linkedin.com/company/vast-creative-studios/"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jabalpur",
      "addressRegion": "Madhya Pradesh",
      "addressCountry": "IN"
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text selection:bg-highlight selection:text-bg overflow-x-hidden relative">
      <SEO
        title="Vast Creative Studios | Top Marketing & Web Development Agency in Jabalpur, MP"
        description="Premier marketing and promoting agency in Jabalpur, Madhya Pradesh. Specialists in social media marketing, web development, video production, and branding."
        keywords="Marketing Agency Jabalpur, Digital Marketing Madhya Pradesh, Web Development, Social Media Marketing, Vast Creative Studios, Video Production, Branding Agency Jabalpur"
        schema={schema}
      />
      <div className="fixed inset-0 z-[-1]">
        <Prism
          animationType="3drotate"
          timeScale={0.5}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0}
          glow={0.4}
        />
      </div>
      <Navbar />
      <main>
        <Hero />
        <Expertise />
        <Roadmap />
      </main>
      <Footer />
    </div>
  );
}

export default App;
