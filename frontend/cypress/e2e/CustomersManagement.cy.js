// describe("TC-01 Customer Management", () => {
//   it("tests TC-01 Customer Management", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Customers").click();
//     cy.url().should("include", "/customer");
//     cy.contains("Client List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Client").click();

//     // Wait for the form to appear - look for ANY input field first
//     cy.get('input[type="text"]', { timeout: 10000 }).should("be.visible");

//     cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(1) input").click();
//     cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(1) input").type("Maryam");
    
//     cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(3) input").click();
//     cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(3) input").type("House 24");
//     cy.get("div.collapseBox div:nth-of-type(1) > div:nth-of-type(4) input").click();
//     cy.get("div.collapseBox div:nth-of-type(1) > div:nth-of-type(4) input").type("123456789");
//     cy.get("div.collapseBox div:nth-of-type(5) input").click();
//     cy.get("div.collapseBox div:nth-of-type(5) input").type("email@example.com");
//     cy.get("div.collapseBox form > div.ant-form-item span").click();
//     cy.contains("success", { matchCase: false, timeout: 8000 }).should("be.visible");
//   });
// });

// describe("TC-02 Customer Management", () => {
//   it("tests TC-02 Customer Management", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Customers").click();
//     cy.url().should("include", "/customer");
//     cy.contains("Client List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Client").click();

//     // Wait for the form to appear - look for ANY input field first
//     cy.get('input[type="text"]', { timeout: 10000 }).should("be.visible");

//       cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(1) input").click();
//     cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(1) input").type(" ");
//   //  cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(2) input").click();
//     //cy.get("div.ant-select-item-option-active > div").click();
//     cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(3) input").click();
//     cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(3) input").type("House 24");
//     cy.get("div.collapseBox div:nth-of-type(1) > div:nth-of-type(4) input").click();
//     cy.get("div.collapseBox div:nth-of-type(1) > div:nth-of-type(4) input").type("123456789");
//     cy.get("div.collapseBox div:nth-of-type(5) input").click();
//     cy.get("div.collapseBox div:nth-of-type(5) input").type("email@example.com");
//     cy.get("div.collapseBox form > div.ant-form-item span").click();
//     cy.contains("success", { matchCase: false, timeout: 8000 }).should("be.visible");
//   });
// });

// describe("TC-03 Customer Management", () => {
//   it("tests TC-03 Customer Management", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Customers").click();
//     cy.url().should("include", "/customer");
//     cy.contains("Client List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Client").click();

//     // Wait for the form to appear - look for ANY input field first
//     cy.get('input[type="text"]', { timeout: 10000 }).should("be.visible");

//       cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(1) input").click();
//     cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(1) input").type("John # 123");
//    // cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(2) input").click();
//    // cy.get("div.ant-select-item-option-active > div").click();
//     cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(3) input").click();
//     cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(3) input").type("House 24, STreet 11, park Road");
//     cy.get("div.collapseBox div:nth-of-type(1) > div:nth-of-type(4) input").click();
//     cy.get("div.collapseBox div:nth-of-type(1) > div:nth-of-type(4) input").type("15523456789");
//     cy.get("div.collapseBox div:nth-of-type(5) input").click();
//     cy.get("div.collapseBox div:nth-of-type(5) input").type("mary@example.com");
//     cy.get("div.collapseBox form > div.ant-form-item span").click();
//     cy.contains("success", { matchCase: false, timeout: 8000 }).should("be.visible");
//   });
// });


// describe("TC-04 Customer Management", () => {
//   it("tests TC-04 Customer Management", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Customers").click();
//     cy.url().should("include", "/customer");
//     cy.contains("Client List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Client").click();

//     // Wait for the form to appear - look for ANY input field first
//     cy.get('input[type="text"]', { timeout: 10000 }).should("be.visible");

//       cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(1) input").click();
//     cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(1) input").type("Jack Stephard");
//     cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(3) input").click();
//     cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(3) input").type("SHahzad Town,park Road");
//     cy.get("div.collapseBox div:nth-of-type(1) > div:nth-of-type(4) input").click();
//     cy.get("div.collapseBox div:nth-of-type(1) > div:nth-of-type(4) input").type("155456789");
//     cy.get("div.collapseBox div:nth-of-type(5) input").click();
//     cy.get("div.collapseBox div:nth-of-type(5) input").type("me@example.com");
//     cy.get("div.collapseBox form > div.ant-form-item span").click();
//     cy.contains("success", { matchCase: false, timeout: 8000 }).should("be.visible");
//   });
// });


