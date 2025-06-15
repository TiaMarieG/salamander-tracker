describe("Navigation Flow", () => {
   it("goes home → videos → preview → videos → home", () => {
      // Step 1: Visit Home Page
      cy.visit("http://localhost:3000");
      cy.contains("Welcome to Salamander Tracker");

      // Step 2: Go to Videos page
      cy.contains("Videos").click();
      cy.contains("Available Videos");

      // Step 3: Click Preview on the first video
      cy.get('[data-cy^="preview-button-"]').first().click();
      cy.url().should("include", "/videos/preview/");
      cy.contains("Preview:");

      // Step 4: Go back to Videos list
      cy.go("back");
      cy.url().should("include", "/videos");
      cy.contains("Available Videos");

      // Step 5: Go back to Home
      cy.contains("Home").click();
      cy.url().should("eq", "http://localhost:3000/");
      cy.contains("Welcome to Salamander Tracker");
   });
});
