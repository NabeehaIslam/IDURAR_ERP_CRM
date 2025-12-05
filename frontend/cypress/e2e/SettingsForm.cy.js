//Sub form 1 : General settings form
//TC01 , TC03 Valid date and Email selection 
//Expected : Settings saved successfully
//Actual : Settings saved successfully 
describe('General Settings - Date Format', () => {

  before(() => {
    cy.viewport(1280, 800);
    cy.visit('http://localhost:3000/login');

    cy.get('#normal_login_email').clear().type('admin@admin.com');
    cy.get('#normal_login_password').clear().type('admin123');
    cy.get('button[type="submit"]').click();

    // Dashboard appears after login
    cy.contains('Dashboard', { timeout: 10000 }).should('be.visible');

    // Navigate to Settings → General Settings
    cy.contains('Settings').click();
    cy.contains('General Settings').click();

    // Wait for form to load
    cy.contains('Date Format', { timeout: 8000 }).should('be.visible');
  });

  it('TC-01: Select valid date format + enter email + save', () => {

    // STEP 1: Open Date Format dropdown
    cy.get('#idurar_app_date_format').click({ force: true });

    // STEP 2: Choose DD/MM/YYYY
    cy.contains('.ant-select-item-option-content', 'DD/MM/YYYY').click({ force: true });

    // ASSERT selected value
    cy.get('.ant-select-selection-item').should('contain', 'DD/MM/YYYY');

    // STEP 3: Enter email
    cy.get('#idurar_app_company_email')
      .clear()
      .type('company@example.com');

    // STEP 4: Save
    cy.contains('button', 'Save').click();

  });

});

//TC02 , TC04 No selection for date field and Email with missing @
//Expected : Settings not saved successfully due to invalid email format
//Actual : Settings not saved  successfully due to invalid email format
describe('General Settings - Invalid Email Format', () => {

  before(() => {
    cy.viewport(1280, 800);
    cy.visit('http://localhost:3000/login');

    cy.get('#normal_login_email').clear().type('admin@admin.com');
    cy.get('#normal_login_password').clear().type('admin123');
    cy.get('button[type="submit"]').click();

    // Dashboard appears after login
    cy.contains('Dashboard', { timeout: 10000 }).should('be.visible');

    // Navigate to Settings → General Settings
    cy.contains('Settings').click();
    cy.contains('General Settings').click();

    // Wait for form to load
    cy.contains('Date Format', { timeout: 8000 }).should('be.visible');
  });

  it('TC-01: enter Invalid email + save', () => {

  
    // STEP 3: Enter email
    cy.get('#idurar_app_company_email')
      .clear()
      .type('companyexample.com');

    // STEP 4: Save
    cy.contains('button', 'Save').click();

  });

});

// TC05 Email with Invalid characters
// Expected : Settings not saved successfully due to invalid email format
// Actual : Settings not saved  successfully due to invalid email format
describe('General Settings - Invalid Email Format', () => {

  before(() => {
    cy.viewport(1280, 800);
    cy.visit('http://localhost:3000/login');

    cy.get('#normal_login_email').clear().type('admin@admin.com');
    cy.get('#normal_login_password').clear().type('admin123');
    cy.get('button[type="submit"]').click();

    // Dashboard appears after login
    cy.contains('Dashboard', { timeout: 10000 }).should('be.visible');

    // Navigate to Settings → General Settings
    cy.contains('Settings').click();
    cy.contains('General Settings').click();

    // Wait for form to load
    cy.contains('Date Format', { timeout: 8000 }).should('be.visible');
  });

  it('TC-05: enter Invalid email + save', () => {

  
    // STEP 3: Enter email
    cy.get('#idurar_app_company_email')
      .clear()
      .type('company## :: example.com');

    // STEP 4: Save
    cy.contains('button', 'Save').click();

  });

});

// TC06 Email field left empty
// Expected : Settings not saved successfully due to missing email
// Actual : Settings not saved  successfully due to missing email
describe('General Settings - Missing Email', () => {

  before(() => {
    cy.viewport(1280, 800);
    cy.visit('http://localhost:3000/login');

    cy.get('#normal_login_email').clear().type('admin@admin.com');
    cy.get('#normal_login_password').clear().type('admin123');
    cy.get('button[type="submit"]').click();

    // Dashboard appears after login
    cy.contains('Dashboard', { timeout: 10000 }).should('be.visible');

    // Navigate to Settings → General Settings
    cy.contains('Settings').click();
    cy.contains('General Settings').click();

    // Wait for form to load
    cy.contains('Date Format', { timeout: 8000 }).should('be.visible');
  });

  it('TC-06: Missing Email in form', () => {

  
    // STEP 3: Enter email
    cy.get('#idurar_app_company_email')
      .clear()
      .type(' ');

    // STEP 4: Save
    cy.contains('button', 'Save').click();

  });

});

