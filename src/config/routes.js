import Home from '@/components/pages/Home';
import Category from '@/components/pages/Category';
import Product from '@/components/pages/Product';
import Cart from '@/components/pages/Cart';
import Checkout from '@/components/pages/Checkout';
import Orders from '@/components/pages/Orders';
import OrderTracking from '@/components/pages/OrderTracking';

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: 'Home',
    component: Home,
    showInNav: true
  },
  category: {
    id: 'category',
    label: 'Categories',
    path: '/category/:categoryId',
    icon: 'Grid3X3',
    component: Category,
    showInNav: false
  },
  product: {
    id: 'product',
    label: 'Product',
    path: '/product/:productId',
    icon: 'Package',
    component: Product,
    showInNav: false
  },
  cart: {
    id: 'cart',
    label: 'Cart',
    path: '/cart',
    icon: 'ShoppingCart',
    component: Cart,
    showInNav: true
  },
  checkout: {
    id: 'checkout',
    label: 'Checkout',
    path: '/checkout',
    icon: 'CreditCard',
    component: Checkout,
    showInNav: false
  },
  orders: {
    id: 'orders',
    label: 'Orders',
    path: '/orders',
    icon: 'Package',
    component: Orders,
    showInNav: true
  },
  orderTracking: {
    id: 'orderTracking',
    label: 'Track Order',
    path: '/order/:orderId',
    icon: 'MapPin',
    component: OrderTracking,
    showInNav: false
  }
};

export const routeArray = Object.values(routes);
export default routes;