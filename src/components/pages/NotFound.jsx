import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            transition: { repeat: Infinity, duration: 3 }
          }}
          className="mb-8"
        >
          <ApperIcon name="Package" className="w-24 h-24 text-gray-300 mx-auto" />
        </motion.div>
        
        <h1 className="text-6xl font-heading font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for seems to have been delivered to the wrong address.
        </p>
        
        <div className="space-y-4">
          <Button
            variant="primary"
            size="lg"
            icon="Home"
            onClick={() => navigate('/')}
            fullWidth
          >
            Back to Home
          </Button>
          <Button
            variant="outline"
            size="lg"
            icon="ArrowLeft"
            onClick={() => navigate(-1)}
            fullWidth
          >
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;