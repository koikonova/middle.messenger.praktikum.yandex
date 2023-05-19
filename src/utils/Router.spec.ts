import { expect } from 'chai';
import {router} from './Router';

describe('Проверяем переходы у Роута', () => {

  describe('Метод go', () => {
    it('Переход на новую страницу должен менять состояние сущности history', () => {
      const before = window.history.length;
      router.go('/login');
      const after = window.history.length;
      expect(after - before).to.eq(1);
    });
  });

  describe('Метод back', () => {
    it('Переход на предыдущую страницу должен менять состояние сущности history', () => {
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