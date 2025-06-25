import categoryData from '@/services/mockData/categories.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class CategoryService {
  constructor() {
    this.categories = [...categoryData];
  }

  async getAll() {
    await delay(200);
    return [...this.categories];
  }

  async getById(id) {
    await delay(150);
    const category = this.categories.find(c => c.Id === parseInt(id, 10));
    if (!category) {
      throw new Error('Category not found');
    }
    return { ...category };
  }

  async getBySlug(slug) {
    await delay(150);
    const category = this.categories.find(c => c.slug === slug);
    if (!category) {
      throw new Error('Category not found');
    }
    return { ...category };
  }

  async create(category) {
    await delay(300);
    const newCategory = {
      ...category,
      Id: Math.max(...this.categories.map(c => c.Id), 0) + 1
    };
    this.categories.push(newCategory);
    return { ...newCategory };
  }

  async update(id, categoryData) {
    await delay(300);
    const index = this.categories.findIndex(c => c.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Category not found');
    }
    
    const updatedCategory = {
      ...this.categories[index],
      ...categoryData,
      Id: this.categories[index].Id // Prevent Id modification
    };
    
    this.categories[index] = updatedCategory;
    return { ...updatedCategory };
  }

  async delete(id) {
    await delay(200);
    const index = this.categories.findIndex(c => c.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Category not found');
    }
    
    const deletedCategory = { ...this.categories[index] };
    this.categories.splice(index, 1);
    return deletedCategory;
  }
}

export default new CategoryService();