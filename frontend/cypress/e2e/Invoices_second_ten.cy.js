describe("TC16_invoices", () => {
  it("tests TC16_invoices", () => {
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
    cy.get("#date").clear().type("02/12/2025");
    cy.get("#expiredDate").clear().type("01/01/2025");
    cy.get("#notes").clear().type("Good");
      // cy.get("#items_0_itemName").type("Consulting Service");
    cy.get("#items_0_description").type("Monthly Retainer");
    cy.get("#items_0_quantity").type("1");
    cy.get("#items_0_price").type("1500");
    cy.contains("Select Tax Value").click({ force: true });
    
    cy.get("span").contains("Tax 0%", { matchCase: false }).click();
    cy.contains("button", "Save").click();
  });
});
describe("TC19_invoices", () => {
  it("tests TC19_invoices", () => {
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
    cy.get("#date").clear().type("02/12/2025");
    cy.get("#expiredDate").clear().type("01/01/2025");
    cy.get("#notes").clear().type("Good");
    cy.get("#items_0_itemName").type("Consulting Service");
    cy.get("#items_0_description").type("Monthly Retainer");
    cy.get("#items_0_quantity").type("-5");
    cy.get("#items_0_price").type("1500");
    cy.contains("Select Tax Value").click({ force: true });
    
    cy.get("span").contains("Tax 0%", { matchCase: false }).click();
    cy.contains("button", "Save").click();
  });
});
describe("TC18_invoices", () => {
  it("tests TC18_invoices", () => {
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
    cy.get("#date").clear().type("02/12/2025");
    cy.get("#expiredDate").clear().type("01/01/2025");
    cy.get("#notes").clear().type("Good");
       cy.get("#items_0_itemName").type("Consulting Service");
    cy.get("#items_0_description").type("Monthly Retainer");
    cy.get("#items_0_quantity").type("0");
    cy.get("#items_0_price").type("1500");
    cy.contains("Select Tax Value").click({ force: true });
    
    cy.get("span").contains("Tax 0%", { matchCase: false }).click();
    cy.contains("button", "Save").click();
  });
});
describe("TC17_invoices", () => {
  it("tests TC17_invoices", () => {
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
    cy.get("#date").clear().type("02/12/2025");
    cy.get("#expiredDate").clear().type("01/01/2025");
    cy.get("#notes").clear().type("Good");
     cy.get("#items_0_itemName").type("Consulting Service");
    cy.get("#items_0_description").type("Monthly Retainer");
   // cy.get("#items_0_quantity").type("1");
    cy.get("#items_0_price").type("1500");
    cy.contains("Select Tax Value").click({ force: true });
    
    cy.get("span").contains("Tax 0%", { matchCase: false }).click();
    cy.contains("button", "Save").click();
  });
});


describe("TC15_invoices", () => {
  it("tests TC15_invoices", () => {
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
    cy.get("#date").clear().type("02/12/2025");
    cy.get("#expiredDate").clear().type("01/01/2025");
    cy.get("#notes").clear().type("Good");
    cy.contains("Select Tax Value").click({ force: true });
    
    cy.get("span").contains("Tax 0%", { matchCase: false }).click();
    cy.contains("button", "Save").click();
  });
});

///TC 14 skipped because I enetered about 1000 characters but it became slow but I am unable to know UI limit hit  point
describe("TC13_invoices", () => {
  it("tests TC13_invoices", () => {
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
    cy.get("#date").clear().type("02/12/2025");
    cy.get("#expiredDate").clear().type("01/01/2025");
    cy.get("#notes").type("Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didnt listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then she continued her way. On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word and and the Little Blind Text should turn around and return to its own, safe country. But nothing the copy said could convince her and so it didnt take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their projects again and again. And if she hasnt been rewritten, then they are still using her.Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didnt listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline");
    cy.get("#items_0_itemName").type("Consulting Service");
    cy.get("#items_0_description").type("Monthly Retainer");
    cy.get("#items_0_quantity").type("1");
    cy.get("#items_0_price").type("1500");
    
    cy.contains("Select Tax Value").click({ force: true });
    
    cy.get("span").contains("Tax 0%", { matchCase: false }).click();
    cy.contains("button", "Save").click();
  });
});
describe("TC11_invoices", () => {
  it("tests TC11_invoices", () => {
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
    cy.get("#date").clear().type("02/12/2025");
    cy.get("#expiredDate").clear().type("01/01/2025");
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