describe("Navigation Flow", () => {
   it("goes home → videos → preview → videos → home", () => {

      cy.intercept('GET', 'http://64.23.238.198:8080/api/videos', {
         statusCode: 200,
         body: [
            "mock_salamander.mp4",
            "test_lizard.mov"
         ]
      }).as('getVideos');

      cy.visit("http://localhost:3000");
      cy.contains("Welcome to Salamander Tracker");

      cy.contains("Videos").click();
      
      cy.wait('@getVideos');
      cy.contains("Available Videos");

      cy.get('[data-cy="preview-button-mock_salamander.mp4"]').click();
      cy.url().should("include", "/videos/preview/");
      cy.contains("Threshold");

      cy.go("back");
      cy.url().should("include", "/videos");
      cy.contains("Available Videos");

      cy.contains("Home").click();
      cy.url().should("eq", "http://localhost:3000/");
      cy.contains("Welcome to Salamander Tracker");
   });
});