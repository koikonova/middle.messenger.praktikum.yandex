import { expect } from 'chai';
import { ValidationError } from './index';

describe('ValidationError', () => {
  //@ts-ignore
  const validation = new ValidationError({});

  it('must have a class validationError', () => {
    const validationError =
      validation.element!.classList.contains('validationError');
    expect(validationError).to.equal(true);
  });

  it('must have a class displayNone', () => {
    const displayNone =
      validation.element!.classList.contains('displayNone');
    expect(displayNone).to.equal(true);
  });
});