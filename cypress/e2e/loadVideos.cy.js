describe('Navigation to Videos Page', () => {
  it('goes to the videos page from the homepage', () => {
    cy.visit('http://localhost:3000/');

    // Click on the "Videos" link in the nav
    cy.contains('Videos').click();

    // Assert we are on the videos page
    cy.url().should('include', '/videos');

    // Check that a video list or expected text is visible
    cy.contains('Available Videos');
  });
});
