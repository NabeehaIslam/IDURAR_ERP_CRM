// describe("TC06_quotes", () => {
//   it("tests TC06_quotes", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Quote").click();
//     cy.url().should("include", "/quote");
//     cy.contains("Proforma Invoice List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Proforma Invoice").click();
//     cy.contains("Client", { timeout: 10000 }).should("be.visible");
//     cy.get(".ant-select-selector").first().click();
//     cy.get(".ant-select-dropdown", { timeout: 5000 }).should("be.visible");
//     cy.get(".ant-select-item-option").first().click();
//     cy.get("#number").clear().type("5") ;
//     cy.get("#year").clear().type("ABCD");
//     cy.get("#notes").type("Test invoice for client");
//     cy.get("#items_0_itemName").type("Consulting Service");
//     cy.get("#items_0_description").type("Monthly Retainer");
//     cy.get("#items_0_quantity").type("1");
//     cy.get("#items_0_price").type("1500");
    
//     cy.contains("Select Tax Value").click({ force: true });
    
//     cy.get("span").contains("Tax 0%", { matchCase: false }).click();
//     cy.contains("button", "Save").click();
//   });
// });
// describe("TC05_quotes", () => {
//   it("tests TC05_quotes", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Quote").click();
//     cy.url().should("include", "/quote");
//     cy.contains("Proforma Invoice List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Proforma Invoice").click();
//     cy.contains("Client", { timeout: 10000 }).should("be.visible");
//     cy.get(".ant-select-selector").first().click();
//     cy.get(".ant-select-dropdown", { timeout: 5000 }).should("be.visible");
//     cy.get(".ant-select-item-option").first().click();
//     cy.get("#number").clear().type("5") ;
//     cy.get("#year").clear();
//     cy.get("#notes").type("Test invoice for client");
//     cy.get("#items_0_itemName").type("Consulting Service");
//     cy.get("#items_0_description").type("Monthly Retainer");
//     cy.get("#items_0_quantity").type("1");
//     cy.get("#items_0_price").type("1500");
    
//     cy.contains("Select Tax Value").click({ force: true });
    
//     cy.get("span").contains("Tax 0%", { matchCase: false }).click();
//     cy.contains("button", "Save").click();
//   });
// });
// describe("TC04_quotes", () => {
//   it("tests TC04_quotes", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Quote").click();
//     cy.url().should("include", "/quote");
//     cy.contains("Proforma Invoice List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Proforma Invoice").click();
//     cy.contains("Client", { timeout: 10000 }).should("be.visible");
//     cy.get(".ant-select-selector").first().click();
//     cy.get(".ant-select-dropdown", { timeout: 5000 }).should("be.visible");
//     cy.get(".ant-select-item-option").first().click();
//     cy.get("#number").clear().type("-1") ;
//     cy.get("#year").clear().type("2025");
//     cy.get("#notes").type("Test invoice for client");
//     cy.get("#items_0_itemName").type("Consulting Service");
//     cy.get("#items_0_description").type("Monthly Retainer");
//     cy.get("#items_0_quantity").type("1");
//     cy.get("#items_0_price").type("1500");
    
//     cy.contains("Select Tax Value").click({ force: true });
    
//     cy.get("span").contains("Tax 0%", { matchCase: false }).click();
//     cy.contains("button", "Save").click();
//   });
// });
// describe("TC03_quotes", () => {
//   it("tests TC03_quotes", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Quote").click();
//     cy.url().should("include", "/quote");
//     cy.contains("Proforma Invoice List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Proforma Invoice").click();
//     cy.contains("Client", { timeout: 10000 }).should("be.visible");
//     cy.get(".ant-select-selector").first().click();
//     cy.get(".ant-select-dropdown", { timeout: 5000 }).should("be.visible");
//     cy.get(".ant-select-item-option").first().click();
//     cy.get("#number").clear();
//     cy.get("#year").clear().type("2025");
//     cy.get("#notes").type("Test invoice for client");
//     cy.get("#items_0_itemName").type("Consulting Service");
//     cy.get("#items_0_description").type("Monthly Retainer");
//     cy.get("#items_0_quantity").type("1");
//     cy.get("#items_0_price").type("1500");
    
//     cy.contains("Select Tax Value").click({ force: true });
    
//     cy.get("span").contains("Tax 0%", { matchCase: false }).click();
//     cy.contains("button", "Save").click();
//   });
// });

