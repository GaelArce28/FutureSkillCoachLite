describe("Login - contraseña correcta", () => {
  it("debe permitir iniciar sesión con credenciales válidas", () => {
    cy.visit("/login");

    cy.get('input[type="email"], input[type="text"]')
      .first()
      .type("mr@gmail.com");

    cy.get('input[type="password"]')
      .type("qwerty");

    cy.contains("button", /Ingresar|Login|Iniciar/i)
      .click();

    cy.url().should("not.include", "/login");

    cy.window().then((win) => {
      expect(win.localStorage.getItem("token")).to.exist;
    });
  });
});