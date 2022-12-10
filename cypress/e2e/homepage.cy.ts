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

  it('s canvas should cover the whole screen', () => {
    cy.get('canvas').then(($canvas) => {
      cy.window().then((window) => {
        expect($canvas.width()).to.eq(window.innerWidth)
        expect($canvas.height()).to.eq(window.innerHeight)
      })
    })
  })

  it('should display a ghosty', () => {
    cy.assertPixiObjectExists({ type: 'ghosty' })
  })

})

export {}