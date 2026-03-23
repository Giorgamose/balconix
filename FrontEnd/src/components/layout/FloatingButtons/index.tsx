import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useContactActions } from '@hooks/index';

// Icons
const WhatsAppIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const MessengerIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.301 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ChatIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

export const FloatingButtons: FC = () => {
  const { t } = useTranslation();
  const { handleWhatsApp, handleMessenger, handleCallPrimary } = useContactActions();
  const [isExpanded, setIsExpanded] = useState(false);

  const buttonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    }),
    exit: { scale: 0, opacity: 0 },
  };

  const buttons = [
    {
      id: 'phone',
      icon: <PhoneIcon />,
      label: t('floating.call'),
      onClick: () => handleCallPrimary('floating'),
      bgColor: 'bg-brand-primary',
      hoverColor: 'hover:bg-brand-primary-dark',
      showOnMobile: true,
    },
    {
      id: 'messenger',
      icon: <MessengerIcon />,
      label: t('floating.messenger'),
      onClick: () => handleMessenger('floating'),
      bgColor: 'bg-social-messenger',
      hoverColor: 'hover:bg-social-messenger-dark',
      showOnMobile: true,
    },
    {
      id: 'whatsapp',
      icon: <WhatsAppIcon />,
      label: t('floating.whatsapp'),
      onClick: () => handleWhatsApp('floating'),
      bgColor: 'bg-social-whatsapp',
      hoverColor: 'hover:bg-social-whatsapp-dark',
      showOnMobile: true,
    },
  ];

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
      {/* Expanded Buttons */}
      <AnimatePresence>
        {isExpanded && (
          <div className="absolute bottom-16 right-0 flex flex-col gap-3 items-end">
            {buttons.map((button, index) => (
              <motion.div
                key={button.id}
                custom={buttons.length - 1 - index}
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex items-center gap-3"
              >
                {/* Tooltip */}
                <span className="hidden md:block px-3 py-1.5 bg-neutral-dark-gray text-white text-sm font-medium rounded-lg whitespace-nowrap shadow-medium">
                  {button.label}
                </span>

                {/* Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    button.onClick();
                    setIsExpanded(false);
                  }}
                  className={`w-12 h-12 rounded-full ${button.bgColor} ${button.hoverColor} text-white shadow-strong flex items-center justify-center transition-colors`}
                  aria-label={button.label}
                >
                  {button.icon}
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 rounded-full shadow-strong flex items-center justify-center transition-all duration-300 ${
          isExpanded
            ? 'bg-neutral-dark-gray text-white rotate-0'
            : 'bg-brand-primary text-white'
        }`}
        aria-label={isExpanded ? 'Close contact options' : 'Open contact options'}
      >
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isExpanded ? <CloseIcon /> : <ChatIcon />}
        </motion.div>
      </motion.button>

      {/* Pulse Animation */}
      {!isExpanded && (
        <motion.div
          className="absolute inset-0 rounded-full bg-brand-primary"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ zIndex: -1 }}
        />
      )}
    </div>
  );
};

export default FloatingButtons;
