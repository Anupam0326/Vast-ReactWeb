import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Expertise from './components/Expertise';
import Roadmap from './components/Roadmap';
import Footer from './components/Footer';

import Prism from './components/Prism';

function App() {
  return (
    <div className="min-h-screen bg-bg text-text selection:bg-highlight selection:text-bg overflow-x-hidden relative">
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
