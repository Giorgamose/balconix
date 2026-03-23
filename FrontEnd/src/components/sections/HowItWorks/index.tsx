import { FC } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { PROCESS_STEPS, ANIMATION_VARIANTS } from '@utils/constants';

export const HowItWorks: FC = () => {
  const { t } = useTranslation();

  return (
    <section className="section bg-neutral-off-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading-section">{t('howItWorks.title')}</h2>
          <p className="text-lg text-neutral-medium-gray max-w-2xl mx-auto">
            {t('howItWorks.subtitle')}
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={ANIMATION_VARIANTS.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative"
        >
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-brand-primary/20 -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={step.id}
                variants={ANIMATION_VARIANTS.staggerItem}
                className="relative"
              >
                {/* Step Card */}
                <div className="bg-white rounded-2xl p-6 shadow-soft relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center text-3xl mb-4 mx-auto">
                    {step.icon}
                  </div>

                  {/* Step Number */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-brand-primary text-white text-sm font-bold flex items-center justify-center">
                    {step.id}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-neutral-dark-gray text-center mb-2">
                    {t(`howItWorks.${step.key}.title`)}
                  </h3>
                  <p className="text-sm text-neutral-medium-gray text-center">
                    {t(`howItWorks.${step.key}.description`)}
                  </p>
                </div>

                {/* Arrow (Mobile) */}
                {index < PROCESS_STEPS.length - 1 && (
                  <div className="md:hidden flex justify-center my-4">
                    <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
