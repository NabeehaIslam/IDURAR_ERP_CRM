
//TC 65 Valid numeric value within 0–100000 for Last Invoice, Last Quote, Last Payment 
//Expected : Settings  saved successfully 
//Actual : Settings   saved successfully 
describe('Finance Settings - Valid Numeric Inputs', () => {
  it('TC-65: Enter valid numeric values (0–100000) for all 3 fields', () => {

    // LOGIN
    cy.visit('http://localhost:3000/login');
    cy.get('#normal_login_email').clear().type('admin@admin.com');
    cy.get('#normal_login_password').clear().type('admin123');
    cy.get('button[type="submit"]').click();

    // VERIFY DASHBOARD LOADED
    cy.contains('Dashboard').should('be.visible');

    // GO TO SETTINGS PAGE
    cy.visit('http://localhost:3000/settings');

    // CLICK FINANCE SETTINGS TAB
    cy.contains('Finance Settings').scrollIntoView().should('be.visible').click();

    // MAKE SURE INPUTS EXIST
    cy.get('#last_invoice_number', { timeout: 8000 }).should('exist').scrollIntoView();
    cy.get('#last_quote_number').should('exist');
    cy.get('#last_payment_number').should('exist');

    // SET VALID VALUES
    cy.get('#last_invoice_number').clear().type('100');
    cy.get('#last_quote_number').clear().type('100');
    cy.get('#last_payment_number').clear().type('100');

    // CLICK SAVE BUTTON INSIDE ACTIVE TAB
    cy.contains('.ant-tabs-tabpane-active button', 'Save')
      .should('be.visible')
      .click();

    
  });
});

//TC 66 Leave all 3 fields empty
//Expected : Settings not saved successfully due to missing mandatory fields
//Actual : Settings not saved successfully due to missing mandatory fields
describe('Finance Settings - Valid Numeric Inputs', () => {
  it('TC 66 Leave all 3 fields empty', () => {

    // LOGIN
    cy.visit('http://localhost:3000/login');
    cy.get('#normal_login_email').clear().type('admin@admin.com');
    cy.get('#normal_login_password').clear().type('admin123');
    cy.get('button[type="submit"]').click();

    // VERIFY DASHBOARD LOADED
    cy.contains('Dashboard').should('be.visible');

    // GO TO SETTINGS PAGE
    cy.visit('http://localhost:3000/settings');

    // CLICK FINANCE SETTINGS TAB
    cy.contains('Finance Settings').scrollIntoView().should('be.visible').click();

    // MAKE SURE INPUTS EXIST
    cy.get('#last_invoice_number', { timeout: 8000 }).should('exist').scrollIntoView();
    cy.get('#last_quote_number').should('exist');
    cy.get('#last_payment_number').should('exist');

    // SET VALID VALUES
    cy.get('#last_invoice_number').clear().type(' ');
    cy.get('#last_quote_number').clear().type(' ');
    cy.get('#last_payment_number').clear().type(' ');

    // CLICK SAVE BUTTON INSIDE ACTIVE TAB
    cy.contains('.ant-tabs-tabpane-active button', 'Save')
      .should('be.visible')
      .click();

    
  });
});

//TC 67 Enter all 3 fields values > upper limit 
//Expected : Settings not saved successfully due to invalid input
//Actual : Settings  saved successfully despite of invalid input
describe('Finance Settings - Valid Numeric Inputs', () => {
  it('TC 67 Enter all 3 fields values > upper limit', () => {

    // LOGIN
    cy.visit('http://localhost:3000/login');
    cy.get('#normal_login_email').clear().type('admin@admin.com');
    cy.get('#normal_login_password').clear().type('admin123');
    cy.get('button[type="submit"]').click();

    // VERIFY DASHBOARD LOADED
    cy.contains('Dashboard').should('be.visible');

    // GO TO SETTINGS PAGE
    cy.visit('http://localhost:3000/settings');

    // CLICK FINANCE SETTINGS TAB
    cy.contains('Finance Settings').scrollIntoView().should('be.visible').click();

    // MAKE SURE INPUTS EXIST
    cy.get('#last_invoice_number', { timeout: 8000 }).should('exist').scrollIntoView();
    cy.get('#last_quote_number').should('exist');
    cy.get('#last_payment_number').should('exist');

    // SET VALID VALUES
    cy.get('#last_invoice_number').clear().type('10000000');
    cy.get('#last_quote_number').clear().type('10000000');
    cy.get('#last_payment_number').clear().type('10000000');

    // CLICK SAVE BUTTON INSIDE ACTIVE TAB
    cy.contains('.ant-tabs-tabpane-active button', 'Save')
      .should('be.visible')
      .click();

    
  });
});


