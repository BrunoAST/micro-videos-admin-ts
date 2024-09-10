import { Entity } from '../../../../domain/entity';
import { NotFoundError } from '../../../../domain/errors/not-found.error';
import { Uuid } from '../../../../domain/value-objects/uuid.value-object';
import { InMemoryRepository } from '../in-memory.repository';

type StubEntityConstructor = {
  entity_id: Uuid;
  name: string;
  price: number;
};

class StubEntity extends Entity {
  entity_id: Uuid;
  name: string;
  price: number;

  constructor(props: StubEntityConstructor) {
    super();
    this.entity_id = props.entity_id || new Uuid();
    this.name = props.name;
    this.price = props.price;
  }

  toJSON() {
    return {
      entity_id: this.entity_id.toString(),
      name: this.name,
      price: this.price,
    };
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity, Uuid> {
  getEntity(): new (...args: any) => StubEntity {
    return StubEntity;
  }
}

describe('InMemoryRepository Unit Tests', () => {
  let repo: StubInMemoryRepository;

  beforeEach(() => {
    repo = new StubInMemoryRepository();
  });

  test('should insert a new entity', async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: 'Product 1',
      price: 100,
    });

    await repo.insert(entity);

    const result = await repo.findById(entity.entity_id);

    expect(result).toEqual(entity);
    expect(repo.items).toHaveLength(1);
  });

  test('should bulk insert entities', async () => {
    const entities = [
      new StubEntity({
        entity_id: new Uuid(),
        name: 'Product 1',
        price: 100,
      }),
      new StubEntity({
        entity_id: new Uuid(),
        name: 'Product 2',
        price: 200,
      }),
    ];

    await repo.bulkInsert(entities);

    const result = await repo.findAll();

    expect(result).toEqual(entities);
    expect(repo.items).toHaveLength(2);
  });

  test('should return all entities', async () => {
    const entities = [
      new StubEntity({
        entity_id: new Uuid(),
        name: 'Product 1',
        price: 100,
      }),
      new StubEntity({
        entity_id: new Uuid(),
        name: 'Product 2',
        price: 200,
      }),
    ];

    await repo.bulkInsert(entities);

    const result = await repo.findAll();

    expect(result).toEqual(entities);
  });

  test('should throw error when entity not found', async () => {
    const entity = new StubEntity({
      name: 'Product 1',
      price: 100,
    });

    await expect(repo.update(entity)).rejects.toThrow(new NotFoundError(entity.entity_id, StubEntity));
  });

  test('should update an entity', async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: 'Product 1',
      price: 100,
    });

    await repo.insert(entity);

    entity.name = 'Product 2';
    entity.price = 200;

    await repo.update(entity);

    const result = await repo.findById(entity.entity_id);

    expect(result.toJSON()).toStrictEqual(entity.toJSON());
  });

  test('should throw error on delete when entity not found', async () => {
    const entity_id = new Uuid();

    await expect(repo.delete(entity_id)).rejects.toThrow(new NotFoundError(entity_id, StubEntity));
  });

  test('should delete an entity', async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: 'Product 1',
      price: 100,
    });

    await repo.insert(entity);

    await repo.delete(entity.entity_id);

    const result = await repo.findById(entity.entity_id);

    expect(result).toBeNull();
    expect(repo.items).toHaveLength(0);
  });
});
