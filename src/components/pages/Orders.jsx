import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import Header from '@/components/organisms/Header';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import SkeletonLoader from '@/components/atoms/SkeletonLoader';
import ErrorState from '@/components/atoms/ErrorState';
import EmptyState from '@/components/atoms/EmptyState';
import ApperIcon from '@/components/ApperIcon';
import { useOrders } from '@/context/OrderContext';

const Orders = () => {
  const navigate = useNavigate();
  const { orders, loading, error, loadOrders } = useOrders();

  useEffect(() => {
    loadOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'info';
      case 'preparing':
        return 'warning';
      case 'delivering':
        return 'primary';
      case 'delivered':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Order Confirmed';
      case 'preparing':
        return 'Preparing';
      case 'delivering':
        return 'On the Way';
      case 'delivered':
        return 'Delivered';
      default:
        return status;
    }
  };

  const handleOrderClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-2">
                    <SkeletonLoader className="h-5 w-32" />
                    <SkeletonLoader className="h-4 w-48" />
                  </div>
                  <SkeletonLoader className="h-6 w-20" />
                </div>
                <SkeletonLoader className="h-4 w-full mb-2" />
                <SkeletonLoader className="h-4 w-3/4" />
              </div>
            ))}
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
            title="Failed to Load Orders"
            message={error}
            onRetry={loadOrders}
          />
        </main>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <EmptyState
            icon="Package"
            title="No orders yet"
            description="Your order history will appear here once you place your first order."
            actionLabel="Start Shopping"
            onAction={() => navigate('/')}
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
          className="mb-8"
        >
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            Your Orders
          </h1>
          <p className="text-gray-600">
            Track and manage your order history
          </p>
        </motion.div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order, index) => (
            <motion.div
              key={order.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleOrderClick(order.Id)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-900">
                      Order #{order.Id}
                    </h3>
                    <Badge variant={getStatusColor(order.status)}>
                      {getStatusText(order.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    ${order.total.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <ApperIcon name="MapPin" className="w-4 h-4" />
                  <span className="truncate max-w-xs">{order.address}</span>
                </div>
                <div className="flex items-center space-x-4">
                  {order.status !== 'delivered' && (
                    <div className="flex items-center space-x-1 text-sm text-accent">
                      <ApperIcon name="Clock" className="w-4 h-4" />
                      <span>{order.deliveryTime}</span>
                    </div>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOrderClick(order.Id);
                    }}
                  >
                    {order.status === 'delivered' ? 'View Details' : 'Track Order'}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Orders;