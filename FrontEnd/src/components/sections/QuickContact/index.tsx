import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { validatePhone, sanitizePhone } from '@utils/validators';
import { sendLeadEmail } from '@services/emailService';
import Button from '@components/common/Button';

export const QuickContact: FC = () => {
  const { t, i18n } = useTranslation();
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate phone
    const phoneError = validatePhone(phone);
    if (phoneError) {
      setError(t(`form.${phoneError}`));
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await sendLeadEmail({
        phone: sanitizePhone(phone),
        language: i18n.language,
      });

      if (success) {
        setSubmitStatus('success');
        setPhone('');
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="quick-contact" className="section bg-brand-primary">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('quickContact.title')}
            </h2>
            <p className="text-lg text-white/80 mb-8">
              {t('quickContact.subtitle')}
            </p>
          </motion.div>

          {/* Form */}
          {submitStatus === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
            >
              <div className="text-5xl mb-4">✅</div>
              <p className="text-xl text-white font-medium">
                {t('quickContact.success')}
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="flex-1">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t('quickContact.phonePlaceholder')}
                  className={`input w-full text-lg ${error ? 'input-error' : ''}`}
                  disabled={isSubmitting}
                />
                {error && (
                  <p className="text-feedback-error-light text-sm mt-1 text-left">
                    {error}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                isLoading={isSubmitting}
                className="bg-white text-brand-primary hover:bg-white/90 whitespace-nowrap"
              >
                {t('quickContact.submit')}
              </Button>
            </motion.form>
          )}

          {submitStatus === 'error' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-feedback-error-light mt-4"
            >
              {t('quickContact.error')}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuickContact;
