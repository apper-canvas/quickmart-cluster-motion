import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatDistanceToNow, format } from 'date-fns';
import Header from '@/components/organisms/Header';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import SkeletonLoader from '@/components/atoms/SkeletonLoader';
import ErrorState from '@/components/atoms/ErrorState';
import ApperIcon from '@/components/ApperIcon';
import { useOrders } from '@/context/OrderContext';

const OrderTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { getOrderById } = useOrders();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrder = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getOrderById(parseInt(orderId, 10));
        setOrder(result);
      } catch (err) {
        setError(err.message || 'Failed to load order');
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      loadOrder();
    }
  }, [orderId, getOrderById]);

  const getStatusSteps = () => [
    {
      id: 'confirmed',
      label: 'Order Confirmed',
      description: 'Your order has been confirmed',
      icon: 'CheckCircle'
    },
    {
      id: 'preparing',
      label: 'Preparing',
      description: 'Your order is being prepared',
      icon: 'ChefHat'
    },
    {
      id: 'delivering',
      label: 'On the Way',
      description: 'Your order is out for delivery',
      icon: 'Truck'
    },
    {
      id: 'delivered',
      label: 'Delivered',
      description: 'Your order has been delivered',
      icon: 'Package'
    }
  ];

  const getCurrentStepIndex = () => {
    const steps = getStatusSteps();
    return steps.findIndex(step => step.id === order?.status);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <SkeletonLoader className="h-8 w-48 mb-4" />
              <SkeletonLoader className="h-4 w-96 mb-6" />
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <SkeletonLoader className="w-8 h-8 rounded-full" />
                    <div className="flex-1">
                      <SkeletonLoader className="h-4 w-32 mb-1" />
                      <SkeletonLoader className="h-3 w-48" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorState
            title="Order Not Found"
            message={error}
            onRetry={() => navigate('/orders')}
            retryLabel="View All Orders"
          />
        </main>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  const statusSteps = getStatusSteps();
  const currentStepIndex = getCurrentStepIndex();

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
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-heading font-bold text-gray-900">
              Order #{order.Id}
            </h1>
            <Badge variant={order.status === 'delivered' ? 'success' : 'info'}>
              {statusSteps.find(step => step.id === order.status)?.label}
            </Badge>
          </div>
          <p className="text-gray-600">
            Placed {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Status */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
            >
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-6">
                Order Status
              </h2>

              <div className="space-y-6">
                {statusSteps.map((step, index) => {
                  const isActive = index <= currentStepIndex;
                  const isCurrent = index === currentStepIndex;
                  
                  return (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4"
                    >
                      <div className={`relative flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        isActive 
                          ? 'bg-accent text-white' 
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        <ApperIcon name={step.icon} className="w-4 h-4" />
                        {index < statusSteps.length - 1 && (
                          <div className={`absolute top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-8 ${
                            isActive ? 'bg-accent' : 'bg-gray-200'
                          }`} />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${
                          isActive ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {step.label}
                        </h3>
                        <p className={`text-sm ${
                          isActive ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {step.description}
                        </p>
                        {isCurrent && order.status !== 'delivered' && (
                          <div className="mt-2 flex items-center space-x-1 text-sm text-accent">
                            <ApperIcon name="Clock" className="w-4 h-4" />
                            <span>ETA: {order.deliveryTime}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Delivery Address */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-4">
                Delivery Address
              </h2>
              <div className="flex items-start space-x-3">
                <ApperIcon name="MapPin" className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-900">{order.address}</p>
                  {order.instructions && (
                    <p className="text-sm text-gray-500 mt-1">
                      Instructions: {order.instructions}
                    </p>
                  )}
                </div>
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
              {order.items.map((item) => (
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

            {/* Total */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Order Date */}
            <div className="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-500">
              <p>Order placed on</p>
              <p className="font-medium text-gray-900">
                {format(new Date(order.createdAt), 'PPpp')}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-3">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => navigate('/orders')}
              >
                View All Orders
              </Button>
              <Button
                variant="primary"
                size="sm"
                fullWidth
                onClick={() => navigate('/')}
              >
                Order Again
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default OrderTracking;