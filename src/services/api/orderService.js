import orderData from '@/services/mockData/orders.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class OrderService {
  constructor() {
    this.orders = [...orderData];
  }

  async getAll() {
    await delay(300);
    return [...this.orders];
  }

  async getById(id) {
    await delay(200);
    const order = this.orders.find(o => o.Id === parseInt(id, 10));
    if (!order) {
      throw new Error('Order not found');
    }
    return { ...order };
  }

  async create(orderData) {
    await delay(400);
    const newOrder = {
      ...orderData,
      Id: Math.max(...this.orders.map(o => o.Id), 0) + 1,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + (orderData.deliveryTime || 15) * 60000).toISOString()
    };
    this.orders.push(newOrder);
    return { ...newOrder };
  }

  async update(id, orderData) {
    await delay(300);
    const index = this.orders.findIndex(o => o.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Order not found');
    }
    
    const updatedOrder = {
      ...this.orders[index],
      ...orderData,
      Id: this.orders[index].Id // Prevent Id modification
    };
    
    this.orders[index] = updatedOrder;
    return { ...updatedOrder };
  }

  async updateStatus(id, status) {
    await delay(200);
    const index = this.orders.findIndex(o => o.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Order not found');
    }
    
    const updatedOrder = {
      ...this.orders[index],
      status
    };
    
    if (status === 'delivered') {
      updatedOrder.actualDelivery = new Date().toISOString();
    }
    
    this.orders[index] = updatedOrder;
    return { ...updatedOrder };
  }

  async delete(id) {
    await delay(200);
    const index = this.orders.findIndex(o => o.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Order not found');
    }
    
    const deletedOrder = { ...this.orders[index] };
    this.orders.splice(index, 1);
    return deletedOrder;
  }
}

export default new OrderService();