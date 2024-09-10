import { Uuid } from '../../../shared/domain/value-objects/uuid.value-object';
import { Category } from '../category.entity';

describe('Category Unit Tests', () => {
  let validateSpy: jest.SpyInstance;

  beforeEach(() => {
    validateSpy = jest.spyOn(Category, 'validate');
  });

  describe('Constructor', () => {
    test('should create a category with default values', () => {
      const category = new Category({
        name: 'Movie',
        createdAt: new Date()
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBe(true);
      expect(category.created_at).toBeInstanceOf(Date);
    });

    test('should create a cateogry with description', () => {
      const createdAt = new Date();
      const category = new Category({
        name: 'Series',
        description: 'Series description',
        is_active: false,
        createdAt
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Series');
      expect(category.description).toBe('Series description');
      expect(category.is_active).toBe(false);
      expect(category.created_at).toBe(createdAt);
    });
  });

  describe('category_id field', () => {
    const arrange = [
      { id: null },
      { id: undefined },
      { id: new Uuid() }
    ];

    test.each(arrange)('should create a category with category_id: %p', ({ id }) => {
      const category = new Category({
        category_id: id as any,
        name: 'Movie',
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
    });
  });

  describe('Create command', () => {
    test('should create category', () => {
      const category = Category.create({
        name: 'Movie'
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBe(true);
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test('should create category with description', () => {
      const category = Category.create({
        name: 'Series',
        description: 'Series description',
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Series');
      expect(category.description).toBe('Series description');
      expect(category.is_active).toBe(true);
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test('should create category with is_active', () => {
      const category = Category.create({
        name: 'Series',
        is_active: false,
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Series');
      expect(category.description).toBeNull();
      expect(category.is_active).toBe(false);
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Change key values', () => {
    test('should change name', () => {
      const category = Category.create({
        name: 'Movie'
      });

      category.changeName('Series');
      expect(category.name).toBe('Series');
      expect(validateSpy).toHaveBeenCalledTimes(2);
    });

    test('should change description', () => {
      const category = Category.create({
        name: 'Movie'
      });

      category.changeDescription('Movie description');
      expect(category.description).toBe('Movie description');
      expect(validateSpy).toHaveBeenCalledTimes(2);
    });

    test('should activate category', () => {
      const category = Category.create({
        name: 'Movie'
      });

      category.deactivate();
      expect(category.is_active).toBe(false);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test('should deactivate category', () => {
      const category = Category.create({
        name: 'Movie'
      });

      category.activate();
      expect(category.is_active).toBe(true);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Category Validator Unit Tests', () => {
  describe('create command', () => {
    test('should invalid category with name property', () => {
      expect(() => Category.create({ name: null })).containsErrorMessage({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      });

      expect(() => Category.create({ name: '' })).containsErrorMessage({
        name: [
          'name should not be empty',
        ]
      });

      expect(() => Category.create({ name: 5 as any })).containsErrorMessage({
        name: [
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      });

      expect(() => Category.create({ name: 'a'.repeat(256) })).containsErrorMessage({
        name: [
          'name must be shorter than or equal to 255 characters'
        ]
      });
    });

    test('should invalid category with description property', () => {
      expect(() => Category.create({ description: 5 } as any)).containsErrorMessage({
        description: [
          'description must be a string',
        ]
      });
    });

    test('should invalid category using is_active property', () => {
      expect(() => Category.create({ is_active: 5 } as any)).containsErrorMessage({
        is_active: [
          'is_active must be a boolean value',
        ]
      });
    });
  });

  describe('changeName method', () => {
    test('should invalid category using name property', () => {
      const category = Category.create({ name: 'Movie' });

      expect(() => category.changeName(null)).containsErrorMessage({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      });

      expect(() => category.changeName('')).containsErrorMessage({
        name: [
          'name should not be empty',
        ]
      });

      expect(() => category.changeName(5 as any)).containsErrorMessage({
        name: [
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      });
    });
  });

  describe('changeDescription method', () => {
    test('should invalid category using description property', () => {
      const category = Category.create({ name: 'Movie' });

      expect(() => category.changeDescription(5 as any)).containsErrorMessage({
        description: [
          'description must be a string',
        ]
      });
    });
  });
});
