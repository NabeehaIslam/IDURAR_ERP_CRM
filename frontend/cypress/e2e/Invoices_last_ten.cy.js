// describe("TC29_invoices", () => {
//   it("tests TC29_invoices", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Invoices").click();
//     cy.url().should("include", "/invoice");
//     cy.contains("Invoice List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Invoice").click();
//     cy.contains("Client", { timeout: 10000 }).should("be.visible");
//     cy.get(".ant-select-selector").first().click();
//     cy.get(".ant-select-dropdown", { timeout: 5000 }).should("be.visible");
//     cy.get(".ant-select-item-option").first().click();
//     cy.get("#number").clear().type("5") ;
//     cy.get("#year").clear().type("2025");
//     cy.get("#date").clear().type("02/12/2025");
//     cy.get("#expiredDate").clear().type("01/01/2026");
//     cy.get("#notes").clear().type("Good");
//      cy.get("#items_0_itemName").type("Accounting Service");
//     cy.get("#items_0_description").type("101 charLorem ipsum Morbi erat ex, lacinia nec efficitur eget, sagittis ut orci. Etiam in dolor placerat, pharetra ligula et, bibendum neque. Vestibulum vitae congue lectus, sed ultricies augue. Nam iaculis elit nec velit luctus, vitae rutrum nunc imperdiet. Nunc vel turpis sit amet lectus pellentesque tincidunt. Proin commodo tincidunt enim, at sodales mi dictum ac. Maecenas molestie, metus quis malesuada dictum, leo erat egestas lacus, sit amet tristique urna magna a diam. Donec ultricies dui sit amet mi ornare egestas. Phasellus ultricies lectus non interdum pellentesque. Cras nisi tellus, feugiat sed enim quis, tristique interdum lacus. Sed vel pharetra arcu, ac fermentum neque. Morbi mollis sollicitudin varius. Ut sit amet vulputate velit.101 charLorem ipsum Morbi erat ex, lacinia nec efficitur eget, sagittis ut orci. Etiam in dolor placerat, pharetra ligula et, bibendum neque. Vestibulum vitae congue lectus, sed ultricies augue. Nam iaculis elit nec velit luctus, vitae rutrum nunc imperdiet. Nunc vel turpis sit amet lectus pellentesque tincidunt. Proin commodo tincidunt enim, at sodales mi dictum ac. Maecenas molestie, metus quis malesuada dictum, leo erat egestas lacus, sit amet tristique urna magna a diam. Donec ultricies dui sit amet mi ornare egestas. Phasellus ultricies lectus non interdum pellentesque. Cras nisi tellus, feugiat sed enim quis, tristique interdum lacus. Sed vel pharetra arcu, ac fermentum neque. Morbi mollis sollicitudin varius. Ut sit amet vulputate velit.");
//     cy.get("#items_0_quantity").type("1");
//     cy.get("#items_0_price").type("100");
//     cy.contains("Select Tax Value").click({ force: true });
    
//     cy.get("span").contains("Tax 0%", { matchCase: false }).click();
//     cy.contains("button", "Save").click();
//   });
// });
// describe("TC28_invoices", () => {
//   it("tests TC28_invoices", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Invoices").click();
//     cy.url().should("include", "/invoice");
//     cy.contains("Invoice List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Invoice").click();
//     cy.contains("Client", { timeout: 10000 }).should("be.visible");
//     cy.get(".ant-select-selector").first().click();
//     cy.get(".ant-select-dropdown", { timeout: 5000 }).should("be.visible");
//     cy.get(".ant-select-item-option").first().click();
//     cy.get("#number").clear().type("5") ;
//     cy.get("#year").clear().type("2025");
//     cy.get("#date").clear().type("02/12/2025");
//     cy.get("#expiredDate").clear().type("01/01/2026");
//     cy.get("#notes").clear().type("Good");
//      cy.get("#items_0_itemName").type("101 charLorem ipsum Morbi erat ex, lacinia nec efficitur eget, sagittis ut orci. Etiam in dolor placerat, pharetra ligula et, bibendum neque. Vestibulum vitae congue lectus, sed ultricies augue. Nam iaculis elit nec velit luctus, vitae rutrum nunc imperdiet. Nunc vel turpis sit amet lectus pellentesque tincidunt. Proin commodo tincidunt enim, at sodales mi dictum ac. Maecenas molestie, metus quis malesuada dictum, leo erat egestas lacus, sit amet tristique urna magna a diam. Donec ultricies dui sit amet mi ornare egestas. Phasellus ultricies lectus non interdum pellentesque. Cras nisi tellus, feugiat sed enim quis, tristique interdum lacus. Sed vel pharetra arcu, ac fermentum neque. Morbi mollis sollicitudin varius. Ut sit amet vulputate velit.");
//     cy.get("#items_0_description").type("Monthly Retainer");
//     cy.get("#items_0_quantity").type("1");
//     cy.get("#items_0_price").type("100");
//     cy.contains("Select Tax Value").click({ force: true });
    
