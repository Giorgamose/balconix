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
