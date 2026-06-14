describe("Página de inicio", () => {
  it("abre el inicio", () => {
    cy.visit("/");

    cy.contains("Future").should("be.visible");
  });
});