describe('Video Preview Navigation', () => {
  it('clicks Preview on a video and navigates to the preview page', () => {

    cy.intercept('GET', 'http://localhost:8080/api/videos', {
        statusCode: 200,
        body: ["mock_salamander.mp4"]
    }).as('getVideos');

    cy.visit('http://localhost:3000/videos');

    cy.wait('@getVideos');
    cy.contains("Available Videos");

    cy.get('[data-cy="preview-button-mock_salamander.mp4"]').click();

    cy.url().should('include', '/videos/preview');
    cy.contains('Threshold');
  });
});