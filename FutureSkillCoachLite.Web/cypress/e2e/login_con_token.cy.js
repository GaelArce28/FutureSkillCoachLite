describe("Login - token JWT", () => {
  it("debe iniciar sesión y guardar el token", () => {
    cy.intercept("POST", "**/api/Auth/login").as("loginRequest");

    cy.visit("/login");

    cy.get('input[type="email"], input[type="text"]')
      .first()
      .type("mr@gmail.com");

    cy.get('input[type="password"]')
      .type("qwerty");

    cy.contains("button", /Ingresar|Login|Iniciar/i)
      .click();

    cy.wait("@loginRequest")
      .its("response.statusCode")
      .should("eq", 200);

    cy.url().should("not.include", "/login");

    cy.window().then((win) => {
      expect(win.localStorage.getItem("token")).to.exist;
      expect(win.localStorage.getItem("usuario")).to.exist;
    });
  });
});