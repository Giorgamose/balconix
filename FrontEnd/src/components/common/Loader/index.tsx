import { FC } from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white';
  fullScreen?: boolean;
}

const sizes = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-16 h-16',
};

const colors = {
  primary: 'border-brand-primary',
  white: 'border-white',
};

export const Loader: FC<LoaderProps> = ({
  size = 'md',
  color = 'primary',
  fullScreen = false,
}) => {
  const spinner = (
    <motion.div
      className={`${sizes[size]} rounded-full border-4 border-t-transparent ${colors[color]}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
      role="status"
      aria-label="Loading"
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        <div className="flex flex-col items-center gap-4">
          {spinner}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-neutral-dark-gray font-medium"
          >
            Loading...
          </motion.p>
        </div>
      </div>
    );
  }

  return spinner;
};

export default Loader;
