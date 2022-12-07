/// <reference types="cypress" />

const getElement = (selector:string) => {
  return cy.get(`[data-test="${selector}"]`);
};

Cypress.Commands.add('getElement', getElement)

declare global {
  namespace Cypress {
    interface Chainable {
      getElement(selector: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

export {}