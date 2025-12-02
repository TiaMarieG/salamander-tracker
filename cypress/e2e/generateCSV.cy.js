describe("Full CSV Generation Flow", () => {
   it("navigates to preview and generates CSV after selecting color and threshold", () => {

      cy.intercept('GET', 'http://localhost:8080/api/videos', {
         statusCode: 200,
         body: ["mock_salamander.mp4"] 
      }).as('getVideos');

      cy.intercept('GET', 'http://localhost:8080/thumbnail/mock_salamander.mp4', (req) => {
         req.redirect('http://localhost:3000/mrsal.png'); 
      }).as('getThumbnail');

      cy.intercept('POST', 'http://localhost:8080/api/generate-csv', {
         statusCode: 200,
         body: { jobId: '12345' }, 
      }).as('startJob');

      cy.intercept('GET', 'http://localhost:8080/process/12345/status', {
         statusCode: 200,
         body: { 
            status: 'done', 
            result: 'http://localhost:8080/downloads/myfile.csv' 
         },
      }).as('pollStatus');

      cy.visit("http://localhost:3000");

      cy.contains("Videos").click();
      cy.wait('@getVideos');
      cy.get('[data-cy="preview-button-mock_salamander.mp4"]').click();

      cy.get('[data-cy="color-picker"]', { timeout: 10000 })
         .should("have.attr", "data-ready", "true")
         .click('center');

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