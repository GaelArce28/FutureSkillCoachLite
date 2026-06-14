describe("Login - contraseña incorrecta", () => {
  it("no debe permitir iniciar sesión con contraseña incorrecta", () => {
    cy.visit("/login");

    cy.get('input[type="email"], input[type="text"]')
      .first()
      .type("cliente@test.com");

    cy.get('input[type="password"]')
      .type("contraseñaIncorrecta");

    cy.contains("button", /Ingresar|Login|Iniciar/i)
      .click();

    cy.url().should("include", "/login");

    cy.contains(/incorrecto|inválido|error|credenciales/i)
      .should("be.visible");
  });
});