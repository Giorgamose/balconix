import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Real project images from Pictures folder
const galleryImages = [
  { id: '1', src: '/images/projects/project-1.jpg', category: 'all' },
  { id: '2', src: '/images/projects/project-2.jpg', category: 'sliding' },
  { id: '3', src: '/images/projects/project-3.jpg', category: 'folding' },
  { id: '4', src: '/images/projects/project-4.jpg', category: 'frameless' },
  { id: '5', src: '/images/projects/project-5.jpg', category: 'sliding' },
  { id: '6', src: '/images/projects/project-6.jpg', category: 'folding' },
  { id: '7', src: '/images/projects/project-7.jpg', category: 'frameless' },
  { id: '8', src: '/images/projects/project-8.jpg', category: 'sliding' },
  { id: '9', src: '/images/projects/project-9.jpg', category: 'folding' },
  { id: '10', src: '/images/projects/project-10.jpg', category: 'frameless' },
  { id: '11', src: '/images/projects/project-11.jpg', category: 'sliding' },
  { id: '12', src: '/images/projects/project-12.jpg', category: 'folding' },
];

export const Gallery: FC = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="section bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading-section">{t('gallery.title')}</h2>
          <p className="text-lg text-neutral-medium-gray max-w-2xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-[4/3] bg-neutral-light-gray rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => setSelectedImage(image.src)}
            >
              {/* Actual Project Image */}
              <img 
                src={image.src} 
                alt={`Project ${image.id}`}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <button className="btn-secondary">
            {t('gallery.viewAll')}
          </button>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                alt="Project detail"
                className="w-full h-auto rounded-xl"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-neutral-light-gray"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
