describe("Navigation Flow", () => {
   it("goes home → videos → preview → videos → home", () => {
      cy.intercept('GET', '**/videos', {
         statusCode: 200,
         body: [
            { filename: "mock_salamander.mp4" },
            { filename: "test_lizard.mov" }
         ]
      }).as('getVideos');

      cy.visit("http://localhost:3000");
      cy.contains("Welcome to Salamander Tracker");

      cy.contains("Videos").click();
      
      cy.wait('@getVideos');
      cy.contains("Available Videos");

      cy.get('[data-cy^="preview-button-"]').first().click();
      cy.url().should("include", "/videos/preview/");
      cy.contains("Preview");

      cy.go("back");
      cy.url().should("include", "/videos");
      cy.contains("Available Videos");

      cy.contains("Home").click();
      cy.url().should("eq", "http://localhost:3000/");
      cy.contains("Welcome to Salamander Tracker");
   });
});