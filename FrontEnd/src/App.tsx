import { FC, lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout components
import Navbar from '@components/layout/Navbar';
import Footer from '@components/layout/Footer';
import FloatingButtons from '@components/layout/FloatingButtons';
import Loader from '@components/common/Loader';

// Lazy load pages for better performance
const Home = lazy(() => import('@pages/Home'));
const Materials = lazy(() => import('@pages/Materials'));
const Team = lazy(() => import('@pages/Team'));
const FAQ = lazy(() => import('@pages/FAQ'));
const Portfolio = lazy(() => import('@pages/Portfolio'));
const Calculator = lazy(() => import('@pages/Calculator'));
const Blog = lazy(() => import('@pages/Blog'));
const NotFound = lazy(() => import('@pages/NotFound'));

const App: FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow">
          <Suspense fallback={<Loader fullScreen />}>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/materials" element={<Materials />} />
                <Route path="/team" element={<Team />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Contact Buttons */}
        <FloatingButtons />
      </div>
    </Router>
  );
};

export default App;
