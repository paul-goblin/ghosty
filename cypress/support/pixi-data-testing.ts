import type { DisplayObject } from '@pixi/display';
import type { Container } from 'react-dom';
import type { PixiObjectInfo } from '~/game/app';

// code originally from:
// https://medium.com/@zenblender/functional-testing-of-a-hybrid-pixijs-react-app-281ed5ea04b3
// code modified to work in this setup

type PixiObject = (Container | DisplayObject) & { info?: PixiObjectInfo }

function waitForPixiApplicationStageRoot() : Cypress.Chainable<PixiObject> {
  cy.waitUntil(() => {
    return cy.window().then((win) => {
      return !!win.pixiApp
    })
  })
  return cy.window().then((win) => {
    return win.pixiApp!.stage as PixiObject
  })
}

function pixiObjectMatches(
  pixiObject: PixiObject, requiredPixiObjectInfo: PixiObjectInfo
) : boolean {
  const pixiObjectInfo = pixiObject.info
  if (!pixiObjectInfo) {
    return false
  }
  return Object.entries(requiredPixiObjectInfo).every(([key, value]) => {
    return pixiObjectInfo[key] === value || (pixiObject as any)[key] === value
  })
}

function findPixiObject(
  currentPixiObject: PixiObject | undefined,
  requiredPixiObjectInfo: PixiObjectInfo
) : PixiObject | null {
  if (!currentPixiObject) {
    return null
  }
  if (pixiObjectMatches(currentPixiObject, requiredPixiObjectInfo)) {
    return currentPixiObject
  }
  if ('children' in currentPixiObject) {
    // currentPixiObject is of type PIXI.Container
    for (let i = 0; i < currentPixiObject.children.length; i++) {
      // recursion
      const childPixiObject = findPixiObject(
        currentPixiObject.children[i],
        requiredPixiObjectInfo
      )
      if (childPixiObject) {
        return childPixiObject
      }
    }
  }
  return null
}

function waitForPixiObject(
  requiredPixiObjectInfo: PixiObjectInfo
): Cypress.Chainable<PixiObject> {
  return waitForPixiApplicationStageRoot().waitUntil(
    (stageRoot) => findPixiObject(stageRoot, requiredPixiObjectInfo)
  )
}

function waitForNoPixiObject(
  requiredPixiObjectInfo: PixiObjectInfo
): Cypress.Chainable<PixiObject> {
  return waitForPixiApplicationStageRoot().waitUntil(
    (stageRoot) => !findPixiObject(stageRoot, requiredPixiObjectInfo)
  )
}

const assertPixiObjectExists = (requiredPixiObjectInfo: PixiObjectInfo): void => {
  waitForPixiObject(requiredPixiObjectInfo)
}

function assertNoPixiObjectExists(requiredPixiObjectInfo: PixiObjectInfo): void {
  waitForNoPixiObject(requiredPixiObjectInfo)
}

Cypress.Commands.add('waitForPixiApplicationStageRoot', waitForPixiApplicationStageRoot)
Cypress.Commands.add('waitForPixiObject', waitForPixiObject)
Cypress.Commands.add('waitForNoPixiObject', waitForNoPixiObject)
Cypress.Commands.add('assertPixiObjectExists', assertPixiObjectExists)
Cypress.Commands.add('assertNoPixiObjectExists', assertNoPixiObjectExists)

declare global {
  namespace Cypress {
    interface Chainable {
      waitForPixiApplicationStageRoot: typeof waitForPixiApplicationStageRoot
      waitForPixiObject: typeof waitForPixiObject
      waitForNoPixiObject: typeof waitForNoPixiObject
      assertPixiObjectExists: typeof assertPixiObjectExists
      assertNoPixiObjectExists: typeof assertNoPixiObjectExists
    }
  }
}