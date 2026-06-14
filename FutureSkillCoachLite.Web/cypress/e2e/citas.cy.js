describe("Proyecto Filadelfia - Citas", () => {
  beforeEach(() => {
    cy.viewport(1366, 768);
  });

  it("si no hay usuario logueado, debe mandar al login", () => {
    cy.clearLocalStorage();

    cy.visit("/citas");

    cy.url().should("include", "/login");
  });
});