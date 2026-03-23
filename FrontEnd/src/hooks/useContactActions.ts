import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { openWhatsApp, openMessenger, makeCall } from '@utils/helpers';
import { CONTACT } from '@utils/constants';
import {
  trackWhatsAppClick,
  trackMessengerClick,
  trackPhoneCall,
} from '@services/analyticsService';

interface ContactActions {
  handleWhatsApp: (location?: string) => void;
  handleMessenger: (location?: string) => void;
  handleCall: (location?: string, phone?: string) => void;
  handleCallPrimary: (location?: string) => void;
  handleCallSecondary: (location?: string) => void;
}

/**
 * Hook for contact actions with analytics tracking
 */
export const useContactActions = (): ContactActions => {
  const { t } = useTranslation();

  const handleWhatsApp = useCallback(
    (location: string = 'unknown') => {
      const message = t('whatsappMessage');
      openWhatsApp(message);
      trackWhatsAppClick(location);
    },
    [t]
  );

  const handleMessenger = useCallback((location: string = 'unknown') => {
    openMessenger();
    trackMessengerClick(location);
  }, []);

  const handleCall = useCallback(
    (location: string = 'unknown', phone: string = CONTACT.PHONE_PRIMARY) => {
      makeCall(phone);
      trackPhoneCall(location);
    },
    []
  );

  const handleCallPrimary = useCallback(
    (location: string = 'unknown') => {
      handleCall(location, CONTACT.PHONE_PRIMARY);
    },
    [handleCall]
  );

  const handleCallSecondary = useCallback(
    (location: string = 'unknown') => {
      handleCall(location, CONTACT.PHONE_SECONDARY);
    },
    [handleCall]
  );

  return {
    handleWhatsApp,
    handleMessenger,
    handleCall,
    handleCallPrimary,
    handleCallSecondary,
  };
};

export default useContactActions;