// describe("TC02_quotes", () => {
//   it("tests TC02_quotes", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
    
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Quote").click();
//     cy.url().should("include", "/quote");
//     cy.contains("Proforma Invoice List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Proforma Invoice").click();
//     cy.contains("Client", { timeout: 10000 }).should("be.visible");
//     cy.get("#number").clear().type("5");
//     cy.get("#year").clear().type("2025");
//     cy.get("#notes").type("Test invoice for client");
//     cy.get("#items_0_itemName").type("Consulting Service");
//     cy.get("#items_0_description").type("Monthly Retainer");
//     cy.get("#items_0_quantity").type("1");
//     cy.get("#items_0_price").type("1500");
//     cy.contains("Select Tax Value").click({ force: true });
    
//     cy.get("span").contains("Tax 0%", { matchCase: false }).click();
//     cy.contains("button", "Save").click();
//   });
// });
// describe("TC25_quote", () => {
//   it("tests TC25_quote", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Quote").click();
//     cy.url().should("include", "/quote");
//     cy.contains("Proforma Invoice List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Proforma Invoice").click();
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
// describe("TC24_quote", () => {
//   it("tests TC24_quote", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Quote").click();
//     cy.url().should("include", "/quote");
//     cy.contains("Proforma Invoice List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Proforma Invoice").click();
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
// describe("TC23_quote", () => {
//   it("tests TC23_quote", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Quote").click();
//     cy.url().should("include", "/quote");
//     cy.contains("Proforma Invoice List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Proforma Invoice").click();
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
// describe("TC26_quote", () => {
//   it("tests TC26_quote", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Quote").click();
//     cy.url().should("include", "/quote");
//     cy.contains("Proforma Invoice List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Proforma Invoice").click();
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

// describe("TC20_quote", () => {
//   it("tests TC20_quote", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Quote").click();
//     cy.url().should("include", "/quote");
//     cy.contains("Proforma Invoice List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Proforma Invoice").click();
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
// describe("TC19_quote", () => {
//   it("tests TC19_quote", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Quote").click();
//     cy.url().should("include", "/quote");
//     cy.contains("Proforma Invoice List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Proforma Invoice").click();
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
//     cy.get("#items_0_price").type("-50");
//     cy.contains("Select Tax Value").click({ force: true });
    
//     cy.get("span").contains("Tax 0%", { matchCase: false }).click();
//     cy.contains("button", "Save").click();
//   });
// });
// //last few test cases for quote form
// describe("TC18_quote", () => {
//   it("tests TC18_quote", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Quote").click();
//     cy.url().should("include", "/quote");
//     cy.contains("Proforma Invoice List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Proforma Invoice").click();
//     cy.contains("Client", { timeout: 10000 }).should("be.visible");
//     cy.get(".ant-select-selector").first().click();
//     cy.get(".ant-select-dropdown", { timeout: 5000 }).should("be.visible");
//     cy.get(".ant-select-item-option").first().click();
//     cy.get("#number").clear().type("5") ;
//     cy.get("#year").clear().type("2025");
//     cy.get("#date").clear().type("02/12/2025");
//     cy.get("#expiredDate").clear().type("01/01/2025");
//     cy.get("#notes").clear().type("Good");
//     cy.get("#items_0_itemName").type("Consulting Service");
//     cy.get("#items_0_description").type("Monthly Retainer");
//     cy.get("#items_0_quantity").type("1");
//    // cy.get("#items_0_price").type("1500");
//     cy.contains("Select Tax Value").click({ force: true });
    
//     cy.get("span").contains("Tax 0%", { matchCase: false }).click();
//     cy.contains("button", "Save").click();
//   });
// });
// describe("TC17_quote", () => {
//   it("tests TC17_quote", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Quote").click();
//     cy.url().should("include", "/quote");
//     cy.contains("Proforma Invoice List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Proforma Invoice").click();
//     cy.contains("Client", { timeout: 10000 }).should("be.visible");
//     cy.get(".ant-select-selector").first().click();
//     cy.get(".ant-select-selector").first().click();
//     cy.get(".ant-select-selector").first().click();
//     cy.get(".ant-select-dropdown", { timeout: 5000 }).should("be.visible");
//     cy.get(".ant-select-item-option").first().click();
//     cy.get("#number").clear().type("5") ;
//     cy.get("#year").clear().type("2025");
//     cy.get("#date").clear().type("02/12/2025");
//     cy.get("#expiredDate").clear().type("01/01/2025");
//     cy.get("#notes").clear().type("Good");
//     cy.get("#items_0_itemName").type("Consulting Service");
//     cy.get("#items_0_description").type("Monthly Retainer");
//     cy.get("#items_0_quantity").type("-5");
//     cy.get("#items_0_price").type("1500");
//     cy.contains("Select Tax Value").click({ force: true });
    
