import { IRepository } from '../../shared/domain/repository/repository.interface';
import { Uuid } from '../../shared/domain/value-objects/uuid.value-object';
import { Category } from './category.entity';

/**
 * We define an interface because this will allow us to have different implementations, such as
 * a repository for a database or a repository for an in-memory storage.
 */ 
export interface ICategoryRepository extends IRepository<Category, Uuid> { }
