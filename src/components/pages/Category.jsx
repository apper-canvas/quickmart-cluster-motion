import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/organisms/Header';
import ProductGrid from '@/components/organisms/ProductGrid';
import Button from '@/components/atoms/Button';
import SkeletonLoader from '@/components/atoms/SkeletonLoader';
import ErrorState from '@/components/atoms/ErrorState';
import categoryService from '@/services/api/categoryService';

const Category = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategory = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await categoryService.getBySlug(categoryId);
        setCategory(result);
      } catch (err) {
        setError(err.message || 'Failed to load category');
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      loadCategory();
    }
  }, [categoryId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-8">
            <SkeletonLoader className="h-8 w-48 mb-4" />
            <SkeletonLoader className="h-4 w-96" />
          </div>
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
            title="Category Not Found"
            message={error}
            onRetry={() => navigate('/')}
            retryLabel="Go Home"
          />
        </main>
      </div>
    );
  }

  if (!category) {
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
          <span className="text-gray-900 font-medium">{category.name}</span>
        </motion.div>

        {/* Category Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: category.color }}
            >
              <span className="text-2xl text-white">{category.icon}</span>
            </div>
            <div>
              <h1 className="text-3xl font-heading font-bold text-gray-900">
                {category.name}
              </h1>
              <p className="text-gray-600">
                Fresh {category.name.toLowerCase()} delivered in 10 minutes
              </p>
            </div>
          </div>
        </motion.section>

        {/* Products */}
        <ProductGrid category={category.slug} />
      </main>
    </div>
  );
};

export default Category;