import { EntityValidationError } from '../../shared/domain/validators/validation-error';
import { Uuid } from '../../shared/domain/value-objects/uuid.value-object';
import { CategoryValidatorFactory } from './cateogry.validator';

export type CategoryParams = {
  category_id?: Uuid;
  name: string;
  description?: string | null;
  is_active?: boolean;
  createdAt?: Date;
};

export type CategoryCreateCommand = {
  name: string;
  description?: string | null;
  is_active?: boolean;
};

export class Category {
  category_id: Uuid;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;

  constructor(params: CategoryParams) {
    this.category_id = params.category_id ?? new Uuid();
    this.name = params.name;
    this.description = params.description ?? null;
    this.is_active = params.is_active ?? true;
    this.created_at = params.createdAt ?? new Date();
  }

  static create(params: CategoryCreateCommand): Category {
    const category = new Category(params);
    Category.validate(category);
    return category;
  }

  static validate(entity: Category) {
    const validator = CategoryValidatorFactory.create();
    const isValid = validator.validate(entity);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  changeName(name: string): void {
    this.name = name;
    Category.validate(this);
  }

  changeDescription(description: string): void {
    this.description = description;
    Category.validate(this);
  }

  activate(): void {
    this.is_active = true;
  }

  deactivate(): void {
    this.is_active = false;
  }

  toJSON() {
    return {
      category_id: this.category_id.id,
      name: this.name,
      description: this.description,
      is_active: this.is_active,
      created_at: this.created_at,
    };
  }
}