//     cy.get("span").contains("Tax 0%", { matchCase: false }).click();
//     cy.contains("button", "Save").click();
//   });
// });
// describe("TC27_invoices", () => {
//   it("tests TC27_invoices", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Invoices").click();
//     cy.url().should("include", "/invoice");
//     cy.contains("Invoice List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Invoice").click();
//     cy.contains("Client", { timeout: 10000 }).should("be.visible");
//     cy.get(".ant-select-selector").first().click();
//     cy.get(".ant-select-dropdown", { timeout: 5000 }).should("be.visible");
//     cy.get(".ant-select-item-option").first().click();
//     cy.get("#number").clear().type("5") ;
//     cy.get("#year").clear().type("2025");
//     cy.get("#date").clear().type("02/12/2025");
//     cy.get("#expiredDate").clear().type("01/01/2026");
//     cy.get("#notes").clear().type("Good");
//      cy.get("#items_0_itemName").type("Lorem ipsum Morbi erat ex, lacinia nec efficitur eget, sagittis ut orci. Etiam in dolor placerat, pharetra ligula et, bibendum neque. Vestibulum vitae congue lectus, sed ultricies augue. Nam iaculis elit nec velit luctus, vitae rutrum nunc imperdiet. Nunc vel turpis sit amet lectus pellentesque tincidunt. Proin commodo tincidunt enim, at sodales mi dictum ac. Maecenas molestie, metus quis malesuada dictum, leo erat egestas lacus, sit amet tristique urna magna a diam. Donec ultricies dui sit amet mi ornare egestas. Phasellus ultricies lectus non interdum pellentesque. Cras nisi tellus, feugiat sed enim quis, tristique interdum lacus. Sed vel pharetra arcu, ac fermentum neque. Morbi mollis sollicitudin varius. Ut sit amet vulputate velit.");
//     cy.get("#items_0_description").type("Monthly Retainer");
//     cy.get("#items_0_quantity").type("1");
//     cy.get("#items_0_price").type("100");
//     cy.contains("Select Tax Value").click({ force: true });
    
//     cy.get("span").contains("Tax 0%", { matchCase: false }).click();
//     cy.contains("button", "Save").click();
//   });
// });
// describe("TC30_invoices", () => {
//   it("tests TC30_invoices", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Invoices").click();
//     cy.url().should("include", "/invoice");
//     cy.contains("Invoice List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Invoice").click();
//     cy.contains("Client", { timeout: 10000 }).should("be.visible");
//     cy.get(".ant-select-selector").first().click();
//     cy.get(".ant-select-dropdown", { timeout: 5000 }).should("be.visible");
//     cy.get(".ant-select-item-option").first().click();
//     cy.get("#number").clear().type("5") ;
//     cy.get("#year").clear().type("2025");
//     cy.get("#date").clear().type("02/12/2025");
//     cy.get("#expiredDate").clear().type("01/01/2026");
//     cy.get("#notes").clear().type("Good");
//      cy.get("#items_0_itemName").type("Accounting Service");
//     cy.get("#items_0_description").type("Monthly Retainer");
//     cy.get("#items_0_quantity").type("1");
//     cy.get("#items_0_price").type("100");
//     cy.contains("Select Tax Value").click({ force: true });
    
