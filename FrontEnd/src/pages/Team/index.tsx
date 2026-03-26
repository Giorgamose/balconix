import { FC } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Icons
const UsersIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const BuildingIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const TargetIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
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

// Team member images using professional stock photos
const teamMembers = [
  {
    id: 'founder',
    role: 'founder',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: 'director',
    role: 'director',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: 'projectManager',
    role: 'projectManager',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: 'marketingManager',
    role: 'marketingManager',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: 'installationLead',
    role: 'installationLead',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: 'installer1',
    role: 'installer',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: 'installer2',
    role: 'installer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: 'installer3',
    role: 'installer',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: 'installer4',
    role: 'installer',
    image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: 'installer5',
    role: 'installer',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&h=400&fit=crop&crop=face'
  }
];

const processSteps = [
  {
    id: 'consultation',
    icon: '📞',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop'
  },
  {
    id: 'measurement',
    icon: '📐',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop'
  },
  {
    id: 'design',
    icon: '✏️',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop'
  },
  {
    id: 'production',
    icon: '🏭',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=300&fit=crop'
  },
  {
    id: 'installation',
    icon: '🔧',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop'
  },
  {
    id: 'handover',
    icon: '🤝',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop'
  }
];

const companyValues = [
  { id: 'quality', icon: <StarIcon /> },
  { id: 'trust', icon: <TargetIcon /> },
  { id: 'innovation', icon: <BuildingIcon /> },
  { id: 'customer', icon: <UsersIcon /> }
];

export const Team: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&h=1080&fit=crop")',
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
            <span className="inline-block px-4 py-2 bg-brand-primary/20 text-brand-primary rounded-full text-sm font-semibold mb-4">
              {t('team.hero.badge')}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {t('team.hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              {t('team.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('team.story.title')}
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>{t('team.story.paragraph1')}</p>
                <p>{t('team.story.paragraph2')}</p>
                <p>{t('team.story.paragraph3')}</p>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center p-4 bg-brand-primary/10 rounded-xl">
                  <div className="text-3xl font-bold text-brand-primary">5+</div>
                  <div className="text-sm text-gray-600">{t('team.story.stats.years')}</div>
                </div>
                <div className="text-center p-4 bg-brand-primary/10 rounded-xl">
                  <div className="text-3xl font-bold text-brand-primary">500+</div>
                  <div className="text-sm text-gray-600">{t('team.story.stats.projects')}</div>
                </div>
                <div className="text-center p-4 bg-brand-primary/10 rounded-xl">
                  <div className="text-3xl font-bold text-brand-primary">10+</div>
                  <div className="text-sm text-gray-600">{t('team.story.stats.team')}</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=500&fit=crop"
                  alt="Company"
                  className="rounded-2xl shadow-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=500&fit=crop"
                  alt="Work"
                  className="rounded-2xl shadow-lg mt-8"
                />
              </div>
              {/* Decorative badge */}
              <div className="absolute -bottom-6 -left-6 bg-brand-primary text-white p-4 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">ILSO GROUP</div>
                <div className="text-sm opacity-80">{t('team.story.since')}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('team.values.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('team.values.subtitle')}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {companyValues.map((value) => (
              <motion.div
                key={value.id}
                variants={itemVariants}
                className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-brand-primary hover:text-white transition-all group"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary group-hover:bg-white/20 group-hover:text-white transition-all">
                  {value.icon}
                </div>
                <h3 className="font-bold mb-2">{t(`team.values.${value.id}.title`)}</h3>
                <p className="text-sm text-gray-600 group-hover:text-white/80">
                  {t(`team.values.${value.id}.description`)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('team.members.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('team.members.subtitle')}
            </p>
          </motion.div>

          {/* Leadership Team */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              {t('team.members.leadership')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {teamMembers.slice(0, 4).map((member) => (
                <motion.div
                  key={member.id}
                  variants={itemVariants}
                  className="text-center group"
                >
                  <div className="relative mb-4 overflow-hidden rounded-2xl">
                    <img
                      src={member.image}
                      alt={t(`team.members.roles.${member.role}`)}
                      className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h4 className="font-bold text-gray-900">
                    {t(`team.members.names.${member.id}`)}
                  </h4>
                  <p className="text-sm text-brand-primary">
                    {t(`team.members.roles.${member.role}`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Installation Team */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              {t('team.members.installationTeam')}
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {teamMembers.slice(4).map((member) => (
                <motion.div
                  key={member.id}
                  variants={itemVariants}
                  className="text-center"
                >
                  <div className="relative mb-2 overflow-hidden rounded-xl">
                    <img
                      src={member.image}
                      alt={t(`team.members.roles.${member.role}`)}
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                  <h4 className="font-semibold text-sm text-gray-900">
                    {t(`team.members.names.${member.id}`)}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {t(`team.members.roles.${member.role}`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Working Process Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('team.process.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('team.process.subtitle')}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            {/* Timeline line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-brand-primary/20 -translate-y-1/2" />

            <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  variants={itemVariants}
                  className="relative text-center"
                >
                  {/* Step number circle */}
                  <div className="relative z-10 w-12 h-12 mx-auto mb-4 bg-brand-primary text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                    {index + 1}
                  </div>
                  
                  {/* Image */}
                  <div className="relative mb-3 overflow-hidden rounded-xl">
                    <img
                      src={step.image}
                      alt={t(`team.process.steps.${step.id}.title`)}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute top-2 right-2 text-2xl">{step.icon}</div>
                  </div>

                  <h4 className="font-bold text-gray-900 mb-1">
                    {t(`team.process.steps.${step.id}.title`)}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {t(`team.process.steps.${step.id}.description`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Section (Placeholder) */}
      <section className="py-16 md:py-24 bg-gray-900 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              {t('team.video.title')}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {t('team.video.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            {/* Video placeholder - replace with actual video */}
            <div className="relative aspect-video bg-gray-800 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200"
                alt="Video thumbnail"
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
              <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded text-sm">
                {t('team.video.comingSoon')}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-brand-primary to-blue-700 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              {t('team.cta.title')}
            </h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              {t('team.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-brand-primary font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                {t('team.cta.contact')}
              </a>
              <a
                href="/portfolio"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
              >
                {t('team.cta.portfolio')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Team;
