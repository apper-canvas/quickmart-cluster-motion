import { motion } from 'framer-motion';
import Button from './Button';
import ApperIcon from '@/components/ApperIcon';

const ErrorState = ({ 
  title = "Something went wrong",
  message = "We encountered an error while loading this content.",
  onRetry,
  retryLabel = "Try Again"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <motion.div
        animate={{ 
          rotate: [0, 10, -10, 0],
          transition: { repeat: Infinity, duration: 2 }
        }}
      >
        <ApperIcon name="AlertCircle" className="w-16 h-16 text-red-400 mb-4" />
      </motion.div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-center max-w-md mb-6">{message}</p>
      
      {onRetry && (
        <Button
          variant="primary"
          icon="RefreshCw"
          onClick={onRetry}
        >
          {retryLabel}
        </Button>
      )}
    </motion.div>
  );
};

export default ErrorState;