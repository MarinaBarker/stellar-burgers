import { TIngredient } from '../../src/utils/types';

const mockUserProfile = {
    email: 'marinka-0000@mail.ru',
    password: '123456789'
  };
  
  const testUrl = 'http://localhost:4000/';
  const baseUrl = 'https://norma.nomoreparties.space/api';

  describe('Работа с ингредиентами', function () {
    const ingredients: TIngredient[] = (
      require('./mock/ingredients.json') as TIngredient[]
    )
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  
    Cypress.Commands.add('login', () => {
      cy.request({
        method: 'POST',
        url: baseUrl + '/auth/login',
        body: mockUserProfile
      }).then((resp) => {
        window.localStorage.setItem('accessToken', resp.body.accessToken);
        cy.setCookie('accessToken', resp.body.accessToken);
      });
    });
  
    beforeEach(() => {
      cy.login();
      cy.intercept(baseUrl + '/ingredients', {
        success: true,
        data: ingredients
      });
    });
  
    afterEach(() => {
      window.localStorage.removeItem('accessToken');
      cy.clearAllCookies();
    });
  
    it('Ингредиенты добавляются в заказ', function () {
      cy.visit(testUrl);
      const bunUuid = ingredients.find((e) => e.type === 'bun')?._id;
      const fillingUuids = ingredients
        .filter((e) => e.type !== 'bun')
        .splice(0, 5)
        .map((e) => e._id);
  
      cy.get(`[data-cy=ing-${bunUuid}] > button`).click();
      fillingUuids.forEach((uuid) =>
        cy.get(`[data-cy=ing-${uuid}] > button`).click()
      );
  
      fillingUuids.forEach((uuid) => cy.get(`[data-cy=ing-buy-${uuid}]`));
      cy.get(`[data-cy=bun-up-buy-${bunUuid}]`);
      cy.get(`[data-cy=bun-down-buy-${bunUuid}]`);
    });
  
    it('Модальное окно ингредиента открывается и закрывается на крест', function () {
      cy.visit(testUrl);
      const bun = ingredients.find((e) => e.type === 'bun');
      if (!bun) return;
      cy.get(`[data-cy=ing-${bun._id}]`).click();
      cy.get('h3').contains('Детали ингредиента');
      cy.get('h3').contains(bun.name);
      cy.get('[data-cy="closeModal"]').click();
      cy.get(`[data-cy=modal]`).should('not.exist');
    });
  
    it('Модальное окно ингредиента открывается и закрывается по нажатию на оверлэй', function () {
      cy.visit(testUrl);
      const bun = ingredients.find((e) => e.type === 'bun');
      if (!bun) return;
      cy.get(`[data-cy=ing-${bun._id}]`).click();
      cy.get('h3').contains('Детали ингредиента');
      cy.get('h3').contains(bun.name);
      cy.get(`body`).click(0, 0);
      cy.get(`[data-cy=modal]`).should('not.exist');
    });
  
    it('Оформить заказ', function () {
      cy.visit(testUrl);
      const bunUuid = ingredients.find((e) => e.type === 'bun')?._id;
      const fillingUuids = ingredients
        .filter((e) => e.type !== 'bun')
        .splice(0, 5)
        .map((e) => e._id);
  
      cy.get(`[data-cy=ing-${bunUuid}] > button`).click();
      fillingUuids.forEach((uuid) =>
        cy.get(`[data-cy=ing-${uuid}] > button`).click()
      );
  
      fillingUuids.forEach((uuid) => cy.get(`[data-cy=ing-buy-${uuid}]`));
      cy.get(`[data-cy=bun-up-buy-${bunUuid}]`);
      cy.get(`[data-cy=bun-down-buy-${bunUuid}]`);

      cy.get(`button`).contains('Оформить заказ').click();
      cy.intercept('POST', baseUrl + '/orders').as('createOrder');
      cy.contains('Оформляем заказ...').should('exist')
      cy.contains('Ваш заказ начали готовить', { timeout: 20000 }).should('exist')
      cy.get(`body`).click(0, 0);
      cy.get(`[data-cy=modal]`).should('not.exist');
      cy.get(`[data-cy*=ing-buy-]`).should('not.exist');
    });
  });
