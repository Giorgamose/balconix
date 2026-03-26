import { FC } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Icons
const ShieldIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const CertificateIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const GlassIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
  </svg>
);

const WarrantyIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const Materials: FC = () => {
  const { t } = useTranslation();

  const materialTypes = [
    {
      id: 'pvc',
      icon: <GlassIcon />,
      image: '/balconix/images/projects/project-1.jpg',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'aluminum',
      icon: <ShieldIcon />,
      image: '/balconix/images/projects/project-5.jpg',
      color: 'from-gray-500 to-gray-600'
    },
    {
      id: 'frameless',
      icon: <GlassIcon />,
      image: '/balconix/images/projects/project-3.jpg',
      color: 'from-cyan-500 to-cyan-600'
    }
  ];

  const glassTypes = [
    {
      id: 'single',
      thickness: '6mm',
      image: '/balconix/images/projects/project-7.jpg'
    },
    {
      id: 'double',
      thickness: '24mm',
      image: '/balconix/images/projects/project-9.jpg'
    },
    {
      id: 'tinted',
      thickness: '24mm',
      image: '/balconix/images/projects/project-11.jpg'
    }
  ];

  const certifications = [
    { id: 'iso9001', name: 'ISO 9001:2015', desc: 'Quality Management' },
    { id: 'ce', name: 'CE Marking', desc: 'European Conformity' },
    { id: 'en14351', name: 'EN 14351-1', desc: 'Windows & Doors Standard' },
    { id: 'en12150', name: 'EN 12150', desc: 'Thermally Toughened Glass' },
    { id: 'en1279', name: 'EN 1279', desc: 'Insulating Glass Units' },
    { id: 'rohs', name: 'RoHS', desc: 'Environmental Safety' }
  ];

  const warrantyFeatures = [
    'frames',
    'glass',
    'hardware',
    'seals',
    'installation'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 bg-gradient-to-br from-brand-primary to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("/balconix/images/projects/project-2.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {t('materials.hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-blue-100">
              {t('materials.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Material Types Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('materials.systems.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('materials.types.subtitle')}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {materialTypes.map((material) => (
              <motion.div
                key={material.id}
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={material.image}
                    alt={t(`materials.systems.${material.id}.name`)}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${material.color} opacity-60`} />
                  <div className="absolute bottom-4 left-4 text-white">
                    {material.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {t(`materials.systems.${material.id}.name`)}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t(`materials.systems.${material.id}.description`)}
                  </p>
                  <ul className="space-y-2">
                    {(t(`materials.systems.${material.id}.features`, { returnObjects: true }) as string[]).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckIcon />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Glass Types Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('materials.glass.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('materials.glass.subtitle')}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {glassTypes.map((glass) => (
              <motion.div
                key={glass.id}
                variants={itemVariants}
                className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-gray-100 transition-colors"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-brand-primary">
                  <img
                    src={glass.image}
                    alt={t(`materials.glass.${glass.id}.name`)}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {t(`materials.glass.${glass.id}.name`)}
                </h3>
                <p className="text-brand-primary font-semibold mb-2">{glass.thickness}</p>
                <p className="text-gray-600 text-sm">
                  {t(`materials.glass.${glass.id}.description`)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quality & Certifications */}
      <section className="py-16 md:py-24 bg-gray-900 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary rounded-full mb-4">
              <CertificateIcon />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              {t('materials.certifications.title')}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {t('materials.certifications.subtitle')}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {certifications.map((cert) => (
              <motion.div
                key={cert.id}
                variants={itemVariants}
                className="bg-gray-800 rounded-xl p-4 text-center hover:bg-gray-700 transition-colors"
              >
                <div className="w-12 h-12 mx-auto mb-2 bg-brand-primary/20 rounded-full flex items-center justify-center">
                  <CertificateIcon />
                </div>
                <h4 className="font-bold text-sm mb-1">{cert.name}</h4>
                <p className="text-gray-400 text-xs">{cert.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Warranty Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-brand-primary to-blue-700 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-3 bg-white/20 rounded-full px-4 py-2 mb-6">
                <WarrantyIcon />
                <span className="font-semibold">{t('materials.warranty.badge')}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('materials.warranty.title')}
              </h2>
              <p className="text-blue-100 mb-8">
                {t('materials.warranty.description')}
              </p>
              <ul className="space-y-3">
                {warrantyFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <CheckIcon />
                    </div>
                    <span>{t(`materials.warranty.features.${feature}`)}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-8 text-center text-gray-900">
                <div className="text-6xl md:text-8xl font-bold text-brand-primary mb-2">5</div>
                <div className="text-2xl font-semibold mb-4">{t('materials.warranty.years')}</div>
                <p className="text-gray-600">{t('materials.warranty.guarantee')}</p>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-cyan-400 rounded-full opacity-20" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Import Quality Banner */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-8 md:p-12 text-center"
          >
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              {t('materials.import.title')}
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('materials.import.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('materials.cta.title')}
            </h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              {t('materials.cta.subtitle')}
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-dark transition-colors shadow-lg hover:shadow-xl"
            >
              {t('materials.cta.button')}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Materials;
