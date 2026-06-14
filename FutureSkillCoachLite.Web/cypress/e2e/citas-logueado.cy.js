describe("Proyecto Filadelfia - Citas con usuario logueado", () => {
  beforeEach(() => {
    cy.viewport(1366, 768);

    cy.window().then((win) => {
      win.localStorage.setItem("token", "token-de-prueba");

      win.localStorage.setItem(
        "usuario",
        JSON.stringify({
          userId: 1,
          clientId: 1,
          coachId: null,
          fullName: "Cliente Prueba",
          email: "cliente@test.com",
          role: "Client",
        })
      );

      win.localStorage.setItem(
        "cliente",
        JSON.stringify({
          clientId: 1,
          fullName: "Cliente Prueba",
          email: "cliente@test.com",
          goal: "Mejorar condición física",
          coachId: 1,
        })
      );
    });
  });

  it("debe permitir entrar a la página de citas", () => {
    cy.visit("/citas");

    cy.url().should("include", "/citas");

    cy.contains("h1, h2, h3, p, section", /Citas|cita/i)
      .should("be.visible");
  });
});