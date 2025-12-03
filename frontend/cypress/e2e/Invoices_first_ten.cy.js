describe("TC10_invoices", () => {
  it("tests TC10_invoices", () => {
    cy.viewport(935, 782);
    cy.visit("http://localhost:3000/login");

    cy.get("#normal_login_email").clear().type("admin@admin.com");
    cy.get("#normal_login_password").clear().type("admin123");
    cy.get("#normal_login_remember").click();
    cy.get('button[type="submit"]').click();
    cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
    cy.contains("Invoices").click();
    cy.url().should("include", "/invoice");
    cy.contains("Invoice List", { timeout: 8000 }).should("be.visible");
    cy.contains("Add New Invoice").click();
    cy.contains("Client", { timeout: 10000 }).should("be.visible");
    cy.get(".ant-select-selector").first().click();
    cy.get(".ant-select-dropdown", { timeout: 5000 }).should("be.visible");
    cy.get(".ant-select-item-option").first().click();
    cy.get("#number").clear().type("5") ;
    cy.get("#year").clear().type("2025");
    cy.get("#date").clear().type("3/12/2025");
    cy.get("#expiredDate").clear();
    cy.get("#notes").type("Test invoice for client");
    cy.get("#items_0_itemName").type("Consulting Service");
    cy.get("#items_0_description").type("Monthly Retainer");
    cy.get("#items_0_quantity").type("1");
    cy.get("#items_0_price").type("1500");
    
    cy.contains("Select Tax Value").click({ force: true });
    
    cy.get("span").contains("Tax 0%", { matchCase: false }).click();
    cy.contains("button", "Save").click();
  });
});