//     cy.get("span").contains("Tax 0%", { matchCase: false }).click();
//     cy.contains("button", "Save").click();
//   });
// });
// describe("TC16_quote", () => {
//   it("tests TC16_quote", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Quote").click();
//     cy.url().should("include", "/quote");
//     cy.contains("Proforma Invoice List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Proforma Invoice").click();
//     cy.contains("Client", { timeout: 10000 }).should("be.visible");
//     cy.get(".ant-select-selector").first().click();
//     cy.get(".ant-select-dropdown", { timeout: 5000 }).should("be.visible");
//     cy.get(".ant-select-item-option").first().click();
//     cy.get("#number").clear().type("5") ;
//     cy.get("#year").clear().type("2025");
//     cy.get("#date").clear().type("02/12/2025");
//     cy.get("#expiredDate").clear().type("01/01/2025");
//     cy.get("#notes").clear().type("Good");
//        cy.get("#items_0_itemName").type("Consulting Service");
//     cy.get("#items_0_description").type("Monthly Retainer");
//     cy.get("#items_0_quantity").type("0");
//     cy.get("#items_0_price").type("1500");
//     cy.contains("Select Tax Value").click({ force: true });
    
//     cy.get("span").contains("Tax 0%", { matchCase: false }).click();
//     cy.contains("button", "Save").click();
//   });
// });
// describe("TC15_quote", () => {
//   it("tests TC15_quote", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Quote").click();
//     cy.url().should("include", "/quote");
//     cy.contains("Proforma Invoice List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Proforma Invoice").click();
//     cy.contains("Client", { timeout: 10000 }).should("be.visible");
//     cy.get(".ant-select-selector").first().click();
//     cy.get(".ant-select-dropdown", { timeout: 5000 }).should("be.visible");
//     cy.get(".ant-select-item-option").first().click();
//     cy.get("#number").clear().type("5") ;
//     cy.get("#year").clear().type("2025");
//     cy.get("#date").clear().type("02/12/2025");
//     cy.get("#expiredDate").clear().type("01/01/2025");
//     cy.get("#notes").clear().type("Good");
//      cy.get("#items_0_itemName").type("Consulting Service");
//     cy.get("#items_0_description").type("Monthly Retainer");
//    // cy.get("#items_0_quantity").type("1");
//     cy.get("#items_0_price").type("1500");
//     cy.contains("Select Tax Value").click({ force: true });
    
//     cy.get("span").contains("Tax 0%", { matchCase: false }).click();
//     cy.contains("button", "Save").click();
//   });
// });

// describe("TC14_quote", () => {
//   it("tests TC14_quote", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//       cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Quote").click();
//     cy.url().should("include", "/quote");
//     cy.contains("Proforma Invoice List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Proforma Invoice").click();
//     cy.contains("Client", { timeout: 10000 }).should("be.visible");
//     cy.get(".ant-select-selector").first().click();
//     cy.get(".ant-select-dropdown", { timeout: 5000 }).should("be.visible");
//     cy.get(".ant-select-item-option").first().click();
//     cy.get("#number").clear().type("5") ;
//     cy.get("#year").clear().type("2025");
//     cy.get("#date").clear().type("02/12/2025");
//     cy.get("#expiredDate").clear().type("01/01/2025");
//     cy.get("#notes").clear().type("Good");
//     // cy.get("#items_0_itemName").type("Consulting Service");
//     cy.get("#items_0_description").type("Monthly Retainer");
//    cy.get("#items_0_quantity").type("1");
//     cy.get("#items_0_price").type("1500");
//     cy.contains("Select Tax Value").click({ force: true });
    
//     cy.get("span").contains("Tax 0%", { matchCase: false }).click();
//     cy.contains("button", "Save").click();
//   });
// });
// describe("TC13_quote", () => {
//   it("tests TC13_quote", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//       cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//       cy.contains("Invoices").click();
//       cy.url().should("include", "/invoice");
//       cy.contains("Proforma Invoice List", { timeout: 8000 }).should("be.visible");
//       cy.contains("Add New Proforma Invoice").click();
//       cy.contains("Client", { timeout: 10000 }).should("be.visible");
//     cy.get(".ant-select-selector").first().click();
//     cy.get(".ant-select-dropdown", { timeout: 5000 }).should("be.visible");
//     cy.get(".ant-select-item-option").first().click();
//     cy.get("#number").clear().type("5") ;
//     cy.get("#year").clear().type("2025");
//     cy.get("#date").clear().type("02/12/2025");
//     cy.get("#expiredDate").clear().type("01/01/2025");
//     cy.get("#notes").clear().type("Good");
//     cy.contains("Select Tax Value").click({ force: true });
    
