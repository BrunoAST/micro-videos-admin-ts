import { ClassValidatorFields } from '../../domain/validators/class-validator-fields';
import { EntityValidationError } from '../../domain/validators/validation-error';
import { FieldsErrors } from '../../domain/validators/validator-fields-interface';

type Expected = |
{
  validator: ClassValidatorFields<any>;
  data: any;
} |
  (() => any);

// For custom matchers, we need to extend the Jest namespace. This can be found in the jest.d.ts file.
// Also in the jest.config.js file, we need to add the `setupFilesAfterEnv` property to point to the file
// that contains the custom matchers.
expect.extend({
  containsErrorMessage: (expected: Expected, received: FieldsErrors) => {
    if (typeof expected === 'function') {
      try {
        expected();
        return isValid();
      } catch (e) {
        const error = e as EntityValidationError;
        return assertContainsErrorMessage(error.error, received);
      }
    } else {
      const { validator, data } = expected;
      const validated = validator.validate(data);

      if (validated) {
        return isValid();
      }

      return assertContainsErrorMessage(validator.errors, received);
    }
  }
});

function assertContainsErrorMessage(expected: FieldsErrors, received: FieldsErrors) {
  const isMatch = expect.objectContaining(received).asymmetricMatch(expected);

  return isMatch
    ? isValid()
    : { pass: false, message: () => `The validation errors not contains ${JSON.stringify(received)}. Current: ${JSON.stringify(expected)}` };
}

function isValid() {
  return { pass: true, message: () => '' };
}
