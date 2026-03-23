import { FC } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { PRODUCT_TYPES, ANIMATION_VARIANTS } from '@utils/constants';

// Real balcony glazing images from the internet
const productImages: Record<string, string> = {
  sliding: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
  folding: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80',
  frameless: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
};

export const Products: FC = () => {
  const { t } = useTranslation();

  return (
    <section id="products" className="section bg-neutral-off-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading-section">{t('products.title')}</h2>
          <p className="text-lg text-neutral-medium-gray max-w-2xl mx-auto">
            {t('products.subtitle')}
          </p>
        </motion.div>

        {/* Product Cards */}
        <motion.div
          variants={ANIMATION_VARIANTS.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {PRODUCT_TYPES.map((type) => (
            <motion.div
              key={type}
              variants={ANIMATION_VARIANTS.staggerItem}
              className="card-hover overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-48 md:h-56 overflow-hidden mb-4 rounded-xl">
                <img 
                  src={productImages[type]} 
                  alt={t(`products.${type}.name`)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3 bg-brand-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  {t(`products.${type}.name`)}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-neutral-dark-gray mb-2">
                {t(`products.${type}.name`)}
              </h3>
              <p className="text-neutral-medium-gray mb-4">
                {t(`products.${type}.description`)}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-4">
                {(t(`products.${type}.features`, { returnObjects: true }) as string[]).map(
                  (feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-neutral-dark-gray">
                      <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      {feature}
                    </li>
                  )
                )}
              </ul>

              {/* CTA */}
              <button className="w-full py-3 bg-brand-primary/10 text-brand-primary font-medium rounded-lg hover:bg-brand-primary hover:text-white transition-all">
                {t('products.learnMore')} →
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
