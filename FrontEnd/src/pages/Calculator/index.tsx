import { FC, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Icons
const CalculatorIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const InfoIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Pricing data (in GEL)
const basePrices = {
  sliding: 180,      // per m²
  folding: 220,      // per m²
  frameless: 350     // per m²
};

const glassPrices = {
  single: 0,         // base price
  double: 60,        // additional per m²
  tinted: 40         // additional per m²
};

const additionalOptions = {
  mosquitoNet: 50,   // per panel
  blinds: 120,       // per panel
  handles: 25,       // per unit
  locks: 45          // per unit
};

export const Calculator: FC = () => {
  const { t } = useTranslation();
  
  // Form state
  const [systemType, setSystemType] = useState<'sliding' | 'folding' | 'frameless'>('sliding');
  const [glassType, setGlassType] = useState<'single' | 'double' | 'tinted'>('single');
  const [width, setWidth] = useState(3);
  const [height, setHeight] = useState(2.5);
  const [panels, setPanels] = useState(4);
  const [options, setOptions] = useState({
    mosquitoNet: false,
    blinds: false,
    handles: true,
    locks: true
  });
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showResult, setShowResult] = useState(false);

  // Calculate price
  const calculation = useMemo(() => {
    const area = width * height;
    const basePrice = basePrices[systemType] * area;
    const glassPrice = glassPrices[glassType] * area;
    
    let optionsPrice = 0;
    if (options.mosquitoNet) optionsPrice += additionalOptions.mosquitoNet * panels;
    if (options.blinds) optionsPrice += additionalOptions.blinds * panels;
    if (options.handles) optionsPrice += additionalOptions.handles * panels;
    if (options.locks) optionsPrice += additionalOptions.locks * Math.ceil(panels / 2);

    const subtotal = basePrice + glassPrice + optionsPrice;
    const discount = subtotal > 2000 ? subtotal * 0.05 : 0; // 5% discount for orders over 2000 GEL
    const total = subtotal - discount;

    return {
      area: area.toFixed(1),
      basePrice: Math.round(basePrice),
      glassPrice: Math.round(glassPrice),
      optionsPrice: Math.round(optionsPrice),
      subtotal: Math.round(subtotal),
      discount: Math.round(discount),
      total: Math.round(total)
    };
  }, [systemType, glassType, width, height, panels, options]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(true);
  };

  const systemTypes = [
    { id: 'sliding', icon: '🪟', popular: true },
    { id: 'folding', icon: '🚪', popular: false },
    { id: 'frameless', icon: '✨', popular: false }
  ];

  const glassTypes = [
    { id: 'single', thickness: '6mm' },
    { id: 'double', thickness: '24mm' },
    { id: 'tinted', thickness: '24mm' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 md:pt-28 md:pb-16 bg-gradient-to-br from-green-600 to-green-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("/balconix/images/projects/project-6.jpg")',
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
              <CalculatorIcon />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {t('calculator.hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-green-100">
              {t('calculator.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 md:py-20 -mt-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calculator Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
              >
                <form onSubmit={handleSubmit}>
                  {/* System Type */}
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      1. {t('calculator.steps.system')}
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {systemTypes.map((system) => (
                        <button
                          key={system.id}
                          type="button"
                          onClick={() => setSystemType(system.id as typeof systemType)}
                          className={`relative p-4 rounded-xl border-2 transition-all ${
                            systemType === system.id
                              ? 'border-brand-primary bg-brand-primary/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {system.popular && (
                            <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-orange-500 text-white text-xs font-semibold rounded-full">
                              {t('calculator.popular')}
                            </span>
                          )}
                          <span className="text-3xl block mb-2">{system.icon}</span>
                          <span className={`font-semibold ${systemType === system.id ? 'text-brand-primary' : 'text-gray-700'}`}>
                            {t(`calculator.systems.${system.id}.name`)}
                          </span>
                          <span className="block text-sm text-gray-500 mt-1">
                            {basePrices[system.id as keyof typeof basePrices]} ₾/m²
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Glass Type */}
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      2. {t('calculator.steps.glass')}
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {glassTypes.map((glass) => (
                        <button
                          key={glass.id}
                          type="button"
                          onClick={() => setGlassType(glass.id as typeof glassType)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            glassType === glass.id
                              ? 'border-brand-primary bg-brand-primary/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <span className={`font-semibold ${glassType === glass.id ? 'text-brand-primary' : 'text-gray-700'}`}>
                            {t(`calculator.glass.${glass.id}.name`)}
                          </span>
                          <span className="block text-sm text-gray-500">{glass.thickness}</span>
                          {glassPrices[glass.id as keyof typeof glassPrices] > 0 && (
                            <span className="block text-sm text-green-600 mt-1">
                              +{glassPrices[glass.id as keyof typeof glassPrices]} ₾/m²
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dimensions */}
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      3. {t('calculator.steps.dimensions')}
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('calculator.dimensions.width')} (m)
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="20"
                          step="0.1"
                          value={width}
                          onChange={(e) => setWidth(parseFloat(e.target.value) || 1)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('calculator.dimensions.height')} (m)
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          step="0.1"
                          value={height}
                          onChange={(e) => setHeight(parseFloat(e.target.value) || 1)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('calculator.dimensions.panels')}
                        </label>
                        <input
                          type="number"
                          min="2"
                          max="20"
                          value={panels}
                          onChange={(e) => setPanels(parseInt(e.target.value) || 2)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                      <InfoIcon />
                      {t('calculator.dimensions.area')}: {calculation.area} m²
                    </p>
                  </div>

                  {/* Additional Options */}
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      4. {t('calculator.steps.options')}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(additionalOptions).map(([key, price]) => (
                        <label
                          key={key}
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            options[key as keyof typeof options]
                              ? 'border-brand-primary bg-brand-primary/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={options[key as keyof typeof options]}
                            onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
                            className="w-5 h-5 text-brand-primary rounded"
                          />
                          <div>
                            <span className="font-medium text-gray-700 block">
                              {t(`calculator.options.${key}.name`)}
                            </span>
                            <span className="text-sm text-green-600">+{price} ₾</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="mb-8 p-6 bg-gray-50 rounded-xl">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      5. {t('calculator.steps.contact')}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('calculator.contact.name')}
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={t('calculator.contact.namePlaceholder')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('calculator.contact.phone')} *
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+995 5XX XXX XXX"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-dark transition-colors shadow-lg"
                  >
                    {t('calculator.submit')}
                  </button>
                </form>
              </motion.div>
            </div>

            {/* Price Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6 sticky top-24"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {t('calculator.summary.title')}
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>{t('calculator.summary.system')}</span>
                    <span className="font-semibold">{calculation.basePrice} ₾</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>{t('calculator.summary.glass')}</span>
                    <span className="font-semibold">{calculation.glassPrice} ₾</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>{t('calculator.summary.options')}</span>
                    <span className="font-semibold">{calculation.optionsPrice} ₾</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-gray-600">
                      <span>{t('calculator.summary.subtotal')}</span>
                      <span className="font-semibold">{calculation.subtotal} ₾</span>
                    </div>
                    {calculation.discount > 0 && (
                      <div className="flex justify-between text-green-600 mt-2">
                        <span>{t('calculator.summary.discount')} (5%)</span>
                        <span className="font-semibold">-{calculation.discount} ₾</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-brand-primary/10 rounded-xl p-4 mb-6">
                  <div className="text-sm text-gray-600 mb-1">{t('calculator.summary.total')}</div>
                  <div className="text-3xl font-bold text-brand-primary">
                    {calculation.total} ₾
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {t('calculator.summary.approximate')}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {t('calculator.features.measurement')}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {t('calculator.features.warranty')}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {t('calculator.features.installation')}
                  </div>
                </div>

                {/* WhatsApp Button */}
                <a
                  href={`https://wa.me/995577072753?text=${encodeURIComponent(
                    `გამარჯობა! მაინტერესებს ${t(`calculator.systems.${systemType}.name`)} სისტემა, ${calculation.area}m², ფასი: ${calculation.total}₾`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full mt-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {t('calculator.whatsapp')}
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Result Modal */}
      {showResult && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setShowResult(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✓</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {t('calculator.result.title')}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('calculator.result.message')}
            </p>
            <div className="bg-gray-100 rounded-xl p-4 mb-6">
              <div className="text-sm text-gray-600">{t('calculator.result.estimate')}</div>
              <div className="text-3xl font-bold text-brand-primary">{calculation.total} ₾</div>
            </div>
            <button
              onClick={() => setShowResult(false)}
              className="w-full py-3 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-dark transition-colors"
            >
              {t('common.close')}
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Calculator;
