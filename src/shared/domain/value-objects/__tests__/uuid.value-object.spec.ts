import { InvalidUuidError, Uuid } from '../uuid.value-object';
import { v4 as uuidV4, validate as uuidValidate } from 'uuid';

describe('UUID ValueObject Unit Tests', () => {
  const validateSpy = jest.spyOn(Uuid.prototype as any, 'validate');

  test('should throw error when id is invalid', () => {
    expect(() => {
      new Uuid('invalid')
    }).toThrow(new InvalidUuidError());

    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  test('should create a valid UUID when id is not provided', () => {
    const uuid = new Uuid();

    expect(uuid.id).toBeDefined();
    expect(uuidValidate(uuid.id)).toBe(true);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  test('should accept a valid UUID when id is provided', () => {
    const id = 'f1b0e9b4-4f2b-4b3e-9c4b-3b7c2d1e3f4d';
    const uuid = new Uuid(id);

    expect(uuid.id).toBe(id);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});
