import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary/50 shadow-sm',
    secondary: 'bg-secondary text-gray-900 hover:bg-secondary/90 focus:ring-secondary/50 shadow-sm',
    accent: 'bg-accent text-white hover:bg-accent/90 focus:ring-accent/50 shadow-sm',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary/50',
    ghost: 'text-gray-600 hover:text-primary hover:bg-primary/10 focus:ring-primary/50',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500/50 shadow-sm'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const buttonClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `.trim();

  const iconElement = icon && (
    <ApperIcon 
      name={loading ? 'Loader2' : icon} 
      className={`${iconSizes[size]} ${loading ? 'animate-spin' : ''}`} 
    />
  );

  return (
    <motion.button
      whileHover={disabled || loading ? {} : { scale: 1.05 }}
      whileTap={disabled || loading ? {} : { scale: 0.95 }}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {iconPosition === 'left' && iconElement && (
        <span className={children ? 'mr-2' : ''}>{iconElement}</span>
      )}
      {children}
      {iconPosition === 'right' && iconElement && (
        <span className={children ? 'ml-2' : ''}>{iconElement}</span>
      )}
    </motion.button>
  );
};

export default Button;