import { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useScrollPosition, useLanguage, useContactActions } from '@hooks/index';
import { NAV_ITEMS } from '@utils/constants';
import { scrollToElement } from '@utils/helpers';
import Button from '@components/common/Button';

// Icons
const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

export const Navbar: FC = () => {
  const { t } = useTranslation();
  const { isAtTop } = useScrollPosition();
  const { currentLanguage, languageNames, availableLanguages, changeLanguage } = useLanguage();
  const { handleCallPrimary } = useContactActions();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const sectionId = href.replace('#', '');
    scrollToElement(sectionId);
  };

  return (
    <>
      {/* Main Navbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isAtTop ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md shadow-soft'
        }`}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              className="flex items-center gap-2"
            >
              <span className={`text-xl md:text-2xl font-bold ${isAtTop ? 'text-white' : 'text-brand-primary'}`}>
                Balconix
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`font-medium transition-colors hover:text-brand-primary ${
                    isAtTop ? 'text-white/90 hover:text-white' : 'text-neutral-dark-gray'
                  }`}
                >
                  {t(`nav.${item.key}`)}
                </a>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    isAtTop
                      ? 'text-white hover:bg-white/10'
                      : 'text-neutral-dark-gray hover:bg-neutral-light-gray'
                  }`}
                >
                  {languageNames[currentLanguage]}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {isLangDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 py-2 w-24 bg-white rounded-xl shadow-medium overflow-hidden"
                    >
                      {availableLanguages.map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            changeLanguage(lang);
                            setIsLangDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2 text-left hover:bg-neutral-light-gray transition-colors ${
                            currentLanguage === lang
                              ? 'text-brand-primary font-semibold'
                              : 'text-neutral-dark-gray'
                          }`}
                        >
                          {languageNames[lang]}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA Button - Desktop */}
              <div className="hidden md:block">
                <Button
                  variant={isAtTop ? 'secondary' : 'primary'}
                  size="sm"
                  onClick={() => handleCallPrimary('navbar')}
                  leftIcon={<PhoneIcon />}
                >
                  {t('nav.requestCallback')}
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 rounded-lg transition-colors ${
                  isAtTop ? 'text-white hover:bg-white/10' : 'text-neutral-dark-gray hover:bg-neutral-light-gray'
                }`}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] z-50 bg-white shadow-strong md:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-neutral-light-gray">
                <span className="text-xl font-bold text-brand-primary">Balconix</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-neutral-light-gray"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex-1 overflow-y-auto py-4">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="block px-6 py-3 text-lg font-medium text-neutral-dark-gray hover:bg-neutral-light-gray hover:text-brand-primary transition-colors"
                  >
                    {t(`nav.${item.key}`)}
                  </a>
                ))}
              </nav>

              {/* Mobile Menu Footer */}
              <div className="p-4 border-t border-neutral-light-gray">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => {
                    handleCallPrimary('mobile-menu');
                    setIsMobileMenuOpen(false);
                  }}
                  leftIcon={<PhoneIcon />}
                >
                  {t('nav.requestCallback')}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
