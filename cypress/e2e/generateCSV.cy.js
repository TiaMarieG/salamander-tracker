describe("Full CSV Generation Flow", () => {
   it("navigates to preview and generates CSV after selecting color and threshold", () => {
      cy.intercept('GET', '**/videos', {
         statusCode: 200,
         body: [{ filename: "mock_salamander.mp4" }]
      }).as('getVideos');

      cy.intercept('POST', '**/api/generate-csv', {
         statusCode: 200,
         body: { jobId: '12345' }, 
      }).as('startJob');

      cy.intercept('GET', '**/process/12345/status', {
         statusCode: 200,
         body: { 
            status: 'done', 
            result: 'http://localhost:8080/downloads/myfile.csv' 
         },
      }).as('pollStatus');

      cy.visit("http://localhost:3000");

      cy.contains("Videos").click();
      cy.wait('@getVideos');
      cy.contains("Available Videos");
      cy.get('[data-cy^="preview-button-"]').first().click();

      cy.get('[data-cy="color-picker"]', { timeout: 10000 })
         .should("have.attr", "data-ready", "true")
         .then(($canvas) => {
            const rect = $canvas[0].getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            cy.wrap($canvas).click(centerX, centerY);
         });

      cy.get('[data-cy="selected-color"]', { timeout: 5000 })
         .should("contain.text", "Selected Color: rgb(");

      cy.get('[data-cy="threshold-slider"]')
         .scrollIntoView()
         .click({ force: true });

      cy.contains("button", "Generate CSV", { timeout: 15000 })
         .should("be.visible")
         .scrollIntoView()
         .click();

      cy.contains("✅ CSV Ready!", { timeout: 10000 }).should("be.visible");
   });
});