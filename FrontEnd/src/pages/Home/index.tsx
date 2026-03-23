import { FC } from 'react';
import { motion } from 'framer-motion';
import Hero from '@components/sections/Hero';
import TrustBlock from '@components/sections/TrustBlock';
import Products from '@components/sections/Products';
import Gallery from '@components/sections/Gallery';
import HowItWorks from '@components/sections/HowItWorks';
import About from '@components/sections/About';
import QuickContact from '@components/sections/QuickContact';
import Testimonials from '@components/sections/Testimonials';
import FinalCTA from '@components/sections/FinalCTA';

const Home: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero Section */}
      <Hero />

      {/* Trust Indicators */}
      <TrustBlock />

      {/* Products Section */}
      <Products />

      {/* Gallery Section */}
      <Gallery />

      {/* How It Works */}
      <HowItWorks />

      {/* About Section */}
      <About />

      {/* Quick Contact Form */}
      <QuickContact />

      {/* Testimonials */}
      <Testimonials />

      {/* Final CTA */}
      <FinalCTA />
    </motion.div>
  );
};

export default Home;
