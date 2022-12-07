/// <reference types="cypress" />

describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the home page', () => {
    cy.getElement('home-page').should('be.visible')
  })

  it('should include ghosty in the title', () => {
    cy.title().should('include', 'ghosty')
  })
})

export {}