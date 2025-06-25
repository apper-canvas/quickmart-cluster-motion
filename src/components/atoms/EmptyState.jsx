import { motion } from 'framer-motion';
import Button from './Button';
import ApperIcon from '@/components/ApperIcon';

const EmptyState = ({ 
  title = "Nothing here yet",
  description = "No items to display at the moment.",
  actionLabel,
  onAction,
  icon = "Package"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          transition: { repeat: Infinity, duration: 3 }
        }}
      >
        <ApperIcon name={icon} className="w-16 h-16 text-gray-300 mb-4" />
      </motion.div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-center max-w-md mb-6">{description}</p>
      
      {actionLabel && onAction && (
        <Button
          variant="primary"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};

export default EmptyState;