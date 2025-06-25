import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/molecules/ProductCard';
import SkeletonLoader from '@/components/atoms/SkeletonLoader';
import ErrorState from '@/components/atoms/ErrorState';
import EmptyState from '@/components/atoms/EmptyState';
import productService from '@/services/api/productService';

const ProductGrid = ({ category, searchQuery, featured = false }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        let result;
        if (searchQuery) {
          result = await productService.search(searchQuery);
        } else if (category) {
          result = await productService.getByCategory(category);
        } else if (featured) {
          result = await productService.getFeatured();
        } else {
          result = await productService.getAll();
        }
        setProducts(result);
      } catch (err) {
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category, searchQuery, featured]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100">
            <SkeletonLoader className="aspect-square rounded-t-xl" />
            <div className="p-4 space-y-2">
              <SkeletonLoader className="h-4 w-3/4" />
              <SkeletonLoader className="h-4 w-1/2" />
              <SkeletonLoader className="h-8 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (products.length === 0) {
    const emptyMessage = searchQuery
      ? `No products found for "${searchQuery}"`
      : category
        ? `No products found in ${category} category`
        : 'No products available';

    return (
      <EmptyState
        title="No Products Found"
        description={emptyMessage}
        actionLabel="Browse Categories"
        onAction={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.Id}
          product={product}
          index={index}
        />
      ))}
    </motion.div>
  );
};

export default ProductGrid;