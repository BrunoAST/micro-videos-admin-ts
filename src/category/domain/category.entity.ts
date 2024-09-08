export type CategoryParams = {
  categoryId?: string;
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
  categoryId: string;
  name: string;
  description: string | null;
  is_active: boolean;
  createdAt: Date;

  constructor(params: CategoryParams) {
    this.categoryId = params.categoryId;
    this.name = params.name;
    this.description = params.description ?? null;
    this.is_active = params.is_active ?? true;
    this.createdAt = params.createdAt ?? new Date();
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
      categoryId: this.categoryId,
      name: this.name,
      description: this.description,
      is_active: this.is_active,
      createdAt: this.createdAt,
    };
  }
}