//TC 68 Enter all 3 fields values = non numeric values
//Expected : Settings not saved successfully due to invalid input
//Actual : Settings not  saved successfully 
describe('Finance Settings - Valid Numeric Inputs', () => {
  it('TC 68 Enter all 3 fields values = non numeric values', () => {

    // LOGIN
    cy.visit('http://localhost:3000/login');
    cy.get('#normal_login_email').clear().type('admin@admin.com');
    cy.get('#normal_login_password').clear().type('admin123');
    cy.get('button[type="submit"]').click();

    // VERIFY DASHBOARD LOADED
    cy.contains('Dashboard').should('be.visible');

    // GO TO SETTINGS PAGE
    cy.visit('http://localhost:3000/settings');

    // CLICK FINANCE SETTINGS TAB
    cy.contains('Finance Settings').scrollIntoView().should('be.visible').click();

    // MAKE SURE INPUTS EXIST
    cy.get('#last_invoice_number', { timeout: 8000 }).should('exist').scrollIntoView();
    cy.get('#last_quote_number').should('exist');
    cy.get('#last_payment_number').should('exist');

    // SET VALID VALUES
    cy.get('#last_invoice_number').clear().type('##');
    cy.get('#last_quote_number').clear().type('ABC');
    cy.get('#last_payment_number').clear().type('yr5t');

    // CLICK SAVE BUTTON INSIDE ACTIVE TAB
    cy.contains('.ant-tabs-tabpane-active button', 'Save')
      .should('be.visible')
      .click();

    
  });
});

//TC 69 Enter all 3 fields values = lower bound value
//Expected : Settings  saved successfully 
//Actual : Settings saved successfully 
describe('Finance Settings - Valid Numeric Inputs', () => {
  it('TC 69 Enter all 3 fields values = lower bound value', () => {

    // LOGIN
    cy.visit('http://localhost:3000/login');
    cy.get('#normal_login_email').clear().type('admin@admin.com');
    cy.get('#normal_login_password').clear().type('admin123');
    cy.get('button[type="submit"]').click();

    // VERIFY DASHBOARD LOADED
    cy.contains('Dashboard').should('be.visible');

    // GO TO SETTINGS PAGE
    cy.visit('http://localhost:3000/settings');

    // CLICK FINANCE SETTINGS TAB
    cy.contains('Finance Settings').scrollIntoView().should('be.visible').click();

    // MAKE SURE INPUTS EXIST
    cy.get('#last_invoice_number', { timeout: 8000 }).should('exist').scrollIntoView();
    cy.get('#last_quote_number').should('exist');
    cy.get('#last_payment_number').should('exist');

    // SET VALID VALUES
    cy.get('#last_invoice_number').clear().type('0');
    cy.get('#last_quote_number').clear().type('0');
    cy.get('#last_payment_number').clear().type('0');

    // CLICK SAVE BUTTON INSIDE ACTIVE TAB
    cy.contains('.ant-tabs-tabpane-active button', 'Save')
      .should('be.visible')
      .click();

    
  });
});

//TC 70 Enter all 3 fields values < lower bound
//Expected : Settings not saved successfully due to invalid input
//Actual : Settings saved successfully by auto sacling value to 0 and making it valid 
describe('Finance Settings - Valid Numeric Inputs', () => {
  it('TC 70 Enter all 3 fields values < lower bound', () => {

    // LOGIN
    cy.visit('http://localhost:3000/login');
    cy.get('#normal_login_email').clear().type('admin@admin.com');
    cy.get('#normal_login_password').clear().type('admin123');
    cy.get('button[type="submit"]').click();

    // VERIFY DASHBOARD LOADED
    cy.contains('Dashboard').should('be.visible');

    // GO TO SETTINGS PAGE
    cy.visit('http://localhost:3000/settings');

    // CLICK FINANCE SETTINGS TAB
    cy.contains('Finance Settings').scrollIntoView().should('be.visible').click();

    // MAKE SURE INPUTS EXIST
    cy.get('#last_invoice_number', { timeout: 8000 }).should('exist').scrollIntoView();
    cy.get('#last_quote_number').should('exist');
    cy.get('#last_payment_number').should('exist');

    // SET VALID VALUES
    cy.get('#last_invoice_number').clear().type('-9');
    cy.get('#last_quote_number').clear().type('-8');
    cy.get('#last_payment_number').clear().type('-3');

    // CLICK SAVE BUTTON INSIDE ACTIVE TAB
    cy.contains('.ant-tabs-tabpane-active button', 'Save')
      .should('be.visible')
      .click();

    
  });
});

//TC 71 Enter all 3 fields values = upper bound value
//Expected : Settings  saved successfully 
//Actual : Settings   saved successfully 
describe('Finance Settings - Valid Numeric Inputs', () => {
  it('TC 71 Enter all 3 fields values = upper bound value', () => {

    // LOGIN
    cy.visit('http://localhost:3000/login');
    cy.get('#normal_login_email').clear().type('admin@admin.com');
    cy.get('#normal_login_password').clear().type('admin123');
    cy.get('button[type="submit"]').click();

    // VERIFY DASHBOARD LOADED
    cy.contains('Dashboard').should('be.visible');

    // GO TO SETTINGS PAGE
    cy.visit('http://localhost:3000/settings');

    // CLICK FINANCE SETTINGS TAB
    cy.contains('Finance Settings').scrollIntoView().should('be.visible').click();

    // MAKE SURE INPUTS EXIST
    cy.get('#last_invoice_number', { timeout: 8000 }).should('exist').scrollIntoView();
    cy.get('#last_quote_number').should('exist');
    cy.get('#last_payment_number').should('exist');

    // SET VALID VALUES
    cy.get('#last_invoice_number').clear().type('100000');
    cy.get('#last_quote_number').clear().type('100000');
    cy.get('#last_payment_number').clear().type('100000');

    // CLICK SAVE BUTTON INSIDE ACTIVE TAB
    cy.contains('.ant-tabs-tabpane-active button', 'Save')
      .should('be.visible')
      .click();

    
  });
});
