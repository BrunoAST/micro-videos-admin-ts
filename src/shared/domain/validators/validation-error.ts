import { FieldsErrors } from "./validator-fields-interface";

export class EntityValidationError extends Error {
  constructor(public error: FieldsErrors, public message = 'Validation error') {
    super(message);
    this.name = 'EntityValidationError';
  }

  count(): number {
    return Object.keys(this.error).length;
  }
}
