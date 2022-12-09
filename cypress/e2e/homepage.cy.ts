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

  it('should have a visible canvas element', () => {
    cy.get('canvas').should('be.visible')
  })

  it('should display a ghosty', () => {
    cy.assertPixiObjectExists({ type: 'ghosty' })
  })

})

export {}