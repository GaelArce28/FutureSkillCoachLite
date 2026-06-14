describe("Citas - sin token", () => {
  it("debe redirigir al login si no hay token", () => {
    cy.clearLocalStorage();

    cy.visit("/citas");

    cy.url().should("include", "/login");

    cy.window().then((win) => {
      expect(win.localStorage.getItem("token")).to.be.null;
    });
  });
});