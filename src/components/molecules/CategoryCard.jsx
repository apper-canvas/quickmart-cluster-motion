import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const CategoryCard = ({ category, index = 0 }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${category.slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="relative bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden group"
    >
      {/* Background Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Category Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: category.color }}
            >
              <ApperIcon name={category.icon} className="w-5 h-5 text-white" />
            </div>
          </div>
          <h3 className="font-heading font-bold text-white text-lg">
            {category.name}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;