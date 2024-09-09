import { Uuid } from '../../shared/domain/value-objects/uuid.value-object';

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
    return new Category(params);
  }

  changeName(name: string): void {
    this.name = name;
  }

  changeDescription(description: string): void {
    this.description = description;
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
