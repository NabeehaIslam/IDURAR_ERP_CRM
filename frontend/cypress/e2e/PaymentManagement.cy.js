describe("TC-08 Disabled Payment Mode  ", () => {
  it("tc-08  Disabled Payment Mode  ", () => {
        cy.viewport(935, 782);
    cy.visit("http://localhost:3000/login");

    cy.get("#normal_login_email").clear().type("admin@admin.com");
    cy.get("#normal_login_password").clear().type("admin123");
    cy.get("#normal_login_remember").click();
    cy.get('button[type="submit"]').click();
    cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
    cy.contains("Payments Mode").click();
    cy.url().should("include", "/payment/mode");
    cy.contains("Payment Mode List", { timeout: 8000 }).should("be.visible");
    cy.contains("Add New Payment Mode").click();
    cy.contains("Payment Mode", { timeout: 10000 }).should("be.visible");

    cy.visit("http://localhost:3000/payment/mode");
    cy.contains("Add New Payment Mode").click();
    cy.get("div.collapseBox").should("be.visible");
    cy.get("div.collapseBox input").eq(0).clear().type("Cheque");
    cy.get("div.collapseBox input").eq(1).clear().type("Transactions");
    cy.get("div.collapseBox form > div:nth-of-type(3) button").click();
    //cy.get("div.collapseBox form > div:nth-of-type(4) button").click();
    cy.get("div.collapseBox div:nth-of-type(5) button").click();
  });
});
describe("TC-07 Long Description  ", () => {
  it("tc-07  Long Description  ", () => {
        cy.viewport(935, 782);
    cy.visit("http://localhost:3000/login");

    cy.get("#normal_login_email").clear().type("admin@admin.com");
    cy.get("#normal_login_password").clear().type("admin123");
    cy.get("#normal_login_remember").click();
    cy.get('button[type="submit"]').click();
    cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
    cy.contains("Payments Mode").click();
    cy.url().should("include", "/payment/mode");
    cy.contains("Payment Mode List", { timeout: 8000 }).should("be.visible");
    cy.contains("Add New Payment Mode").click();
    cy.contains("Payment Mode", { timeout: 10000 }).should("be.visible");

    cy.visit("http://localhost:3000/payment/mode");
    cy.contains("Add New Payment Mode").click();
    cy.get("div.collapseBox").should("be.visible");
    cy.get("div.collapseBox input").eq(0).clear().type("Online");
    cy.get("div.collapseBox input").eq(1).clear().type("This payment mode is used for all online transactions across platforms.");
    //cy.get("div.collapseBox form > div:nth-of-type(3) button").click();
    cy.get("div.collapseBox form > div:nth-of-type(4) button").click();
    cy.get("div.collapseBox div:nth-of-type(5) button").click();
  });
});
describe("TC-06 Add Payment Mode with Special Characters ", () => {
  it("tc-06  Add Payment Mode with Special Characters ", () => {
        cy.viewport(935, 782);
    cy.visit("http://localhost:3000/login");

    cy.get("#normal_login_email").clear().type("admin@admin.com");
    cy.get("#normal_login_password").clear().type("admin123");
    cy.get("#normal_login_remember").click();
    cy.get('button[type="submit"]').click();
    cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
    cy.contains("Payments Mode").click();
    cy.url().should("include", "/payment/mode");
    cy.contains("Payment Mode List", { timeout: 8000 }).should("be.visible");
    cy.contains("Add New Payment Mode").click();
    cy.contains("Payment Mode", { timeout: 10000 }).should("be.visible");

    cy.visit("http://localhost:3000/payment/mode");
    cy.contains("Add New Payment Mode").click();
    cy.get("div.collapseBox").should("be.visible");
    cy.get("div.collapseBox input").eq(0).clear().type("Cash/Online");
    cy.get("div.collapseBox input").eq(1).clear().type("Multiple Mode");
    //cy.get("div.collapseBox form > div:nth-of-type(3) button").click();
    cy.get("div.collapseBox form > div:nth-of-type(4) button").click();
    cy.get("div.collapseBox div:nth-of-type(5) button").click();
  });
});
describe("TC-06 Add Payment Mode with Special Characters ", () => {
  it("tc-06  Add Payment Mode with Special Characters ", () => {
        cy.viewport(935, 782);
    cy.visit("http://localhost:3000/login");

    cy.get("#normal_login_email").clear().type("admin@admin.com");
    cy.get("#normal_login_password").clear().type("admin123");
    cy.get("#normal_login_remember").click();
    cy.get('button[type="submit"]').click();
    cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
    cy.contains("Payments Mode").click();
    cy.url().should("include", "/payment/mode");
    cy.contains("Payment Mode List", { timeout: 8000 }).should("be.visible");
    cy.contains("Add New Payment Mode").click();
    cy.contains("Payment Mode", { timeout: 10000 }).should("be.visible");

    cy.visit("http://localhost:3000/payment/mode");
    cy.contains("Add New Payment Mode").click();
    cy.get("div.collapseBox").should("be.visible");
    cy.get("div.collapseBox input").eq(0).clear().type("Cash/Online");
    cy.get("div.collapseBox input").eq(1).clear().type("Multiple Mode");
    //cy.get("div.collapseBox form > div:nth-of-type(3) button").click();
    cy.get("div.collapseBox form > div:nth-of-type(4) button").click();
    cy.get("div.collapseBox div:nth-of-type(5) button").click();
  });
});
describe("TC-05 Toggle Enabled OFF but Default Mode ON ", () => {
  it("tc-05  pToggle Enabled OFF but Default Mode ON ", () => {
        cy.viewport(935, 782);
    cy.visit("http://localhost:3000/login");

    cy.get("#normal_login_email").clear().type("admin@admin.com");
    cy.get("#normal_login_password").clear().type("admin123");
    cy.get("#normal_login_remember").click();
    cy.get('button[type="submit"]').click();
    cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
    cy.contains("Payments Mode").click();
    cy.url().should("include", "/payment/mode");
    cy.contains("Payment Mode List", { timeout: 8000 }).should("be.visible");
    cy.contains("Add New Payment Mode").click();
    cy.contains("Payment Mode", { timeout: 10000 }).should("be.visible");

    cy.visit("http://localhost:3000/payment/mode");
    cy.contains("Add New Payment Mode").click();
    cy.get("div.collapseBox").should("be.visible");
    cy.get("div.collapseBox input").eq(0).clear().type("Wire Transfer");
    cy.get("div.collapseBox input").eq(1).clear().type("Transfer Mode");
    cy.get("div.collapseBox form > div:nth-of-type(3) button").click();
    cy.get("div.collapseBox form > div:nth-of-type(4) button").click();
    cy.get("div.collapseBox div:nth-of-type(5) button").click();
  });
});
describe("TC-01 Add Payment Mode Successfully", () => {
  it("should add payment mode with valid data", () => {
        cy.viewport(935, 782);
    cy.visit("http://localhost:3000/login");

    cy.get("#normal_login_email").clear().type("admin@admin.com");
    cy.get("#normal_login_password").clear().type("admin123");
    cy.get("#normal_login_remember").click();
    cy.get('button[type="submit"]').click();
    cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
    cy.contains("Payments Mode").click();
    cy.url().should("include", "/payment/mode");
    cy.contains("Payment Mode List", { timeout: 8000 }).should("be.visible");
    cy.contains("Add New Payment Mode").click();
    cy.contains("Payment Mode", { timeout: 10000 }).should("be.visible");

    cy.visit("http://localhost:3000/payment/mode");
    cy.contains("Add New Payment Mode").click();
    cy.get("div.collapseBox").should("be.visible");
    cy.get("div.collapseBox input").eq(0).clear().type("Cash Payment");
    cy.get("div.collapseBox input").eq(1).clear().type("Default payment mode");
    cy.get("div.collapseBox div:nth-of-type(5) button").click();
  });
});
describe("TC-02 payment mode empty", () => {
  it("tc-02  payment mode empty", () => {
        cy.viewport(935, 782);
    cy.visit("http://localhost:3000/login");

    cy.get("#normal_login_email").clear().type("admin@admin.com");
    cy.get("#normal_login_password").clear().type("admin123");
    cy.get("#normal_login_remember").click();
    cy.get('button[type="submit"]').click();
    cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
    cy.contains("Payments Mode").click();
    cy.url().should("include", "/payment/mode");
    cy.contains("Payment Mode List", { timeout: 8000 }).should("be.visible");
    cy.contains("Add New Payment Mode").click();
    cy.contains("Payment Mode", { timeout: 10000 }).should("be.visible");

    cy.visit("http://localhost:3000/payment/mode");
    cy.contains("Add New Payment Mode").click();
    cy.get("div.collapseBox").should("be.visible");
    cy.get("div.collapseBox input").eq(0).clear();
    cy.get("div.collapseBox input").eq(1).clear().type("Default payment mode");
    cy.get("div.collapseBox div:nth-of-type(5) button").click();
  });
});
describe("TC-03 payment description empty", () => {
  it("tc-03  payment description empty", () => {
        cy.viewport(935, 782);
    cy.visit("http://localhost:3000/login");

    cy.get("#normal_login_email").clear().type("admin@admin.com");
    cy.get("#normal_login_password").clear().type("admin123");
    cy.get("#normal_login_remember").click();
    cy.get('button[type="submit"]').click();
    cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
    cy.contains("Payments Mode").click();
    cy.url().should("include", "/payment/mode");
    cy.contains("Payment Mode List", { timeout: 8000 }).should("be.visible");
    cy.contains("Add New Payment Mode").click();
    cy.contains("Payment Mode", { timeout: 10000 }).should("be.visible");

    cy.visit("http://localhost:3000/payment/mode");
    cy.contains("Add New Payment Mode").click();
    cy.get("div.collapseBox").should("be.visible");
    cy.get("div.collapseBox input").eq(0).clear().type("Debit Card Payment");
    cy.get("div.collapseBox input").eq(1).clear();
    cy.get("div.collapseBox div:nth-of-type(5) button").click();
  });
});
describe("TC-04 payment mode lb", () => {
  it("tc-04  payment mode lb", () => {
        cy.viewport(935, 782);
    cy.visit("http://localhost:3000/login");

    cy.get("#normal_login_email").clear().type("admin@admin.com");
    cy.get("#normal_login_password").clear().type("admin123");
    cy.get("#normal_login_remember").click();
    cy.get('button[type="submit"]').click();
    cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
    cy.contains("Payments Mode").click();
    cy.url().should("include", "/payment/mode");
    cy.contains("Payment Mode List", { timeout: 8000 }).should("be.visible");
    cy.contains("Add New Payment Mode").click();
    cy.contains("Payment Mode", { timeout: 10000 }).should("be.visible");

    cy.visit("http://localhost:3000/payment/mode");
    cy.contains("Add New Payment Mode").click();
    cy.get("div.collapseBox").should("be.visible");
    cy.get("div.collapseBox input").eq(0).clear().type("A");
    cy.get("div.collapseBox input").eq(1).clear().type("Valid description");
    cy.get("div.collapseBox div:nth-of-type(5) button").click();
  });
});