// describe("TC-05 Customer Management", () => {
//   it("tests TC-05 Customer Management", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Customers").click();
//     cy.url().should("include", "/customer");
//     cy.contains("Client List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Client").click();

//     // Wait for the form to appear - look for ANY input field first
//     cy.get('input[type="text"]', { timeout: 10000 }).should("be.visible");

//       cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(1) input").click();
//     cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(1) input").type("Alice Wonder");
//     //cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(2) input").click();
//     //cy.get("div.ant-select-item-option-active > div").click();
//     cy.get("div.collapseBox div:nth-of-type(1) > div:nth-of-type(4) input").click();
//     cy.get("div.collapseBox div:nth-of-type(1) > div:nth-of-type(4) input").type("1554006789");
//     cy.get("div.collapseBox div:nth-of-type(5) input").click();
//     cy.get("div.collapseBox div:nth-of-type(5) input").type("alice@example.com");
//     cy.get("div.collapseBox form > div.ant-form-item span").click();
//     cy.contains("success", { matchCase: false, timeout: 8000 }).should("be.visible");
//   });
// });

// describe("TC-06 Customer Management", () => {
//   it("tests TC-06 Customer Management", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Customers").click();
//     cy.url().should("include", "/customer");
//     cy.contains("Client List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Client").click();

//     // Wait for the form to appear - look for ANY input field first
//     cy.get('input[type="text"]', { timeout: 10000 }).should("be.visible");

//       cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(1) input").click();
//     cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(1) input").type("Alice Wonder");
//     //cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(2) input").click();
//    // cy.get("div.ant-select-item-option-active > div").click();
//      cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(3) input").click();
//     cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(3) input").type("SHahzad Town,park Road");
//     cy.get("div.collapseBox div:nth-of-type(1) > div:nth-of-type(4) input").click();
//     cy.get("div.collapseBox div:nth-of-type(1) > div:nth-of-type(4) input").type("%$s1554006789");
//     cy.get("div.collapseBox div:nth-of-type(5) input").click();
//     cy.get("div.collapseBox div:nth-of-type(5) input").type("alice@example.com");
//     cy.get("div.collapseBox form > div.ant-form-item span").click();
//     cy.contains("success", { matchCase: false, timeout: 8000 }).should("be.visible");
//   });
// });

// describe("TC-07 Customer Management", () => {
//   it("tests TC-07 Customer Management", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Customers").click();
//     cy.url().should("include", "/customer");
//     cy.contains("Client List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Client").click();

//     // Wait for the form to appear - look for ANY input field first
//     cy.get('input[type="text"]', { timeout: 10000 }).should("be.visible");

//       cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(1) input").click();
//     cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(1) input").type("Alice Wonder");
//     //cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(2) input").click();
//     //cy.get("div.ant-select-item-option-active > div").click();
//      cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(3) input").click();
//     cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(3) input").type("SHahzad Town,park Road");
//     cy.get("div.collapseBox div:nth-of-type(5) input").click();
//     cy.get("div.collapseBox div:nth-of-type(5) input").type("alice@example.com");
//     cy.get("div.collapseBox form > div.ant-form-item span").click();
//     cy.contains("success", { matchCase: false, timeout: 8000 }).should("be.visible");
//   });
// });

// describe("TC-08 Customer Management", () => {
//   it("tests TC-08 Customer Management", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Customers").click();
//     cy.url().should("include", "/customer");
//     cy.contains("Client List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Client").click();

//     // Wait for the form to appear - look for ANY input field first
//     cy.get('input[type="text"]', { timeout: 10000 }).should("be.visible");

//       cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(1) input").click();
//     cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(1) input").type("Alice Wonder");
//     //cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(2) input").click();
//     //cy.get("div.ant-select-item-option-active > div").click();
//      cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(3) input").click();
//     cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(3) input").type("SHahzad Town,park Road");
//     cy.get("div.collapseBox div:nth-of-type(1) > div:nth-of-type(4) input").click();
//     cy.get("div.collapseBox div:nth-of-type(1) > div:nth-of-type(4) input").type("1554006789");
//     cy.get("div.collapseBox div:nth-of-type(5) input").click();
//     cy.get("div.collapseBox div:nth-of-type(5) input").type("ali12&&ceexample.com");
//     cy.get("div.collapseBox form > div.ant-form-item span").click();
//     cy.contains("success", { matchCase: false, timeout: 8000 }).should("be.visible");
//   });
// });