describe("TC09_invoices", () => {
  it("tests TC09_invoices", () => {
    cy.viewport(935, 782);
    cy.visit("http://localhost:3000/login");

    cy.get("#normal_login_email").clear().type("admin@admin.com");
    cy.get("#normal_login_password").clear().type("admin123");
    cy.get("#normal_login_remember").click();
    cy.get('button[type="submit"]').click();
    cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
    cy.contains("Invoices").click();
    cy.url().should("include", "/invoice");
    cy.contains("Invoice List", { timeout: 8000 }).should("be.visible");
    cy.contains("Add New Invoice").click();
    cy.contains("Client", { timeout: 10000 }).should("be.visible");
    cy.get(".ant-select-selector").first().click();
    cy.get(".ant-select-dropdown", { timeout: 5000 }).should("be.visible");
    cy.get(".ant-select-item-option").first().click();
    cy.get("#number").clear().type("5") ;
    cy.get("#year").clear().type("2025");
    cy.get("#date").clear().type("32/13/2025");
    cy.get("#notes").type("Test invoice for client");
    cy.get("#items_0_itemName").type("Consulting Service");
    cy.get("#items_0_description").type("Monthly Retainer");
    cy.get("#items_0_quantity").type("1");
    cy.get("#items_0_price").type("1500");
    
    cy.contains("Select Tax Value").click({ force: true });
    
    cy.get("span").contains("Tax 0%", { matchCase: false }).click();
    cy.contains("button", "Save").click();
  });
});
describe("TC08_invoices", () => {
  it("tests TC08_invoices", () => {
    cy.viewport(935, 782);
    cy.visit("http://localhost:3000/login");

    cy.get("#normal_login_email").clear().type("admin@admin.com");
    cy.get("#normal_login_password").clear().type("admin123");
    cy.get("#normal_login_remember").click();
    cy.get('button[type="submit"]').click();
    cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
    cy.contains("Invoices").click();
    cy.url().should("include", "/invoice");
    cy.contains("Invoice List", { timeout: 8000 }).should("be.visible");
    cy.contains("Add New Invoice").click();
    cy.contains("Client", { timeout: 10000 }).should("be.visible");
    cy.get(".ant-select-selector").first().click();
    cy.get(".ant-select-dropdown", { timeout: 5000 }).should("be.visible");
    cy.get(".ant-select-item-option").first().click();
    cy.get("#number").clear().type("5") ;
    cy.get("#year").clear().type("2025");
    cy.get("#date").clear();
    cy.get("#notes").type("Test invoice for client");
    cy.get("#items_0_itemName").type("Consulting Service");
    cy.get("#items_0_description").type("Monthly Retainer");
    cy.get("#items_0_quantity").type("1");
    cy.get("#items_0_price").type("1500");
    
    cy.contains("Select Tax Value").click({ force: true });
    
    cy.get("span").contains("Tax 0%", { matchCase: false }).click();
    cy.contains("button", "Save").click();
  });
});
describe("TC07_invoices", () => {
  it("tests TC07_invoices", () => {
    cy.viewport(935, 782);
    cy.visit("http://localhost:3000/login");

    cy.get("#normal_login_email").clear().type("admin@admin.com");
    cy.get("#normal_login_password").clear().type("admin123");
    cy.get("#normal_login_remember").click();
    cy.get('button[type="submit"]').click();
    cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
    cy.contains("Invoices").click();
    cy.url().should("include", "/invoice");
    cy.contains("Invoice List", { timeout: 8000 }).should("be.visible");
    cy.contains("Add New Invoice").click();
    cy.contains("Client", { timeout: 10000 }).should("be.visible");
    cy.get(".ant-select-selector").first().click();
    cy.get(".ant-select-dropdown", { timeout: 5000 }).should("be.visible");
    cy.get(".ant-select-item-option").first().click();
    cy.get("#number").clear().type("5") ;
    cy.get("#year").clear().type("ABCD");
    cy.get("#notes").type("Test invoice for client");
    cy.get("#items_0_itemName").type("Consulting Service");
    cy.get("#items_0_description").type("Monthly Retainer");
    cy.get("#items_0_quantity").type("1");
    cy.get("#items_0_price").type("1500");
    
    cy.contains("Select Tax Value").click({ force: true });
    
    cy.get("span").contains("Tax 0%", { matchCase: false }).click();
    cy.contains("button", "Save").click();
  });
});
describe("TC06_invoices", () => {
  it("tests TC06_invoices", () => {
    cy.viewport(935, 782);
    cy.visit("http://localhost:3000/login");

    cy.get("#normal_login_email").clear().type("admin@admin.com");
    cy.get("#normal_login_password").clear().type("admin123");
    cy.get("#normal_login_remember").click();
    cy.get('button[type="submit"]').click();
    cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
    cy.contains("Invoices").click();
    cy.url().should("include", "/invoice");
    cy.contains("Invoice List", { timeout: 8000 }).should("be.visible");
    cy.contains("Add New Invoice").click();
    cy.contains("Client", { timeout: 10000 }).should("be.visible");
    cy.get(".ant-select-selector").first().click();
    cy.get(".ant-select-dropdown", { timeout: 5000 }).should("be.visible");
    cy.get(".ant-select-item-option").first().click();
    cy.get("#number").clear().type("5") ;
    cy.get("#year").clear();
    cy.get("#notes").type("Test invoice for client");
    cy.get("#items_0_itemName").type("Consulting Service");
    cy.get("#items_0_description").type("Monthly Retainer");
    cy.get("#items_0_quantity").type("1");
    cy.get("#items_0_price").type("1500");
    
    cy.contains("Select Tax Value").click({ force: true });
    
    cy.get("span").contains("Tax 0%", { matchCase: false }).click();
    cy.contains("button", "Save").click();
  });
});
describe("TC05_invoices", () => {
  it("tests TC05_invoices", () => {
    cy.viewport(935, 782);
    cy.visit("http://localhost:3000/login");

    cy.get("#normal_login_email").clear().type("admin@admin.com");
    cy.get("#normal_login_password").clear().type("admin123");
    cy.get("#normal_login_remember").click();
    cy.get('button[type="submit"]').click();
    cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
    cy.contains("Invoices").click();
    cy.url().should("include", "/invoice");
    cy.contains("Invoice List", { timeout: 8000 }).should("be.visible");
    cy.contains("Add New Invoice").click();
    cy.contains("Client", { timeout: 10000 }).should("be.visible");
    cy.get(".ant-select-selector").first().click();
    cy.get(".ant-select-dropdown", { timeout: 5000 }).should("be.visible");
    cy.get(".ant-select-item-option").first().click();
    cy.get("#number").clear().type("-1") ;
    cy.get("#year").clear().type("2025");
    cy.get("#notes").type("Test invoice for client");
    cy.get("#items_0_itemName").type("Consulting Service");
    cy.get("#items_0_description").type("Monthly Retainer");
    cy.get("#items_0_quantity").type("1");
    cy.get("#items_0_price").type("1500");
    
    cy.contains("Select Tax Value").click({ force: true });
    
    cy.get("span").contains("Tax 0%", { matchCase: false }).click();
    cy.contains("button", "Save").click();
  });
});
describe("TC03_invoices", () => {
  it("tests TC03_invoices", () => {
    cy.viewport(935, 782);
    cy.visit("http://localhost:3000/login");

    cy.get("#normal_login_email").clear().type("admin@admin.com");
    cy.get("#normal_login_password").clear().type("admin123");
    cy.get("#normal_login_remember").click();
    cy.get('button[type="submit"]').click();
    cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
    cy.contains("Invoices").click();
    cy.url().should("include", "/invoice");
    cy.contains("Invoice List", { timeout: 8000 }).should("be.visible");
    cy.contains("Add New Invoice").click();
    cy.contains("Client", { timeout: 10000 }).should("be.visible");
    cy.get(".ant-select-selector").first().click();
    cy.get(".ant-select-dropdown", { timeout: 5000 }).should("be.visible");
    cy.get(".ant-select-item-option").first().click();
    cy.get("#number").clear();
    cy.get("#year").clear().type("2025");
    cy.get("#notes").type("Test invoice for client");
    cy.get("#items_0_itemName").type("Consulting Service");
    cy.get("#items_0_description").type("Monthly Retainer");
    cy.get("#items_0_quantity").type("1");
    cy.get("#items_0_price").type("1500");
    
    cy.contains("Select Tax Value").click({ force: true });
    
    cy.get("span").contains("Tax 0%", { matchCase: false }).click();
    cy.contains("button", "Save").click();
  });
});

