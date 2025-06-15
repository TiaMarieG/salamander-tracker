describe('Video Preview Navigation', () => {
  it('clicks Preview on a video and navigates to the preview page', () => {
    cy.visit('http://localhost:3000/videos');

    // Wait for video cards to load
    cy.contains('Available Videos');
    cy.get('[data-cy^="preview-button-"]').first().click();

    // Confirm URL changed to preview route
    cy.url().should('include', '/videos/preview');

    // Check for elements on the preview page
    cy.contains('Threshold');
  });
});