//     cy.get("span").contains("Tax 0%", { matchCase: false }).click();
//     cy.contains("button", "Save").click();
//   });
// });
// describe("TC22_invoices", () => {
//   it("tests TC22_invoices", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Invoices").click();
//     cy.url().should("include", "/invoice");
//     cy.contains("Invoice List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Invoice").click();
//     cy.contains("Client", { timeout: 10000 }).should("be.visible");
//     cy.get(".ant-select-selector").first().click();
//     cy.get(".ant-select-dropdown", { timeout: 5000 }).should("be.visible");
//     cy.get(".ant-select-item-option").first().click();
//     cy.get("#number").clear().type("5") ;
//     cy.get("#year").clear().type("2025");
//     cy.get("#date").clear().type("02/12/2025");
//     cy.get("#expiredDate").clear().type("01/01/2026");
//     cy.get("#notes").clear().type("Good");
//      cy.get("#items_0_itemName").type("Consulting Service");
//     cy.get("#items_0_description").type("Monthly Retainer");
//     cy.get("#items_0_quantity").type("1");
//     cy.get("#items_0_price").type("0");
//     cy.contains("Select Tax Value").click({ force: true });
    
//     cy.get("span").contains("Tax 0%", { matchCase: false }).click();
//     cy.contains("button", "Save").click();
//   });
// });
// describe("TC21_invoices", () => {
//   it("tests TC21_invoices", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Invoices").click();
//     cy.url().should("include", "/invoice");
//     cy.contains("Invoice List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Invoice").click();
//     cy.contains("Client", { timeout: 10000 }).should("be.visible");
//     cy.get(".ant-select-selector").first().click();
//     cy.get(".ant-select-dropdown", { timeout: 5000 }).should("be.visible");
//     cy.get(".ant-select-item-option").first().click();
//     cy.get("#number").clear().type("5") ;
//     cy.get("#year").clear().type("2025");
//     cy.get("#date").clear().type("02/12/2025");
//     cy.get("#expiredDate").clear().type("01/01/2026");
//     cy.get("#notes").clear().type("Good");
//      cy.get("#items_0_itemName").type("Consulting Service");
//     cy.get("#items_0_description").type("Monthly Retainer");
//     cy.get("#items_0_quantity").type("1");
//     cy.get("#items_0_price").type("-5");
//     cy.contains("Select Tax Value").click({ force: true });
    
//     cy.get("span").contains("Tax 0%", { matchCase: false }).click();
//     cy.contains("button", "Save").click();
//   });
// });
// describe("TC20_invoices", () => {
//   it("tests TC20_invoices", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Invoices").click();
//     cy.url().should("include", "/invoice");
//     cy.contains("Invoice List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Invoice").click();
//     cy.contains("Client", { timeout: 10000 }).should("be.visible");
//     cy.get(".ant-select-selector").first().click();
//     cy.get(".ant-select-dropdown", { timeout: 5000 }).should("be.visible");
//     cy.get(".ant-select-item-option").first().click();
//     cy.get("#number").clear().type("5") ;
//     cy.get("#year").clear().type("2025");
//     cy.get("#date").clear().type("02/12/2025");
//     cy.get("#expiredDate").clear().type("01/01/2026");
//     cy.get("#notes").clear().type("Good");
//      cy.get("#items_0_itemName").type("Consulting Service");
//     cy.get("#items_0_description").type("Monthly Retainer");
//     cy.get("#items_0_quantity").type("1");
//     //cy.get("#items_0_price").type("1500");
//     cy.contains("Select Tax Value").click({ force: true });
    
//     cy.get("span").contains("Tax 0%", { matchCase: false }).click();
//     cy.contains("button", "Save").click();
//   });
// });

