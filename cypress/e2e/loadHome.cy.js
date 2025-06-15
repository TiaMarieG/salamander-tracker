describe('Homepage', () => {
  it('loads successfully and displays title', () => {
    cy.visit('http://localhost:3000'); // Ensure dev server is running
    cy.contains('Salamander Tracker');
  });
});