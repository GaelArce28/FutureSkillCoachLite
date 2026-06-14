describe("Proyecto Filadelfia - Prueba completa", () => {
  beforeEach(() => {
    cy.viewport(1366, 768);
  });

  it("debe cargar la página de inicio", () => {
    cy.visit("/");

    cy.contains(/Future|Filadelfia|Coach/i).should("be.visible");
  });

  it("debe cargar la página de actividades", () => {
    cy.visit("/actividades");

    cy.url().should("include", "/actividades");

    cy.contains("h1, h2, h3, p, section", /Actividades/i)
      .should("be.visible");
  });

  it("debe cargar la página de entrenadores", () => {
    cy.visit("/informacion");

    cy.url().should("include", "/informacion");

    cy.contains("h1, h2, h3, p, section", /Entrenadores|Coach/i)
      .should("be.visible");
  });

  it("debe cargar la página de login", () => {
    cy.visit("/login");

    cy.url().should("include", "/login");

    cy.get('input[type="email"], input[type="text"]')
      .first()
      .should("be.visible");

    cy.get('input[type="password"]')
      .should("be.visible");

    cy.contains("button", /Ingresar|Login|Iniciar/i)
      .should("be.visible");
  });
});