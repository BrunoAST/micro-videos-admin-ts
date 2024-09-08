import { Category } from "../category.entity";

describe('Category Unit Tests', () => {
  describe('Constructor', () => {
    test('should create a category with default values', () => {
      const category = new Category({
        name: 'Movie',
        createdAt: new Date()
      });

      expect(category.categoryId).toBeUndefined();
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBe(true);
      expect(category.createdAt).toBeInstanceOf(Date);
    });

    test('should create a cateogry with description', () => {
      const createdAt = new Date();
      const category = new Category({
        name: 'Series',
        description: 'Series description',
        is_active: false,
        createdAt
      });

      expect(category.categoryId).toBeUndefined();
      expect(category.name).toBe('Series');
      expect(category.description).toBe('Series description');
      expect(category.is_active).toBe(false);
      expect(category.createdAt).toBe(createdAt);
    });
  });

  describe('Create command', () => {
    test('should create category', () => {
      const category = Category.create({
        name: 'Movie'
      });

      expect(category.categoryId).toBeUndefined();
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBe(true);
      expect(category.createdAt).toBeInstanceOf(Date);
    });

    test('should create category with description', () => {
      const category = Category.create({
        name: 'Series',
        description: 'Series description',
      });

      expect(category.categoryId).toBeUndefined();
      expect(category.name).toBe('Series');
      expect(category.description).toBe('Series description');
      expect(category.is_active).toBe(true);
      expect(category.createdAt).toBeInstanceOf(Date);
    });

    test('should create category with is_active', () => {
      const category = Category.create({
        name: 'Series',
        is_active: false,
      });

      expect(category.categoryId).toBeUndefined();
      expect(category.name).toBe('Series');
      expect(category.description).toBeNull();
      expect(category.is_active).toBe(false);
      expect(category.createdAt).toBeInstanceOf(Date);
    });
  });

  describe('Change key values', () => {
    test('should change name', () => {
      const category = new Category({
        name: 'Movie',
        createdAt: new Date()
      });

      category.changeName('Series');
      expect(category.name).toBe('Series');
    });

    test('should change description', () => {
      const category = new Category({
        name: 'Movie',
        createdAt: new Date()
      });

      category.changeDescription('Movie description');
      expect(category.description).toBe('Movie description');
    });

    test('should activate category', () => {
      const category = new Category({
        name: 'Movie',
        createdAt: new Date()
      });

      category.deactivate();
      expect(category.is_active).toBe(false);
    });

    test('should deactivate category', () => {
      const category = new Category({
        name: 'Movie',
        createdAt: new Date()
      });

      category.activate();
      expect(category.is_active).toBe(true);
    });
  });
});
