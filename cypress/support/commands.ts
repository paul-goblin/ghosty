/// <reference types="cypress" />

import 'cypress-wait-until'
import './pixi-data-testing'

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