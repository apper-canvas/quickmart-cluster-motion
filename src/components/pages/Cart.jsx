import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/organisms/Header';
import CartItem from '@/components/molecules/CartItem';
import Button from '@/components/atoms/Button';
import EmptyState from '@/components/atoms/EmptyState';
import ApperIcon from '@/components/ApperIcon';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, getTotalPrice, getTotalItems, clearCart } = useCart();

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const deliveryFee = totalPrice > 25 ? 0 : 2.99;
  const finalTotal = totalPrice + deliveryFee;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <EmptyState
            icon="ShoppingCart"
            title="Your cart is empty"
            description="Add some delicious items to your cart and they'll appear here."
            actionLabel="Start Shopping"
            onAction={handleContinueShopping}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-gray-900">
              Shopping Cart
            </h1>
            <p className="text-gray-600 mt-1">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            icon="Trash2"
            onClick={handleClearCart}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            Clear Cart
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <CartItem
                key={item.productId}
                item={item}
                index={index}
              />
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit sticky top-24"
          >
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-6">
              Order Summary
            </h2>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({totalItems} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>
                  {deliveryFee === 0 ? (
                    <span className="text-accent font-medium">FREE</span>
                  ) : (
                    `$${deliveryFee.toFixed(2)}`
                  )}
                </span>
              </div>
              {deliveryFee > 0 && (
                <p className="text-xs text-gray-500">
                  Free delivery on orders over $25
                </p>
              )}
              <hr className="border-gray-200" />
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-accent/10 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <ApperIcon name="Clock" className="w-5 h-5 text-accent" />
                <span className="font-medium text-accent">Fast Delivery</span>
              </div>
              <p className="text-sm text-gray-600">
                Your order will be delivered within 10-15 minutes
              </p>
            </div>

            {/* Checkout Button */}
            <Button
              variant="accent"
              size="lg"
              icon="CreditCard"
              onClick={handleCheckout}
              fullWidth
              className="mb-4"
            >
              Proceed to Checkout
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleContinueShopping}
              fullWidth
            >
              Continue Shopping
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Cart;