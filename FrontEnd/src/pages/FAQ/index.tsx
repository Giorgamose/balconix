import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Icons
const ChevronDownIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const QuestionIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border-b border-gray-200 last:border-0"
    >
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between text-left hover:text-brand-primary transition-colors"
      >
        <span className="font-semibold text-gray-900 pr-8">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={`flex-shrink-0 ${isOpen ? 'text-brand-primary' : 'text-gray-400'}`}
        >
          <ChevronDownIcon />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-gray-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const faqCategories = [
  'general',
  'products',
  'installation',
  'pricing',
  'warranty'
];

// Map FAQ questions from translations by category
const getQuestionsForCategory = (category: string, t: (key: string, options?: Record<string, unknown>) => string) => {
  // Get all questions from translation
  const allQuestions = [
    { key: 'q1', category: 'installation' },
    { key: 'q2', category: 'products' },
    { key: 'q3', category: 'general' },
    { key: 'q4', category: 'warranty' },
    { key: 'q5', category: 'pricing' },
    { key: 'q6', category: 'general' },
    { key: 'q7', category: 'products' },
    { key: 'q8', category: 'pricing' }
  ];

  return allQuestions
    .filter(q => category === 'all' || q.category === category)
    .map(q => ({
      id: q.key,
      question: t(`faq.questions.${q.key}.question`),
      answer: t(`faq.questions.${q.key}.answer`)
    }));
};

export const FAQ: FC = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('general');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      general: '❓',
      products: '🪟',
      installation: '🔧',
      pricing: '💰',
      warranty: '🛡️'
    };
    return icons[category] || '❓';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 bg-gradient-to-br from-brand-primary to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920")',
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <QuestionIcon />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {t('faq.hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              {t('faq.hero.subtitle')}
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('faq.search.placeholder')}
                className="w-full px-6 py-4 pl-14 bg-white text-gray-900 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                <SearchIcon />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Category Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-2xl shadow-soft p-4">
                <h3 className="font-bold text-gray-900 mb-4 px-2">
                  {t('faq.categories.title')}
                </h3>
                <nav className="space-y-1">
                  {faqCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                        activeCategory === category
                          ? 'bg-brand-primary text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span className="text-xl">{getCategoryIcon(category)}</span>
                      <span className="font-medium">{t(`faq.categories.${category}`)}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* FAQ Items */}
            <div className="lg:col-span-3">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-soft p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                  <span className="text-3xl">{getCategoryIcon(activeCategory)}</span>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {t(`faq.categories.${activeCategory}`)}
                  </h2>
                </div>

                <div className="divide-y divide-gray-100">
                  {getQuestionsForCategory(activeCategory, t).map((item) => {
                    // Filter by search query
                    if (searchQuery && !item.question.toLowerCase().includes(searchQuery.toLowerCase()) && 
                        !item.answer.toLowerCase().includes(searchQuery.toLowerCase())) {
                      return null;
                    }

                    return (
                      <FAQItem
                        key={item.id}
                        question={item.question}
                        answer={item.answer}
                        isOpen={openItems[item.id] || false}
                        onToggle={() => toggleItem(item.id)}
                      />
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('faq.contact.title')}
            </h2>
            <p className="text-gray-600 mb-8">
              {t('faq.contact.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/995577072753"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
              <a
                href="tel:+995577072753"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-dark transition-colors shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {t('faq.contact.call')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
