describe('App renders', () => {
  it('shows logged in user', () => {
    cy.visit('/');
    cy.contains('Logged in as');
  });

  it('allows changing the user role', () => {
    cy.visit('/');
    cy.get('select').select('admin');
    cy.contains('Logged in as: admin');
  });

  it('allows admin to view and manage all files', () => {
    cy.visit('/');
    cy.get('select').select('admin');
    cy.contains('PROJEKTY').click();
    cy.contains('Klient XYZ').click();
    cy.contains('XYZ_P001_202205 plakat')
      .parent()
      .within(() => {
        cy.get('button[aria-label="Download"]').should('exist');
        cy.get('button[aria-label="Delete"]').should('exist');
      });
  });
});