// describe("TC-09 Customer Management", () => {
//   it("tests TC-09 Customer Management", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Customers").click();
//     cy.url().should("include", "/customer");
//     cy.contains("Client List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Client").click();

//     // Wait for the form to appear - look for ANY input field first
//     cy.get('input[type="text"]', { timeout: 10000 }).should("be.visible");

//       cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(1) input").click();
//     cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(1) input").type("Alice Wonder");
//    // cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(2) input").click();
//     //cy.get("div.ant-select-item-option-active > div").click();
//      cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(3) input").click();
//     cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(3) input").type("SHahzad Town,park Road");
//     cy.get("div.collapseBox div:nth-of-type(1) > div:nth-of-type(4) input").click();
//     cy.get("div.collapseBox div:nth-of-type(1) > div:nth-of-type(4) input").type("1554006789");
//     cy.get("div.collapseBox form > div.ant-form-item span").click();
//     cy.contains("success", { matchCase: false, timeout: 8000 }).should("be.visible");
//   });
// });

// describe("TC-10 Customer Management", () => {
//   it("tests TC-10 Customer Management", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Customers").click();
//     cy.url().should("include", "/customer");
//     cy.contains("Client List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Client").click();

//     // Wait for the form to appear - look for ANY input field first
//     cy.get('input[type="text"]', { timeout: 10000 }).should("be.visible");

//       cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(1) input").click();
//     cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(1) input").type("Alice Wonder wonderful long name test Too Long of about 50 characters 100 characters or more that that okayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
//     //cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(2) input").click();
//     //cy.get("div.ant-select-item-option-active > div").click();
//      cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(3) input").click();
//     cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(3) input").type("SHahzad Town,park Road");
//     cy.get("div.collapseBox div:nth-of-type(1) > div:nth-of-type(4) input").click();
//     cy.get("div.collapseBox div:nth-of-type(1) > div:nth-of-type(4) input").type("%$s1554006789");
//     cy.get("div.collapseBox div:nth-of-type(5) input").click();
//     cy.get("div.collapseBox div:nth-of-type(5) input").type("alice@example.com");
//     cy.get("div.collapseBox form > div.ant-form-item span").click();
//     cy.contains("success", { matchCase: false, timeout: 8000 }).should("be.visible");
//   });
// });
// describe("TC-11 Customer Management", () => {
//   it("tests TC-11 Customer Management", () => {
//     cy.viewport(935, 782);
//     cy.visit("http://localhost:3000/login");

//     cy.get("#normal_login_email").clear().type("admin@admin.com");
//     cy.get("#normal_login_password").clear().type("admin123");
//     cy.get("#normal_login_remember").click();
//     cy.get('button[type="submit"]').click();
//     cy.contains("Dashboard", { timeout: 8000 }).should("be.visible");
//     cy.contains("Customers").click();
//     cy.url().should("include", "/customer");
//     cy.contains("Client List", { timeout: 8000 }).should("be.visible");
//     cy.contains("Add New Client").click();

//     // Wait for the form to appear - look for ANY input field first
//     cy.get('input[type="text"]', { timeout: 10000 }).should("be.visible");

//       cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(1) input").click();
//     cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(1) input").type("Alice Wonder");
//    // cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(2) input").click();
//     //cy.get("div.ant-select-item-option-active > div").click();
//      cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(3) input").click();
//     cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(3) input").type("SHahzad Town,park Road Alice Wonder wonderful long name test Too Long of about 50 characters 100 characters or more that that okayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyAlice Wonder wonderful long name test Too Long of about 50 characters 100 characters or more that that okayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
    
//     cy.get("div.collapseBox div:nth-of-type(1) > div:nth-of-type(4) input").click();
//     cy.get("div.collapseBox div:nth-of-type(1) > div:nth-of-type(4) input").type("%$s1554006789");
//     cy.get("div.collapseBox div:nth-of-type(5) input").click();
//     cy.get("div.collapseBox div:nth-of-type(5) input").type("alice@example.com");
//     cy.get("div.collapseBox form > div.ant-form-item span").click();
//     cy.contains("success", { matchCase: false, timeout: 8000 }).should("be.visible");
//   });

// });
