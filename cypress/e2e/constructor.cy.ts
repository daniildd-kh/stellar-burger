import Cypress from 'cypress';
const BURGER_API_URL = 'https://norma.nomoreparties.space/api';
const ITEM_MAIN_ID = '643d69a5c3f7b9001cfa0941';
const ITEM_BUN_ID = '643d69a5c3f7b9001cfa093c';

beforeEach(() => {
  cy.intercept('GET', `${BURGER_API_URL}/ingredients`, {
    fixture: 'ingredients.json'
  });
  cy.intercept('POST', `${BURGER_API_URL}/auth/login`, {
    fixture: 'user.json'
  });
  cy.intercept('GET', `${BURGER_API_URL}/auth/user`, { fixture: 'user.json' });
  cy.intercept('POST', `${BURGER_API_URL}/orders`, {
    fixture: 'order-burger.json'
  });

  cy.window().then((window) => {
    window.localStorage.setItem('refreshToken', 'refresh-test-token');
  });
  cy.setCookie('accessToken', 'access-test-token');
  cy.visit('/');
  
});

afterEach(() =>{
  cy.window().then((window) => {
    window.localStorage.clear();
  });
  cy.clearAllCookies();
})

describe('Тестирование работы ингредиентов', () => {
  it('Добавление ингредиента из списка в конструктор', () => {
    cy.get(`[data-cy=${ITEM_MAIN_ID}]`)
      .children('button')
      .contains('Добавить')
      .click();
    cy.get(`[data-cy=${ITEM_MAIN_ID}]`)
      .find('.counter__num')
      .should('contain', '1');
  });

  it('Тестирование работы модального окна', () => {
    cy.get(`[data-cy=${ITEM_MAIN_ID}]`).click();
    cy.get('#modals').should('be.not.empty');
    cy.get('#modals').find('button').click();
  });
});

describe('Тестирование оформления заказа', () => {
  it('Проверка оформления заказа', () => {
    cy.get(`[data-cy=${ITEM_MAIN_ID}]`)
      .children('button')
      .contains('Добавить')
      .click();
    cy.get(`[data-cy=${ITEM_BUN_ID}]`)
      .children('button')
      .contains('Добавить')
      .click();
    cy.get('button').contains('Оформить заказ').click();
    cy.get('#modals').find('h2').contains('41304');
    cy.get('#modals').find('button').click();
    cy.get('[data-cy=burger-container]').find('li').should('not.exist');
  });
});
