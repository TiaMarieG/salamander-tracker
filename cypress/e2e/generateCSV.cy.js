describe("Full CSV Generation Flow", () => {
   it("navigates to preview and generates CSV after selecting color and threshold", () => {
      cy.visit("http://localhost:3000");

      // Step 1: Navigate to preview page
      cy.contains("Videos").click();
      cy.contains("Available Videos");
      cy.get('[data-cy^="preview-button-"]').first().click();

      // Step 2: Wait for canvas to be ready and click in the center
      cy.get('[data-cy="color-picker"]', { timeout: 10000 })
         .should("have.attr", "data-ready", "true")
         .then(($canvas) => {
            const rect = $canvas[0].getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            cy.wrap($canvas).click(centerX, centerY);
         });

      // Step 3: Confirm color was selected and log it
      cy.get('[data-cy="selected-color"]', { timeout: 5000 })
         .should("contain.text", "Selected Color: rgb(")
         .invoke("text")
         .then((text) => {
            cy.log(`🎨 Selected: ${text}`);
            console.log(`🎨 Cypress selected color: ${text}`);
         });

      // Step 4: Set threshold to ~50
      const desiredValue = 50;
      const sliderMin = 0;
      const sliderMax = 255;

      cy.get('[data-cy="threshold-slider"]')
         .scrollIntoView()
         .should("be.visible")
         .then(($slider) => {
            const width = $slider[0].getBoundingClientRect().width;
            const percent =
               (desiredValue - sliderMin) / (sliderMax - sliderMin);
            const clickX = width * percent;

            cy.wrap($slider).click(clickX, 10, { force: true });
         });

      // Step 5: Wait for Generate CSV button and click it
      cy.contains("button", "Generate CSV", { timeout: 15000 })
         .should("be.visible")
         .scrollIntoView()
         .click();
   });
});