//     cy.get("span").contains("Tax 0%", { matchCase: false }).click();
//     cy.contains("button", "Save").click();
//   });
// });
// describe("TC12_quote", () => {
//   it("tests TC12_quote", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Quote").click();
//     cy.url().should("include", "/quote");
//     cy.contains("Proforma Invoice List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Proforma Invoice").click();
//     cy.contains("Client", { timeout: 10000 }).should("be.visible");
//     cy.get(".ant-select-selector").first().click();
//     cy.get(".ant-select-dropdown", { timeout: 5000 }).should("be.visible");
//     cy.get(".ant-select-item-option").first().click();
//     cy.get("#number").clear().type("5") ;
//     cy.get("#year").clear().type("2025");
//     cy.get("#date").clear().type("02/12/2025");
//     cy.get("#expiredDate").clear().type("01/01/2026");
//     cy.get("#notes").type("Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didnt listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then she continued her way. On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word and and the Little Blind Text should turn around and return to its own, safe country. But nothing the copy said could convince her and so it didnt take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their projects again and again. And if she hasnt been rewritten, then they are still using her.Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didnt listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline");
//     cy.contains("Select Tax Value").click({ force: true });
    
//     cy.get("span").contains("Tax 0%", { matchCase: false }).click();
//     cy.contains("button", "Save").click();
//   });
// });
// describe("TC11_quote", () => {
//   it("tests TC11_quote", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Quote").click();
//     cy.url().should("include", "/quote");
//     cy.contains("Proforma Invoice List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Proforma Invoice").click();
//     cy.contains("Client", { timeout: 10000 }).should("be.visible");
//     cy.get(".ant-select-selector").first().click();
//     cy.get(".ant-select-dropdown", { timeout: 5000 }).should("be.visible");
//     cy.get(".ant-select-item-option").first().click();
//     cy.get("#number").clear().type("5") ;
//     cy.get("#year").clear().type("2025");
//     cy.get("#date").clear().type("02/12/2025");
//     cy.get("#expiredDate").clear().type("01/01/2025");
//     cy.get("#notes").type("Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didnt listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then she continued her way. On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word and and the Little Blind Text should turn around and return to its own, safe country. But nothing the copy said could convince her and so it didnt take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their projects again and again. And if she hasnt been rewritten, then they are still using her.Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didnt listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline");
//     cy.get("#items_0_itemName").type("Consulting Service");
//     cy.get("#items_0_description").type("Monthly Retainer");
//     cy.get("#items_0_quantity").type("1");
//     cy.get("#items_0_price").type("1500");
    
//     cy.contains("Select Tax Value").click({ force: true });
    
//     cy.get("span").contains("Tax 0%", { matchCase: false }).click();
//     cy.contains("button", "Save").click();
//   });
// });
// describe("TC10_quote", () => {
//   it("tests TC10_quote", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Quote").click();
//     cy.url().should("include", "/quote");
//     cy.contains("Proforma Invoice List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Proforma Invoice").click();
//     cy.contains("Client", { timeout: 10000 }).should("be.visible");
//     cy.get(".ant-select-selector").first().click();
//     cy.get(".ant-select-dropdown", { timeout: 5000 }).should("be.visible");
//     cy.get(".ant-select-item-option").first().click();
//     cy.get("#number").clear().type("5") ;
//     cy.get("#year").clear().type("2025");
//     cy.get("#date").clear().type("02/12/2025");
//     cy.get("#expiredDate").clear().type("01/01/2025");
//     cy.get("#notes").type("Test invoice for client");
//     cy.get("#items_0_itemName").type("Consulting Service");
//     cy.get("#items_0_description").type("Monthly Retainer");
//     cy.get("#items_0_quantity").type("1");
//     cy.get("#items_0_price").type("1500");
    
//     cy.contains("Select Tax Value").click({ force: true });
    
