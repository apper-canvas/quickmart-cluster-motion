import productData from '@/services/mockData/products.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ProductService {
  constructor() {
    this.products = [...productData];
  }

  async getAll() {
    await delay(300);
    return [...this.products];
  }

  async getById(id) {
    await delay(200);
    const product = this.products.find(p => p.Id === parseInt(id, 10));
    if (!product) {
      throw new Error('Product not found');
    }
    return { ...product };
  }

  async getByCategory(category) {
    await delay(300);
    return this.products.filter(p => p.category === category).map(p => ({ ...p }));
  }

  async search(query) {
    await delay(250);
    const searchTerm = query.toLowerCase();
    return this.products
      .filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
      )
      .map(p => ({ ...p }));
  }

  async getFeatured() {
    await delay(200);
    // Return first 6 products as featured
    return this.products.slice(0, 6).map(p => ({ ...p }));
  }

  async create(product) {
    await delay(300);
    const newProduct = {
      ...product,
      Id: Math.max(...this.products.map(p => p.Id), 0) + 1
    };
    this.products.push(newProduct);
    return { ...newProduct };
  }

  async update(id, productData) {
    await delay(300);
    const index = this.products.findIndex(p => p.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Product not found');
    }
    
    const updatedProduct = {
      ...this.products[index],
      ...productData,
      Id: this.products[index].Id // Prevent Id modification
    };
    
    this.products[index] = updatedProduct;
    return { ...updatedProduct };
  }

  async delete(id) {
    await delay(200);
    const index = this.products.findIndex(p => p.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Product not found');
    }
    
    const deletedProduct = { ...this.products[index] };
    this.products.splice(index, 1);
    return deletedProduct;
  }
}

export default new ProductService();