import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/organisms/Header';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import SkeletonLoader from '@/components/atoms/SkeletonLoader';
import ErrorState from '@/components/atoms/ErrorState';
import ApperIcon from '@/components/ApperIcon';
import { useCart } from '@/context/CartContext';
import productService from '@/services/api/productService';

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart, getItemQuantity, updateQuantity } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentQuantity = product ? getItemQuantity(product.Id) : 0;

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await productService.getById(productId);
        setProduct(result);
      } catch (err) {
        setError(err.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const handleIncrement = () => {
    updateQuantity(product.Id.toString(), currentQuantity + 1);
  };

  const handleDecrement = () => {
    if (currentQuantity > 1) {
      updateQuantity(product.Id.toString(), currentQuantity - 1);
    } else {
      updateQuantity(product.Id.toString(), 0);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <SkeletonLoader className="aspect-square rounded-xl" />
            </div>
            <div className="space-y-6">
              <div>
                <SkeletonLoader className="h-8 w-3/4 mb-4" />
                <SkeletonLoader className="h-4 w-1/2 mb-2" />
                <SkeletonLoader className="h-6 w-1/3" />
              </div>
              <SkeletonLoader className="h-24 w-full" />
              <SkeletonLoader className="h-12 w-full" />
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
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <ErrorState
            title="Product Not Found"
            message={error}
            onRetry={() => navigate('/')}
            retryLabel="Go Home"
          />
        </main>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2 text-sm text-gray-500 mb-6"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-primary p-0"
          >
            Home
          </Button>
          <span>/</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/category/${product.category}`)}
            className="text-gray-500 hover:text-primary p-0"
          >
            {product.category}
          </Button>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </motion.div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-square bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="error" size="lg">Out of Stock</Badge>
                </div>
              )}
              <div className="absolute top-4 right-4">
                <Badge variant="success" className="bg-accent text-white">
                  <ApperIcon name="Zap" className="w-4 h-4 mr-1" />
                  10 min delivery
                </Badge>
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Title and Price */}
            <div>
              <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-gray-600 mb-4">{product.unit}</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-gray-500">per {product.unit}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-sm">
                <ApperIcon name="Clock" className="w-4 h-4 text-accent" />
                <span className="text-gray-600">10 min delivery</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <ApperIcon name="Shield" className="w-4 h-4 text-accent" />
                <span className="text-gray-600">Fresh guarantee</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <ApperIcon name="Truck" className="w-4 h-4 text-accent" />
                <span className="text-gray-600">Free delivery</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <ApperIcon name="RotateCcw" className="w-4 h-4 text-accent" />
                <span className="text-gray-600">Easy returns</span>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              {currentQuantity === 0 ? (
                <Button
                  variant="accent"
                  size="lg"
                  icon="Plus"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  fullWidth
                  className="text-lg py-4"
                >
                  Add to Cart - ${product.price.toFixed(2)}
                </Button>
              ) : (
                <div className="flex items-center justify-between bg-white rounded-lg p-4 border-2 border-accent">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleDecrement}
                    className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    <ApperIcon name="Minus" className="w-5 h-5" />
                  </motion.button>
                  
                  <div className="text-center">
                    <span className="text-2xl font-bold text-gray-900">
                      {currentQuantity}
                    </span>
                    <p className="text-sm text-gray-500">in cart</p>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleIncrement}
                    className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center hover:bg-accent/90 transition-colors"
                  >
                    <ApperIcon name="Plus" className="w-5 h-5" />
                  </motion.button>
                </div>
              )}

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="lg"
                  icon="Heart"
                  className="flex-1"
                >
                  Save for Later
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  icon="Share"
                  className="flex-1"
                >
                  Share
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Product;