// TC06.1 Email field with 5 characters
// Expected : Settings not saved successfully due to incorrect email
// Actual : Settings not saved  successfully due to incorrect email
describe('General Settings - Incorrect Email', () => {

  before(() => {
    cy.viewport(1280, 800);
    cy.visit('http://localhost:3000/login');

    cy.get('#normal_login_email').clear().type('admin@admin.com');
    cy.get('#normal_login_password').clear().type('admin123');
    cy.get('button[type="submit"]').click();

    // Dashboard appears after login
    cy.contains('Dashboard', { timeout: 10000 }).should('be.visible');

    // Navigate to Settings → General Settings
    cy.contains('Settings').click();
    cy.contains('General Settings').click();

    // Wait for form to load
    cy.contains('Date Format', { timeout: 8000 }).should('be.visible');
  });

  it('TC-06.1: Incorrect Email in form', () => {

  
    // STEP 3: Enter email
    cy.get('#idurar_app_company_email')
      .clear()
      .type('a@com');

    // STEP 4: Save
    cy.contains('button', 'Save').click();

  });

});

// TC06.2 Email field with 6 characters
// Expected : Settings  saved successfully 
// Actual : Settings  saved  successfully 
describe('General Settings - correct Email', () => {

  before(() => {
    cy.viewport(1280, 800);
    cy.visit('http://localhost:3000/login');

    cy.get('#normal_login_email').clear().type('admin@admin.com');
    cy.get('#normal_login_password').clear().type('admin123');
    cy.get('button[type="submit"]').click();

    // Dashboard appears after login
    cy.contains('Dashboard', { timeout: 10000 }).should('be.visible');

    // Navigate to Settings → General Settings
    cy.contains('Settings').click();
    cy.contains('General Settings').click();

    // Wait for form to load
    cy.contains('Date Format', { timeout: 8000 }).should('be.visible');
  });

  it('TC-06.2: correct Email in form', () => {

  
    // STEP 3: Enter email
    cy.get('#idurar_app_company_email')
      .clear()
      .type('a@b.co');

    // STEP 4: Save
    cy.contains('button', 'Save').click();

  });

});

// TC06.3 Email field with 256 characters
// Expected : Settings  saved successfully 
// Actual : Settings  saved  successfully 
describe('General Settings - correct Email', () => {

  before(() => {
    cy.viewport(1280, 800);
    cy.visit('http://localhost:3000/login');

    cy.get('#normal_login_email').clear().type('admin@admin.com');
    cy.get('#normal_login_password').clear().type('admin123');
    cy.get('button[type="submit"]').click();

    // Dashboard appears after login
    cy.contains('Dashboard', { timeout: 10000 }).should('be.visible');

    // Navigate to Settings → General Settings
    cy.contains('Settings').click();
    cy.contains('General Settings').click();

    // Wait for form to load
    cy.contains('Date Format', { timeout: 8000 }).should('be.visible');
  });

  it('TC-06.2: correct Email in form', () => {

  
    // STEP 3: Enter email
    cy.get('#idurar_app_company_email')
      .clear()
      .type('@xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.com');

    // STEP 4: Save
    cy.contains('button', 'Save').click();

  });

});


// TC06.4 Email field with 256+ characters
// Expected : Settings  not saved successfully 
// Actual : Settings  saved  successfully 
describe('General Settings - Incorrect Email', () => {

  before(() => {
    cy.viewport(1280, 800);
    cy.visit('http://localhost:3000/login');

    cy.get('#normal_login_email').clear().type('admin@admin.com');
    cy.get('#normal_login_password').clear().type('admin123');
    cy.get('button[type="submit"]').click();

    // Dashboard appears after login
    cy.contains('Dashboard', { timeout: 10000 }).should('be.visible');

    // Navigate to Settings → General Settings
    cy.contains('Settings').click();
    cy.contains('General Settings').click();

    // Wait for form to load
    cy.contains('Date Format', { timeout: 8000 }).should('be.visible');
  });

  it('TC-06.2: Incorrect Email in form', () => {

  
    // STEP 3: Enter email
    cy.get('#idurar_app_company_email')
      .clear()
      .type('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@x.com');

    // STEP 4: Save
    cy.contains('button', 'Save').click();

  });

});


