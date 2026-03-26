import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Icons
const FilterIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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

// Portfolio projects data - using real project images
const portfolioProjects = [
  {
    id: 1,
    category: 'residential',
    type: 'sliding',
    location: 'Tbilisi, Vake',
    year: '2025',
    images: [
      '/balconix/images/projects/project-1.jpg',
      '/balconix/images/projects/project-2.jpg',
      '/balconix/images/projects/project-3.jpg'
    ],
    stats: { area: '12', duration: '3', floors: '1' }
  },
  {
    id: 2,
    category: 'residential',
    type: 'frameless',
    location: 'Tbilisi, Saburtalo',
    year: '2025',
    images: [
      '/balconix/images/projects/project-4.jpg',
      '/balconix/images/projects/project-5.jpg'
    ],
    stats: { area: '8', duration: '2', floors: '1' }
  },
  {
    id: 3,
    category: 'commercial',
    type: 'folding',
    location: 'Tbilisi, Old Town',
    year: '2024',
    images: [
      '/balconix/images/projects/project-6.jpg',
      '/balconix/images/projects/project-7.jpg'
    ],
    stats: { area: '45', duration: '7', floors: '3' }
  },
  {
    id: 4,
    category: 'residential',
    type: 'sliding',
    location: 'Batumi',
    year: '2024',
    images: [
      '/balconix/images/projects/project-8.jpg',
      '/balconix/images/projects/project-9.jpg'
    ],
    stats: { area: '15', duration: '4', floors: '1' }
  },
  {
    id: 5,
    category: 'commercial',
    type: 'frameless',
    location: 'Tbilisi, Avlabari',
    year: '2024',
    images: [
      '/balconix/images/projects/project-10.jpg',
      '/balconix/images/projects/project-11.jpg'
    ],
    stats: { area: '120', duration: '14', floors: '5' }
  },
  {
    id: 6,
    category: 'residential',
    type: 'folding',
    location: 'Kutaisi',
    year: '2024',
    images: [
      '/balconix/images/projects/project-12.jpg',
      '/balconix/images/projects/project-13.jpg'
    ],
    stats: { area: '10', duration: '3', floors: '1' }
  },
  {
    id: 7,
    category: 'residential',
    type: 'sliding',
    location: 'Tbilisi, Gldani',
    year: '2023',
    images: [
      '/balconix/images/projects/project-14.jpg'
    ],
    stats: { area: '9', duration: '2', floors: '1' }
  },
  {
    id: 8,
    category: 'commercial',
    type: 'sliding',
    location: 'Tbilisi, Didube',
    year: '2023',
    images: [
      '/balconix/images/projects/project-15.jpg',
      '/balconix/images/projects/project-16.jpg'
    ],
    stats: { area: '80', duration: '10', floors: '4' }
  },
  {
    id: 9,
    category: 'residential',
    type: 'frameless',
    location: 'Tbilisi, Vera',
    year: '2023',
    images: [
      '/balconix/images/projects/project-17.jpg',
      '/balconix/images/projects/project-18.jpg'
    ],
    stats: { area: '14', duration: '4', floors: '1' }
  }
];

const categories = ['all', 'residential', 'commercial'];
const types = ['all', 'sliding', 'folding', 'frameless'];

export const Portfolio: FC = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeType, setActiveType] = useState('all');
  const [selectedProject, setSelectedProject] = useState<typeof portfolioProjects[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredProjects = portfolioProjects.filter(project => {
    const categoryMatch = activeCategory === 'all' || project.category === activeCategory;
    const typeMatch = activeType === 'all' || project.type === activeType;
    return categoryMatch && typeMatch;
  });

  const openLightbox = (project: typeof portfolioProjects[0]) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedProject(null);
    document.body.style.overflow = '';
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920")',
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
              {t('portfolio.hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              {t('portfolio.hero.subtitle')}
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-primary">500+</div>
                <div className="text-sm text-gray-400">{t('portfolio.stats.projects')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-primary">5+</div>
                <div className="text-sm text-gray-400">{t('portfolio.stats.years')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-primary">100%</div>
                <div className="text-sm text-gray-400">{t('portfolio.stats.satisfaction')}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b sticky top-16 md:top-20 z-30">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <FilterIcon />
              <span className="font-semibold text-gray-700">{t('portfolio.filters.title')}</span>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {/* Category Filter */}
              <div className="flex gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      activeCategory === cat
                        ? 'bg-brand-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t(`portfolio.filters.categories.${cat}`)}
                  </button>
                ))}
              </div>

              {/* Type Filter */}
              <div className="flex gap-2">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      activeType === type
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t(`portfolio.filters.types.${type}`)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 md:py-20">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => openLightbox(project)}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={t(`portfolio.projects.${project.id}.title`)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-brand-primary text-white text-xs font-semibold rounded-full">
                      {t(`portfolio.filters.types.${project.type}`)}
                    </span>
                    <span className="px-3 py-1 bg-white/90 text-gray-800 text-xs font-semibold rounded-full">
                      {project.year}
                    </span>
                  </div>

                  {/* Image count */}
                  {project.images.length > 1 && (
                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 text-white text-sm rounded-full">
                      📷 {project.images.length}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">
                    {t(`portfolio.projects.${project.id}.title`)}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">
                    📍 {project.location}
                  </p>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {t(`portfolio.projects.${project.id}.description`)}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="font-bold text-brand-primary">{project.stats.area}m²</div>
                      <div className="text-xs text-gray-500">{t('portfolio.projectStats.area')}</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-brand-primary">{project.stats.duration}</div>
                      <div className="text-xs text-gray-500">{t('portfolio.projectStats.days')}</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-brand-primary">{project.stats.floors}</div>
                      <div className="text-xs text-gray-500">{t('portfolio.projectStats.floors')}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* No results */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">{t('portfolio.noResults')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors z-10"
            >
              <CloseIcon />
            </button>

            {/* Navigation arrows */}
            {selectedProject.images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <ChevronRightIcon />
                </button>
              </>
            )}

            {/* Image */}
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-5xl max-h-[80vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedProject.images[currentImageIndex]}
                alt={t(`portfolio.projects.${selectedProject.id}.title`)}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
              
              {/* Project info */}
              <div className="mt-4 text-center text-white">
                <h3 className="text-xl font-bold">
                  {t(`portfolio.projects.${selectedProject.id}.title`)}
                </h3>
                <p className="text-gray-400">
                  {selectedProject.location} • {selectedProject.year}
                </p>
                {selectedProject.images.length > 1 && (
                  <p className="text-sm text-gray-500 mt-2">
                    {currentImageIndex + 1} / {selectedProject.images.length}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-brand-primary to-blue-700 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              {t('portfolio.cta.title')}
            </h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              {t('portfolio.cta.subtitle')}
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-primary font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
            >
              {t('portfolio.cta.button')}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