describe("TC02_invoices", () => {
  it("tests TC02_invoices", () => {
    cy.viewport(935, 782);
    cy.visit("http://localhost:3000/login");

    cy.get("#normal_login_email").clear().type("admin@admin.com");
    cy.get("#normal_login_password").clear().type("admin123");
    cy.get("#normal_login_remember").click();
    cy.get('button[type="submit"]').click();
    cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
    cy.contains("Invoices").click();
    cy.url().should("include", "/invoice");
    cy.contains("Invoice List", { timeout: 8000 }).should("be.visible");
    cy.contains("Add New Invoice").click();
    cy.contains("Client", { timeout: 10000 }).should("be.visible");
    cy.get("#number").clear().type("5");
    cy.get("#year").clear().type("2025");
    cy.get("#notes").type("Test invoice for client");
    cy.get("#items_0_itemName").type("Consulting Service");
    cy.get("#items_0_description").type("Monthly Retainer");
    cy.get("#items_0_quantity").type("1");
    cy.get("#items_0_price").type("1500");
    cy.contains("Select Tax Value").click({ force: true });
    
    cy.get("span").contains("Tax 0%", { matchCase: false }).click();
    cy.contains("button", "Save").click();
  });
});
describe("TC01_invoices", () => {
  it("tests TC01_invoices", () => {
    cy.viewport(935, 782);
    cy.visit("http://localhost:3000/login");

    cy.get("#normal_login_email").clear().type("admin@admin.com");
    cy.get("#normal_login_password").clear().type("admin123");
    cy.get("#normal_login_remember").click();
    cy.get('button[type="submit"]').click();
    cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
    cy.contains("Invoices").click();
    cy.url().should("include", "/invoice");
    cy.contains("Invoice List", { timeout: 8000 }).should("be.visible");
    cy.contains("Add New Invoice").click();
    cy.contains("Client", { timeout: 10000 }).should("be.visible");
    cy.get(".ant-select-selector").first().click();
    cy.get(".ant-select-dropdown", { timeout: 5000 }).should("be.visible");
    cy.get(".ant-select-item-option").first().click();
    cy.get("#number").clear().type("5");
    cy.get("#year").clear().type("2025");
    cy.get("#notes").type("Test invoice for client");
    cy.get("#items_0_itemName").type("Consulting Service");
    cy.get("#items_0_description").type("Monthly Retainer");
    cy.get("#items_0_quantity").type("1");
    cy.get("#items_0_price").type("1500");
    
    // FIXED: Use force: true or target the parent element
    cy.contains("Select Tax Value").click({ force: true });
    // OR: cy.get('.ant-select-selector').last().click();
    
    cy.get("span").contains("Tax 0%", { matchCase: false }).click();
    cy.contains("button", "Save").click();
  });
});