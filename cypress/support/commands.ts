/// <reference types="cypress" />

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Cypress {
    interface Chainable {
      addFile(path: string[], name: string): Chainable<void>;
      deleteFile(path: string[], name: string): Chainable<void>;
      visitAs(role: string): Chainable<void>;
      visitApp(): Chainable<void>;
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

export {};