//     cy.get("span").contains("Tax 0%", { matchCase: false }).click();
//     cy.contains("button", "Save").click();
//   });
// });
// //first ten test cases for quote form
// describe("TC9_quotes", () => {
//   it("tests TC9_quotes", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Quote").click();
//     cy.url().should("include", "/quote");
//     cy.contains("Proforma Invoice List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Proforma Invoice").click();
//     cy.contains("Client", { timeout: 10000 }).should("be.visible");
//     cy.get(".ant-select-selector").first().click();
//     cy.get(".ant-select-dropdown", { timeout: 5000 }).should("be.visible");
//     cy.get(".ant-select-item-option").first().click();
//     cy.get("#number").clear().type("5") ;
//     cy.get("#year").clear().type("2025");
//     cy.get("#date").clear().type("3/12/2025");
//     cy.get("#expiredDate").clear();
//     cy.get("#notes").type("Test invoice for client");
//     cy.get("#items_0_itemName").type("Consulting Service");
//     cy.get("#items_0_description").type("Monthly Retainer");
//     cy.get("#items_0_quantity").type("1");
//     cy.get("#items_0_price").type("1500");
    
//     cy.contains("Select Tax Value").click({ force: true });
    
//     cy.get("span").contains("Tax 0%", { matchCase: false }).click();
//     cy.contains("button", "Save").click();
//   });
// });

// describe("TC08_quotes", () => {
//   it("tests TC08_quotes", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Quote").click();
//     cy.url().should("include", "/quote");
//     cy.contains("Proforma Invoice List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Proforma Invoice").click();
//     cy.contains("Client", { timeout: 10000 }).should("be.visible");
//     cy.get(".ant-select-selector").first().click();
//     cy.get(".ant-select-dropdown", { timeout: 5000 }).should("be.visible");
//     cy.get(".ant-select-item-option").first().click();
//     cy.get("#number").clear().type("5") ;
//     cy.get("#year").clear().type("2025");
//     cy.get("#date").clear().type("32/13/2025");
//     cy.get("#notes").type("Test invoice for client");
//     cy.get("#items_0_itemName").type("Consulting Service");
//     cy.get("#items_0_description").type("Monthly Retainer");
//     cy.get("#items_0_quantity").type("1");
//     cy.get("#items_0_price").type("1500");
    
//     cy.contains("Select Tax Value").click({ force: true });
    
//     cy.get("span").contains("Tax 0%", { matchCase: false }).click();
//     cy.contains("button", "Save").click();
//   });
// });
// describe("TC07_quotes", () => {
//   it("tests TC07_quotes", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
    
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Quote").click();
//     cy.url().should("include", "/quote");
//     cy.contains("Proforma Invoice List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Proforma Invoice").click();
//     cy.contains("Client", { timeout: 10000 }).should("be.visible");
//     cy.get(".ant-select-selector").first().click();
//     cy.get(".ant-select-dropdown", { timeout: 5000 }).should("be.visible");
//     cy.get(".ant-select-item-option").first().click();
//     cy.get("#number").clear().type("5") ;
//     cy.get("#year").clear().type("2025");
//     cy.get("#date").clear();
//     cy.get("#notes").type("Test invoice for client");
//     cy.get("#items_0_itemName").type("Consulting Service");
//     cy.get("#items_0_description").type("Monthly Retainer");
//     cy.get("#items_0_quantity").type("1");
//     cy.get("#items_0_price").type("1500");
    
//     cy.contains("Select Tax Value").click({ force: true });
    
//     cy.get("span").contains("Tax 0%", { matchCase: false }).click();
//     cy.contains("button", "Save").click();
//   });
// });

// describe("TC01_quotes", () => {
//   it("tests TC01_quotes", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Quote").click();
//     cy.url().should("include", "/quote");
//     cy.contains("Proforma Invoice List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Proforma Invoice").click();
//     cy.contains("Client", { timeout: 10000 }).should("be.visible");
//     cy.get(".ant-select-selector").first().click();
//     cy.get(".ant-select-dropdown", { timeout: 5000 }).should("be.visible");
//     cy.get(".ant-select-item-option").first().click();
//     cy.get("#number").clear().type("5");
//     cy.get("#year").clear().type("2025");
//     cy.get("#notes").type("Test invoice for client");
//     cy.get("#items_0_itemName").type("Consulting Service");
//     cy.get("#items_0_description").type("Monthly Retainer");
//     cy.get("#items_0_quantity").type("1");
//     cy.get("#items_0_price").type("1500");
    
//     // FIXED: Use force: true or target the parent element
//     cy.contains("Select Tax Value").click({ force: true });
//     // OR: cy.get('.ant-select-selector').last().click();
    
//     cy.get("span").contains("Tax 0%", { matchCase: false }).click();
//     cy.contains("button", "Save").click();
//   });

// });
