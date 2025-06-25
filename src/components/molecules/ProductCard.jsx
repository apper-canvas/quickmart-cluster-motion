import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';
import { useCart } from '@/context/CartContext';

const ProductCard = ({ product, index = 0 }) => {
  const navigate = useNavigate();
  const { addToCart, getItemQuantity, updateQuantity } = useCart();
  const currentQuantity = getItemQuantity(product.Id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    updateQuantity(product.Id.toString(), currentQuantity + 1);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    if (currentQuantity > 1) {
      updateQuantity(product.Id.toString(), currentQuantity - 1);
    } else {
      updateQuantity(product.Id.toString(), 0);
    }
  };

  const handleClick = () => {
    navigate(`/product/${product.Id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden group"
      onClick={handleClick}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="error" size="sm">Out of Stock</Badge>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge variant="success" size="sm" className="bg-accent text-white">
            <ApperIcon name="Zap" className="w-3 h-3 mr-1" />
            10 min
          </Badge>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex flex-col items-end ml-2">
            <span className="text-lg font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-xs text-gray-500">{product.unit}</span>
          </div>
        </div>

        {/* Add to Cart / Quantity Controls */}
        <div className="flex items-center justify-between mt-3">
          {currentQuantity === 0 ? (
            <Button
              variant="accent"
              size="sm"
              icon="Plus"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1"
            >
              Add to Cart
            </Button>
          ) : (
            <div className="flex items-center justify-between w-full">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDecrement}
                className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              >
                <ApperIcon name="Minus" className="w-4 h-4" />
              </motion.button>
              
              <span className="mx-4 font-semibold text-lg min-w-[2rem] text-center">
                {currentQuantity}
              </span>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleIncrement}
                className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center hover:bg-accent/90 transition-colors"
              >
                <ApperIcon name="Plus" className="w-4 h-4" />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;