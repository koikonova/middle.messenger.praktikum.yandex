import { expect } from 'chai';
import {router} from './Router';

describe('Проверяем переходы у Роута', () => {

  describe('Метод go', () => {
    it('Moving to a new page must change the state of the history entity', () => {
      const before = window.history.length;
      router.go('/login');
      const after = window.history.length;
      expect(after - before).to.eq(1);
    });
  });

  describe('Метод back', () => {
    it('Going to the previous page should change the state of the history entity', () => {
      const before = window.history.length;
      router.go('/login');
      router.back();
      const after = window.history.length;

      const timer = setTimeout(() => {
        expect(after - before).to.eq(0);
      }, 100);

      clearTimeout(timer);
    });
  });

});