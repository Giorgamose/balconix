import { FC } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '@components/common/Button';

const NotFound: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center px-4"
    >
      <div className="text-center">
        <motion.h1
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          className="text-8xl md:text-9xl font-bold text-brand-primary mb-4"
        >
          404
        </motion.h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-neutral-dark-gray mb-4">
          Page Not Found
        </h2>
        <p className="text-neutral-medium-gray mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg">
            Go Home
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default NotFound;
