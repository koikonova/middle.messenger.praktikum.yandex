import { expect } from 'chai';
import { ValidationError } from './index';

describe('ValidationError', () => {
  //@ts-ignore
  const validation = new ValidationError({});

  it('должен иметь класс validationError', () => {
    const validationError =
      validation.element!.classList.contains('validationError');
    expect(validationError).to.equal(true);
  });

  it('должен иметь класс displayNone', () => {
    const displayNone =
      validation.element!.classList.contains('displayNone');
    expect(displayNone).to.equal(true);
  });
});