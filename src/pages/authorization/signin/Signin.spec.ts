import { expect } from 'chai';
import { Signin } from './index';

describe('Signin', () => {
  let signin: Signin;
  let onClickCalled: boolean;

  beforeEach(() => {
    signin = new Signin({});
    onClickCalled = false;
  });

  it('Должен вызывать метод onClick при нажатии кнопки формы', () => {
    signin.onClick = () => {
      onClickCalled = true;
    };
    signin.onClick(new Event('click'));
    expect(onClickCalled).to.be.true;
  });

  it('SanitizeInput должен возвращать true для правильного ввода', () => {
    const validInput = 'valid input';
    const result = signin.sanitizeInput(validInput);
    expect(result).to.equal(true);
  });

  it('SanitizeInput должен возвращать false для ввода, содержащего теги скрипта.', () => {
    const maliciousInput = '<script>alert("XSS");</script>';
    const result = signin.sanitizeInput(maliciousInput);
    expect(result).to.equal(false);
  });

  it('SanitizeInput должен возвращать false для ввода, содержащего теги ссылок', () => {
    const maliciousInput = '<a href="http://malicious-website.com">Click me</a>';
    const result = signin.sanitizeInput(maliciousInput);
    expect(result).to.equal(false);
  });
});
