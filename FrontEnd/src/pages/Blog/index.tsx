import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// Icons
const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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

// Blog posts data - using real project images
const blogPosts = [
  {
    id: 1,
    slug: 'benefits-of-balcony-glazing',
    category: 'tips',
    image: '/balconix/images/projects/project-1.jpg',
    date: '2026-03-20',
    readTime: 5,
    featured: true
  },
  {
    id: 2,
    slug: 'choosing-right-glass-type',
    category: 'guide',
    image: '/balconix/images/projects/project-3.jpg',
    date: '2026-03-15',
    readTime: 7,
    featured: true
  },
  {
    id: 3,
    slug: 'maintenance-tips',
    category: 'tips',
    image: '/balconix/images/projects/project-5.jpg',
    date: '2026-03-10',
    readTime: 4,
    featured: false
  },
  {
    id: 4,
    slug: 'energy-efficiency',
    category: 'guide',
    image: '/balconix/images/projects/project-7.jpg',
    date: '2026-03-05',
    readTime: 6,
    featured: false
  },
  {
    id: 5,
    slug: 'sliding-vs-folding',
    category: 'comparison',
    image: '/balconix/images/projects/project-9.jpg',
    date: '2026-02-28',
    readTime: 8,
    featured: false
  },
  {
    id: 6,
    slug: 'winter-preparation',
    category: 'tips',
    image: '/balconix/images/projects/project-11.jpg',
    date: '2026-02-20',
    readTime: 5,
    featured: false
  },
  {
    id: 7,
    slug: 'frameless-glazing-trends',
    category: 'news',
    image: '/balconix/images/projects/project-13.jpg',
    date: '2026-02-15',
    readTime: 4,
    featured: false
  },
  {
    id: 8,
    slug: 'common-mistakes',
    category: 'guide',
    image: '/balconix/images/projects/project-15.jpg',
    date: '2026-02-10',
    readTime: 6,
    featured: false
  }
];

const categories = ['all', 'tips', 'guide', 'comparison', 'news'];

export const Blog: FC = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredPosts = blogPosts.filter(post => 
    activeCategory === 'all' || post.category === activeCategory
  );

  const featuredPosts = blogPosts.filter(post => post.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ka-GE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      tips: 'bg-blue-500',
      guide: 'bg-green-500',
      comparison: 'bg-purple-500',
      news: 'bg-orange-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 bg-gradient-to-br from-indigo-600 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920")',
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
              {t('blog.hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-indigo-100">
              {t('blog.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-12 md:py-16 -mt-8">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {featuredPosts.map((post, index) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className={`group relative overflow-hidden rounded-2xl ${
                  index === 0 ? 'md:row-span-2' : ''
                }`}
              >
                <div className={`relative ${index === 0 ? 'aspect-[4/5] md:aspect-auto md:h-full' : 'aspect-video'}`}>
                  <img
                    src={post.image}
                    alt={t(`blog.posts.${post.slug}.title`)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <span className={`self-start px-3 py-1 ${getCategoryColor(post.category)} text-white text-xs font-semibold rounded-full mb-3`}>
                      {t(`blog.categories.${post.category}`)}
                    </span>
                    <h2 className={`font-bold mb-2 group-hover:text-brand-primary transition-colors ${
                      index === 0 ? 'text-2xl md:text-3xl' : 'text-xl'
                    }`}>
                      {t(`blog.posts.${post.slug}.title`)}
                    </h2>
                    <p className={`text-gray-300 line-clamp-2 mb-3 ${index === 0 ? '' : 'hidden md:block'}`}>
                      {t(`blog.posts.${post.slug}.excerpt`)}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <CalendarIcon />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <ClockIcon />
                        {post.readTime} {t('blog.readTime')}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b sticky top-16 md:top-20 z-30">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-brand-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t(`blog.categories.${category}`)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-12 md:py-20">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-gray-900 mb-8"
          >
            {activeCategory === 'all' 
              ? t('blog.allPosts')
              : t(`blog.categories.${activeCategory}`)
            }
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                layout
                className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-lg transition-shadow group"
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={t(`blog.posts.${post.slug}.title`)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className={`absolute top-4 left-4 px-3 py-1 ${getCategoryColor(post.category)} text-white text-xs font-semibold rounded-full`}>
                      {t(`blog.categories.${post.category}`)}
                    </span>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <CalendarIcon />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <ClockIcon />
                        {post.readTime} {t('blog.readTime')}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-brand-primary transition-colors">
                      {t(`blog.posts.${post.slug}.title`)}
                    </h3>
                    
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {t(`blog.posts.${post.slug}.excerpt`)}
                    </p>
                    
                    <span className="inline-flex items-center gap-2 text-brand-primary font-semibold text-sm group-hover:gap-3 transition-all">
                      {t('blog.readMore')}
                      <ArrowRightIcon />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">{t('blog.noPosts')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-brand-primary to-blue-700 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              {t('blog.newsletter.title')}
            </h2>
            <p className="text-blue-100 mb-8">
              {t('blog.newsletter.subtitle')}
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t('blog.newsletter.placeholder')}
                className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-brand-primary font-semibold rounded-xl hover:bg-gray-100 transition-colors"
              >
                {t('blog.newsletter.subscribe')}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
