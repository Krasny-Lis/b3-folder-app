describe('App renders', () => {
  beforeEach(() => cy.visit('/'));

  it('shows logged in user', () => {
    cy.get('[data-cy=logged-in-as]').should('exist');
  });

  it('allows changing the user role', () => {
    cy.get('[data-cy=user-select]').select('admin');
    cy.get('[data-cy=logged-in-as]').should('contain', 'admin');
  });

  it('allows admin to view and manage all files', () => {
    cy.get('[data-cy=user-select]').select('admin');
    cy.get('[data-cy=PROJEKTY]').click();
    cy.get('[data-cy="Klient XYZ"]').click();
    cy.get('[data-cy="XYZ_P001_202205 plakat"]').within(() => {
      cy.get('[data-cy=download-button]').should('exist');
      cy.get('[data-cy=delete-button]').should('exist');
    });
  });

  it('prevents user1 from seeing admin file operations', () => {
    cy.get('select').select('user1');
    cy.contains('PROJEKTY').click();
    cy.contains('Klient XYZ').click();
    cy.contains('__COMMON').click();
    cy.contains('logo.pdf')
      .parent()
      .within(() => {
        cy.get('[data-cy=download-button]').should('not.exist');
        cy.get('[data-cy=delete-button]').should('not.exist');
      });
  });

  it('prevents user2 from seeing admin file operations', () => {
    cy.get('select').select('user2');
    cy.contains('PROJEKTY').click();
    cy.contains('Klient XYZ').click();
    cy.contains('__COMMON').click();
    cy.contains('logo.pdf')
      .parent()
      .within(() => {
        cy.get('[data-cy=download-button]').should('not.exist');
        cy.get('[data-cy=delete-button]').should('not.exist');
      });
  });
});
