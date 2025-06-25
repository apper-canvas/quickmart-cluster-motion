import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { useCart } from '@/context/CartContext';

const CartItem = ({ item, index = 0 }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrement = () => {
    updateQuantity(item.productId, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.productId, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.productId);
  };

  const totalPrice = item.price * item.quantity;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center space-x-4 bg-white p-4 rounded-lg border border-gray-100"
    >
      {/* Product Image */}
      <div className="flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-lg"
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.unit}</p>
        <p className="text-lg font-bold text-primary">${totalPrice.toFixed(2)}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDecrement}
          className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
        >
          <ApperIcon name="Minus" className="w-4 h-4" />
        </motion.button>
        
        <span className="font-semibold text-lg min-w-[2rem] text-center">
          {item.quantity}
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

      {/* Remove Button */}
      <Button
        variant="ghost"
        size="sm"
        icon="Trash2"
        onClick={handleRemove}
        className="text-red-500 hover:text-red-700 hover:bg-red-50"
      />
    </motion.div>
  );
};

export default CartItem;