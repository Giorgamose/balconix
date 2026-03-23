import { FC } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { TRUST_STATS, ANIMATION_VARIANTS } from '@utils/constants';

export const TrustBlock: FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12 md:py-16 bg-white border-b border-neutral-light-gray">
      <div className="container-custom">
        <motion.div
          variants={ANIMATION_VARIANTS.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {TRUST_STATS.map((stat) => (
            <motion.div
              key={stat.key}
              variants={ANIMATION_VARIANTS.staggerItem}
              className="text-center"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold text-brand-primary mb-1">
                {t(`trust.${stat.key}`)}
              </div>
              <div className="text-sm md:text-base text-neutral-medium-gray">
                {t(`trust.${stat.key}Label`)}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBlock;
