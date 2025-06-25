import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/organisms/Header';
import CategoryGrid from '@/components/organisms/CategoryGrid';
import ProductGrid from '@/components/organisms/ProductGrid';
import ApperIcon from '@/components/ApperIcon';

const Home = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Hero Section */}
        {!searchQuery && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 mb-8 text-white relative overflow-hidden"
          >
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Groceries delivered in
                <span className="block text-secondary">10 minutes ⚡</span>
              </h1>
              <p className="text-lg mb-6 text-primary-foreground/90 max-w-2xl">
                Get your everyday essentials delivered ultra-fast. Fresh produce, 
                dairy, snacks, and more - all at your doorstep in minutes.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Clock" className="w-5 h-5" />
                  <span className="font-medium">10 min delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Shield" className="w-5 h-5" />
                  <span className="font-medium">100% fresh guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Truck" className="w-5 h-5" />
                  <span className="font-medium">Free delivery</span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/20 rounded-full -mr-16 -mb-16" />
          </motion.section>
        )}

        {/* Categories Section */}
        {!searchQuery && (
          <section className="mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between mb-6"
            >
              <h2 className="text-2xl font-heading font-bold text-gray-900">
                Shop by Category
              </h2>
            </motion.div>
            <CategoryGrid />
          </section>
        )}

        {/* Products Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between mb-6"
          >
            <h2 className="text-2xl font-heading font-bold text-gray-900">
              {searchQuery 
                ? `Search results for "${searchQuery}"`
                : 'Featured Products'
              }
            </h2>
          </motion.div>
          <ProductGrid 
            searchQuery={searchQuery}
            featured={!searchQuery}
          />
        </section>
      </main>
    </div>
  );
};

export default Home;