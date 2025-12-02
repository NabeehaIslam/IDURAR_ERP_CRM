
describe("Login TC-01", () => {
  it("tests Login TC-01", () => {
    cy.viewport(935, 782);
    cy.visit("http://localhost:3000/login");
    //by default already these credentials are present
   cy.get("#normal_login_email").clear();
   cy.get("#normal_login_email").type("admin@admin.com");
    cy.get("#normal_login_password").clear();
    cy.get("#normal_login_password").type("admin123");
    cy.get("#normal_login_remember").click();
    cy.get("button").click();
  });
});

describe("Login TC-02", () => {
  it("tests Login TC-02", () => {
    cy.viewport(935, 782);
    cy.visit("http://localhost:3000/login");
    cy.get("#normal_login_email").clear();
     cy.get("#normal_login_email").type("i233046");
    cy.get("#normal_login_password").clear();
   cy.get("#normal_login_password").type("admin123");
    cy.get("#normal_login_remember").click();
    cy.get("button").click();
  });
});

describe("Login TC-03", () => {
  it("tests Login TC-03", () => {
    cy.viewport(935, 782);
    cy.visit("http://localhost:3000/login");
     cy.get("#normal_login_email").clear();
     cy.get("#normal_login_email").type("i233046%");
    cy.get("#normal_login_password").clear();
   cy.get("#normal_login_password").type("admin123");
    cy.get("#normal_login_remember").click();
    cy.get("button").click();
  });
});

describe("Login TC-04 — Empty Email Field", () => {
  it("Should show error when email is empty", () => {
    cy.viewport(935, 782);
    cy.visit("http://localhost:3000/login");

    
    cy.get("#normal_login_email").clear();
    cy.get("#normal_login_password").click();
     cy.get("#normal_login_password").clear();
     cy.get("#normal_login_password").type("admin123");
    cy.get("#normal_login_remember").click();

    // Click login button
    cy.get("button").click();
 });
});

describe("Login TC-05 — Empty Password Field", () => {
  it("Should show error when password is empty", () => {
    cy.viewport(935, 782);
    cy.visit("http://localhost:3000/login");

   cy.get("#normal_login_email").clear();
   cy.get("#normal_login_email").type("admin@admin.com");
    cy.get("#normal_login_password").click();
     cy.get("#normal_login_password").clear();
    cy.get("#normal_login_remember").click();

    // Click login button
    cy.get("button").click();

     });
});
