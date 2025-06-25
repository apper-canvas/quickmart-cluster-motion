import { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

const SearchBar = ({ onSearch, placeholder = "Search products...", className = '' }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className={`relative ${className}`}
    >
      <div className="relative">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          icon="Search"
          iconPosition="left"
          className="pr-24"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              icon="X"
              onClick={handleClear}
              className="mr-1"
            />
          )}
          <Button
            type="submit"
            variant="primary"
            size="sm"
            icon="Search"
            disabled={!query.trim()}
          />
        </div>
      </div>
    </motion.form>
  );
};

export default SearchBar;