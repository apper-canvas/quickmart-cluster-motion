import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Header from '@/components/organisms/Header';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import ApperIcon from '@/components/ApperIcon';
import { useCart } from '@/context/CartContext';
import { useOrders } from '@/context/OrderContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getTotalPrice, getTotalItems, clearCart } = useCart();
  const { createOrder } = useOrders();
  const [loading, setLoading] = useState(false);
  
  const [deliveryAddress, setDeliveryAddress] = useState({
    name: '',
    phone: '',
    address: '',
    apartment: '',
    instructions: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('card');

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const deliveryFee = totalPrice > 25 ? 0 : 2.99;
  const finalTotal = totalPrice + deliveryFee;

  const handleAddressChange = (field, value) => {
    setDeliveryAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePlaceOrder = async () => {
    if (!deliveryAddress.name || !deliveryAddress.phone || !deliveryAddress.address) {
      toast.error('Please fill in all required delivery details');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        items: cart,
        total: finalTotal,
        deliveryTime: '12 mins',
        address: `${deliveryAddress.address}${deliveryAddress.apartment ? ', ' + deliveryAddress.apartment : ''}`,
        customerName: deliveryAddress.name,
        customerPhone: deliveryAddress.phone,
        instructions: deliveryAddress.instructions,
        paymentMethod
      };

      const newOrder = await createOrder(orderData);
      clearCart();
      toast.success('Order placed successfully!');
      navigate(`/order/${newOrder.Id}`);
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            Checkout
          </h1>
          <p className="text-gray-600">
            Complete your order in just a few steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Delivery Address */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex items-center space-x-2 mb-6">
                <ApperIcon name="MapPin" className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-heading font-bold text-gray-900">
                  Delivery Address
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name *"
                  value={deliveryAddress.name}
                  onChange={(e) => handleAddressChange('name', e.target.value)}
                  placeholder="Enter your full name"
                />
                <Input
                  label="Phone Number *"
                  type="tel"
                  value={deliveryAddress.phone}
                  onChange={(e) => handleAddressChange('phone', e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="mt-4">
                <Input
                  label="Street Address *"
                  value={deliveryAddress.address}
                  onChange={(e) => handleAddressChange('address', e.target.value)}
                  placeholder="Enter your street address"
                />
              </div>

              <div className="mt-4">
                <Input
                  label="Apartment, Suite, etc."
                  value={deliveryAddress.apartment}
                  onChange={(e) => handleAddressChange('apartment', e.target.value)}
                  placeholder="Apartment, suite, floor, etc."
                />
              </div>

              <div className="mt-4">
                <Input
                  label="Delivery Instructions"
                  value={deliveryAddress.instructions}
                  onChange={(e) => handleAddressChange('instructions', e.target.value)}
                  placeholder="Any special instructions for delivery"
                />
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex items-center space-x-2 mb-6">
                <ApperIcon name="CreditCard" className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-heading font-bold text-gray-900">
                  Payment Method
                </h2>
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-primary"
                  />
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="CreditCard" className="w-5 h-5" />
                    <span>Credit/Debit Card</span>
                  </div>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-primary"
                  />
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="Banknote" className="w-5 h-5" />
                    <span>Cash on Delivery</span>
                  </div>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="wallet"
                    checked={paymentMethod === 'wallet'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-primary"
                  />
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="Wallet" className="w-5 h-5" />
                    <span>Digital Wallet</span>
                  </div>
                </label>
              </div>
            </motion.div>
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

            {/* Items */}
            <div className="space-y-3 mb-6">
              {cart.map((item) => (
                <div key={item.productId} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

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
              <hr className="border-gray-200" />
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Delivery Time */}
            <div className="bg-accent/10 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <ApperIcon name="Clock" className="w-5 h-5 text-accent" />
                <span className="font-medium text-accent">Estimated Delivery</span>
              </div>
              <p className="text-sm text-gray-600">
                12-15 minutes from order confirmation
              </p>
            </div>

            {/* Place Order Button */}
            <Button
              variant="accent"
              size="lg"
              icon={loading ? "Loader2" : "CheckCircle"}
              onClick={handlePlaceOrder}
              disabled={loading}
              loading={loading}
              fullWidth
            >
              {loading ? 'Placing Order...' : `Place Order - $${finalTotal.toFixed(2)}`}
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;