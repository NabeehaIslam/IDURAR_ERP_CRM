//Sub form 2 : Company settings form

//TC07 Correct Comapny name in range
//TC 7.1 , TC 9 , TC12 Name of 1 character(ALPHA NUMERIC) , Name of Adress
//Expected : Settings  saved successfully
//Actual : Settings saved successfully
describe('Company Settings - Company Name', () => {

before(() => {
  cy.viewport(1280, 800);
  cy.visit('http://localhost:3000/login');

  cy.get('#normal_login_email').clear().type('admin@admin.com');
  cy.get('#normal_login_password').clear().type('admin123');
  cy.get('button[type="submit"]').click();

  // CHECK 1: URL after login
  cy.url({ timeout: 15000 }).should('eq', 'http://localhost:3000/');

  
  // Navigate to Settings
  cy.contains('Settings', { timeout: 10000 }).click();

  // Click the Company Settings tab
  cy.contains('.ant-tabs-tab', 'Company Settings').click();

  cy.get('#company_name').should('be.visible');
});



  it('TC-7.1: Enter valid Company Name of 1 Character and Save', () => {

    cy.get('#company_name')
      .clear()
      .type('6');
    
    cy.get('#company_address')
      .clear()
      .type('6 lane , Islamabad');
    
    cy.contains('.ant-tabs-tabpane-active button', 'Save').click();
  });

});
//TC 7.3 Name of 256 Characters
//Expected : Settings saved successfully
//Actual : Settings saved successfully
describe('Company Settings - Company Name', () => {

before(() => {
  cy.viewport(1280, 800);
  cy.visit('http://localhost:3000/login');

  cy.get('#normal_login_email').clear().type('admin@admin.com');
  cy.get('#normal_login_password').clear().type('admin123');
  cy.get('button[type="submit"]').click();

  // CHECK 1: URL after login
  cy.url({ timeout: 15000 }).should('eq', 'http://localhost:3000/');

  
  // Navigate to Settings
  cy.contains('Settings', { timeout: 10000 }).click();

  // Click the Company Settings tab
  cy.contains('.ant-tabs-tab', 'Company Settings').click();

  cy.get('#company_name').should('be.visible');
});

  it('TC-7.3: Enter company name = 256 characters', () => {


    cy.get('#company_name')
      .clear()
      .type('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@x.com');

    // STEP 2: Click Save inside this tab
    cy.contains('.ant-tabs-tabpane-active button', 'Save').click();


  });

});

//TC 8  , TC 13 Name of Company and Adress  with 256+ characters
//Expected : Settings not saved successfully
//Actual : Settings saved successfully
describe('Company Settings - Company Name', () => {

before(() => {
  cy.viewport(1280, 800);
  cy.visit('http://localhost:3000/login');

  cy.get('#normal_login_email').clear().type('admin@admin.com');
  cy.get('#normal_login_password').clear().type('admin123');
  cy.get('button[type="submit"]').click();

  // CHECK 1: URL after login
  cy.url({ timeout: 15000 }).should('eq', 'http://localhost:3000/');

  
  // Navigate to Settings
  cy.contains('Settings', { timeout: 10000 }).click();

  // Click the Company Settings tab
  cy.contains('.ant-tabs-tab', 'Company Settings').click();

  cy.get('#company_name').should('be.visible');
});

  it('TC-7.4: Company name > 256 characters', () => {


    cy.get('#company_name')
      .clear()
      .type('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@x.com');

        cy.get('#company_address')
      .clear()
      .type('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaassssssssssaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@x.com');
    // STEP 2: Click Save inside this tab
    cy.contains('.ant-tabs-tabpane-active button', 'Save').click();


  });

});

//TC 10 , TC15 , TC20 , TC 25  Company Name , State , Country and address left Empty
//Expected : Settings not saved successfully
//Actual : Settings saved successfully
describe('Company Settings - Company Name', () => {

before(() => {
  cy.viewport(1280, 800);
  cy.visit('http://localhost:3000/login');

  cy.get('#normal_login_email').clear().type('admin@admin.com');
  cy.get('#normal_login_password').clear().type('admin123');
  cy.get('button[type="submit"]').click();

  // CHECK 1: URL after login
  cy.url({ timeout: 15000 }).should('eq', 'http://localhost:3000/');

  
  // Navigate to Settings
  cy.contains('Settings', { timeout: 10000 }).click();

  // Click the Company Settings tab
  cy.contains('.ant-tabs-tab', 'Company Settings').click();

  cy.get('#company_name').should('be.visible');
});

  it('TC-7.2: Company Name left empty', () => {

    cy.get('#company_name')
      .clear()
      .type(' ');
    cy.get('#company_address')
      .clear()
      .type(' ');
    cy.get('#company_state')
      .clear()
      .type(' ')
   cy.get('#company_country')
      .clear()
      .type(' ')
    // STEP 2: Click Save inside this tab
    cy.contains('.ant-tabs-tabpane-active button', 'Save').click();


  });

});

//TC11 , TC14 , TC16 Special characters + symbols in Company name and Adress 
//Expected : Settings  saved successfully but company adress should not allow you special characters like @ etc
//Actual : Settings saved successfully and company adress allow every type of special character
describe('Company Settings - Company Name', () => {

before(() => {
  cy.viewport(1280, 800);
  cy.visit('http://localhost:3000/login');

  cy.get('#normal_login_email').clear().type('admin@admin.com');
  cy.get('#normal_login_password').clear().type('admin123');
  cy.get('button[type="submit"]').click();

  // CHECK 1: URL after login
  cy.url({ timeout: 15000 }).should('eq', 'http://localhost:3000/');

  
  // Navigate to Settings
  cy.contains('Settings', { timeout: 10000 }).click();

  // Click the Company Settings tab
  cy.contains('.ant-tabs-tab', 'Company Settings').click();

  cy.get('#company_name').should('be.visible');
});



  it('TC-7.1: Enter valid Company Name of 1 Character and Save', () => {

    cy.get('#company_name')
      .clear()
      .type('@#!@88');

    cy.get('#company_address')
      .clear()
      .type('@ # ii x.com');
    cy.contains('.ant-tabs-tabpane-active button', 'Save').click();
  });

});


//TC 17 , TC 22 Valid state Name and Country Name 
//Expected : Settings saved successfully
//Actual : Settings saved successfully
describe('Company Settings - Company Name', () => {

before(() => {
  cy.viewport(1280, 800);
  cy.visit('http://localhost:3000/login');

  cy.get('#normal_login_email').clear().type('admin@admin.com');
  cy.get('#normal_login_password').clear().type('admin123');
  cy.get('button[type="submit"]').click();

  // CHECK 1: URL after login
  cy.url({ timeout: 15000 }).should('eq', 'http://localhost:3000/');

  
  // Navigate to Settings
  cy.contains('Settings', { timeout: 10000 }).click();

  // Click the Company Settings tab
  cy.contains('.ant-tabs-tab', 'Company Settings').click();

  cy.get('#company_name').should('be.visible');
});

  it('TC 17 Valid state Name and country name', () => {


    cy.get('#company_state')
      .clear()
      .type('UK');
    
        cy.get('#company_country')
      .clear()
      .type('Pakistan');
    // STEP 2: Click Save inside this tab
    cy.contains('.ant-tabs-tabpane-active button', 'Save').click();


  });

});


//TC 18 , TC 23 State name and country Name  > 256 characters
//Expected : Settings not saved successfully
//Actual : Settings saved successfully
describe('Company Settings - Company Name', () => {

before(() => {
  cy.viewport(1280, 800);
  cy.visit('http://localhost:3000/login');

  cy.get('#normal_login_email').clear().type('admin@admin.com');
  cy.get('#normal_login_password').clear().type('admin123');
  cy.get('button[type="submit"]').click();

  // CHECK 1: URL after login
  cy.url({ timeout: 15000 }).should('eq', 'http://localhost:3000/');

  
  // Navigate to Settings
  cy.contains('Settings', { timeout: 10000 }).click();

  // Click the Company Settings tab
  cy.contains('.ant-tabs-tab', 'Company Settings').click();

  cy.get('#company_name').should('be.visible');
});

  it('TC 18 , TC 23 State name and country Name  > 256 characters', () => {


    cy.get('#company_state')
      .clear()
      .type('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')

     cy.get('#company_country')
      .clear()
      .type('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')

    // STEP 2: Click Save inside this tab
    cy.contains('.ant-tabs-tabpane-active button', 'Save').click();


  });

});

//TC 19 , TC 21 , TC 24 , TC 26 State and Country name with special characters or Non existance state 
//Expected : Settings not saved successfully
//Actual : Settings saved successfully
describe('Company Settings - Company Name', () => {

before(() => {
  cy.viewport(1280, 800);
  cy.visit('http://localhost:3000/login');

  cy.get('#normal_login_email').clear().type('admin@admin.com');
  cy.get('#normal_login_password').clear().type('admin123');
  cy.get('button[type="submit"]').click();

  // CHECK 1: URL after login
  cy.url({ timeout: 15000 }).should('eq', 'http://localhost:3000/');

  
  // Navigate to Settings
  cy.contains('Settings', { timeout: 10000 }).click();

  // Click the Company Settings tab
  cy.contains('.ant-tabs-tab', 'Company Settings').click();

  cy.get('#company_name').should('be.visible');
});

  it('TC 19 : State name with special characters ', () => {


    cy.get('#company_state')
      .clear()
      .type('U%^ktyzgcg')

    cy.get('#company_country')
      .clear()
      .type('U%^ktyzgcg')
    // STEP 2: Click Save inside this tab
    cy.contains('.ant-tabs-tabpane-active button', 'Save').click();


  });

});


//TC 27 , TC 33: Valid Phone number and Valid Company wesite Link
//Expected : Settings  saved successfully
//Actual : Settings saved successfully
describe('Company Settings - Company Name', () => {

before(() => {
  cy.viewport(1280, 800);
  cy.visit('http://localhost:3000/login');

  cy.get('#normal_login_email').clear().type('admin@admin.com');
  cy.get('#normal_login_password').clear().type('admin123');
  cy.get('button[type="submit"]').click();

  // CHECK 1: URL after login
  cy.url({ timeout: 15000 }).should('eq', 'http://localhost:3000/');

  
  // Navigate to Settings
  cy.contains('Settings', { timeout: 10000 }).click();

  // Click the Company Settings tab
  cy.contains('.ant-tabs-tab', 'Company Settings').click();

  cy.get('#company_name').should('be.visible');
});

  it('TC 27 , TC 33: Valid Phone number and Valid Company wesite Link', () => {


    cy.get('#company_phone')
      .clear()
      .type('+1 415 555 0123')

       cy.get('#company_website')
      .clear()
      .type('https://example.com')

    
    // STEP 2: Click Save inside this tab
    cy.contains('.ant-tabs-tabpane-active button', 'Save').click();


  });

});

//TC 28 , TC 34 : Valid  Local number and Valid domain without protocol
//Expected : Settings  saved successfully
//Actual : Settings saved successfully
describe('Company Settings - Company Name', () => {

before(() => {
  cy.viewport(1280, 800);
  cy.visit('http://localhost:3000/login');

  cy.get('#normal_login_email').clear().type('admin@admin.com');
  cy.get('#normal_login_password').clear().type('admin123');
  cy.get('button[type="submit"]').click();

  // CHECK 1: URL after login
  cy.url({ timeout: 15000 }).should('eq', 'http://localhost:3000/');

  
  // Navigate to Settings
  cy.contains('Settings', { timeout: 10000 }).click();

  // Click the Company Settings tab
  cy.contains('.ant-tabs-tab', 'Company Settings').click();

  cy.get('#company_name').should('be.visible');
});

  it('TC 28 , TC 34 : Valid  Local number and Valid domain without protocol ', () => {


    cy.get('#company_phone')
      .clear()
      .type('021-3456789')

    cy.get('#company_website')
      .clear()
      .type('www.example.com')
    // STEP 2: Click Save inside this tab
    cy.contains('.ant-tabs-tabpane-active button', 'Save').click();


  });

});

//TC 29 , TC 35 : Valid  Number with formatting Charaters and Domain missing Company URL
//Expected : Settings not  saved successfully due to incorrect Website link
//Actual : Settings saved successfully and url issue ignored
describe('Company Settings - Company Name', () => {

before(() => {
  cy.viewport(1280, 800);
  cy.visit('http://localhost:3000/login');

  cy.get('#normal_login_email').clear().type('admin@admin.com');
  cy.get('#normal_login_password').clear().type('admin123');
  cy.get('button[type="submit"]').click();

  // CHECK 1: URL after login
  cy.url({ timeout: 15000 }).should('eq', 'http://localhost:3000/');

  
  // Navigate to Settings
  cy.contains('Settings', { timeout: 10000 }).click();

  // Click the Company Settings tab
  cy.contains('.ant-tabs-tab', 'Company Settings').click();

  cy.get('#company_name').should('be.visible');
});

  it('TC 29 , TC 35 : Valid  Number with formatting Charaters and Domain missing Company URL ', () => {


    cy.get('#company_phone')
      .clear()
      .type('(415) 555-0123')
    cy.get('#company_website')
      .clear()
      .type('www.example')
    
    // STEP 2: Click Save inside this tab
    cy.contains('.ant-tabs-tabpane-active button', 'Save').click();


  });

});


//TC 30  : Invalid Number too short too long
//Expected : Settings  not saved successfully
//Actual : Settings saved successfully
describe('Company Settings - Company Name', () => {

before(() => {
  cy.viewport(1280, 800);
  cy.visit('http://localhost:3000/login');

  cy.get('#normal_login_email').clear().type('admin@admin.com');
  cy.get('#normal_login_password').clear().type('admin123');
  cy.get('button[type="submit"]').click();

  // CHECK 1: URL after login
  cy.url({ timeout: 15000 }).should('eq', 'http://localhost:3000/');

  
  // Navigate to Settings
  cy.contains('Settings', { timeout: 10000 }).click();

  // Click the Company Settings tab
  cy.contains('.ant-tabs-tab', 'Company Settings').click();

  cy.get('#company_name').should('be.visible');
});

  it('TC 30 : Invalid Number too short too long ', () => {


    cy.get('#company_phone')
      .clear()
      .type('1234')

    
    // STEP 2: Click Save inside this tab
    cy.contains('.ant-tabs-tabpane-active button', 'Save').click();


  });

});

//TC 31 , TC 36: Alphabetic or textual phone number input and Invalid Characters in url of company
//Expected : Settings  not saved successfully due to Invalid phone number and URL
//Actual : Settings saved successfully ignoring invalid inputs 
describe('Company Settings - Company Name', () => {

before(() => {
  cy.viewport(1280, 800);
  cy.visit('http://localhost:3000/login');

  cy.get('#normal_login_email').clear().type('admin@admin.com');
  cy.get('#normal_login_password').clear().type('admin123');
  cy.get('button[type="submit"]').click();

  // CHECK 1: URL after login
  cy.url({ timeout: 15000 }).should('eq', 'http://localhost:3000/');

  
  // Navigate to Settings
  cy.contains('Settings', { timeout: 10000 }).click();

  // Click the Company Settings tab
  cy.contains('.ant-tabs-tab', 'Company Settings').click();

  cy.get('#company_name').should('be.visible');
});

  it('TC 31 , TC 36: Alphabetic or textual phone number input and Invalid Characters in url of company', () => {


    cy.get('#company_phone')
      .clear()
      .type('1234-ABC-44')

      cy.get('#company_website')
      .clear()
      .type('a bc %% 44')

    // STEP 2: Click Save inside this tab
    cy.contains('.ant-tabs-tabpane-active button', 'Save').click();


  });

});


//TC 32 , TC 37 : Leave Phone number and Company URL empty
//Expected : Settings  not saved successfully due to empty mandatory fields
//Actual : Settings saved successfully despite of missing fields 
describe('Company Settings - Company Name', () => {

before(() => {
  cy.viewport(1280, 800);
  cy.visit('http://localhost:3000/login');

  cy.get('#normal_login_email').clear().type('admin@admin.com');
  cy.get('#normal_login_password').clear().type('admin123');
  cy.get('button[type="submit"]').click();

  // CHECK 1: URL after login
  cy.url({ timeout: 15000 }).should('eq', 'http://localhost:3000/');

  
  // Navigate to Settings
  cy.contains('Settings', { timeout: 10000 }).click();

  // Click the Company Settings tab
  cy.contains('.ant-tabs-tab', 'Company Settings').click();

  cy.get('#company_name').should('be.visible');
});

  it('TC 32 , TC 37 : Leave Phone number and Company URL empty ', () => {


    cy.get('#company_phone')
      .clear()
      .type(' ')
    cy.get('#company_website')
      .clear()
      .type(' ')
    
    // STEP 2: Click Save inside this tab
    cy.contains('.ant-tabs-tabpane-active button', 'Save').click();


  });

});

//TC 38 valid numeric tax/VAT/registration number.
//Expected : Settings   saved successfully 
//Actual : Settings saved successfully 
describe('Company Settings - Company Name', () => {

before(() => {
  cy.viewport(1280, 800);
  cy.visit('http://localhost:3000/login');

  cy.get('#normal_login_email').clear().type('admin@admin.com');
  cy.get('#normal_login_password').clear().type('admin123');
  cy.get('button[type="submit"]').click();

  // CHECK 1: URL after login
  cy.url({ timeout: 15000 }).should('eq', 'http://localhost:3000/');

  
  // Navigate to Settings
  cy.contains('Settings', { timeout: 10000 }).click();

  // Click the Company Settings tab
  cy.contains('.ant-tabs-tab', 'Company Settings').click();

  cy.get('#company_name').should('be.visible');
});

  it('TC 38 valid numeric tax/VAT/registration number. ', () => {


    cy.get('#company_tax_number')
      .clear()
      .type('91231255234 ')
    cy.get('#company_vat_number')
      .clear()
      .type('91231255234 ')
    cy.get('#company_reg_number')
      .clear()
      .type('91231255234 ')
    // STEP 2: Click Save inside this tab
    cy.contains('.ant-tabs-tabpane-active button', 'Save').click();


  });

});

//TC 39 tax/VAT/registration number shorter than 6 Digits
//Expected : Settings not saved successfully because of Invalid Inputs
//Actual : Settings saved successfully 
describe('Company Settings - Company Name', () => {

before(() => {
  cy.viewport(1280, 800);
  cy.visit('http://localhost:3000/login');

  cy.get('#normal_login_email').clear().type('admin@admin.com');
  cy.get('#normal_login_password').clear().type('admin123');
  cy.get('button[type="submit"]').click();

  // CHECK 1: URL after login
  cy.url({ timeout: 15000 }).should('eq', 'http://localhost:3000/');

  
  // Navigate to Settings
  cy.contains('Settings', { timeout: 10000 }).click();

  // Click the Company Settings tab
  cy.contains('.ant-tabs-tab', 'Company Settings').click();

  cy.get('#company_name').should('be.visible');
});

  it('TC 39 tax/VAT/registration number shorter than 6 Digits ', () => {


    cy.get('#company_tax_number')
      .clear()
      .type('912 ')
    cy.get('#company_vat_number')
      .clear()
      .type('9 ')
    cy.get('#company_reg_number')
      .clear()
      .type('9 ')
    // STEP 2: Click Save inside this tab
    cy.contains('.ant-tabs-tabpane-active button', 'Save').click();


  });

});

//TC 40 tax/VAT/registration number having non numeric characters
//Expected : Settings not saved successfully due to non numeric input
//Actual : Settings saved successfully 
describe('Company Settings - Company Name', () => {

before(() => {
  cy.viewport(1280, 800);
  cy.visit('http://localhost:3000/login');

  cy.get('#normal_login_email').clear().type('admin@admin.com');
  cy.get('#normal_login_password').clear().type('admin123');
  cy.get('button[type="submit"]').click();

  // CHECK 1: URL after login
  cy.url({ timeout: 15000 }).should('eq', 'http://localhost:3000/');

  
  // Navigate to Settings
  cy.contains('Settings', { timeout: 10000 }).click();

  // Click the Company Settings tab
  cy.contains('.ant-tabs-tab', 'Company Settings').click();

  cy.get('#company_name').should('be.visible');
});

  it('TC 40 tax/VAT/registration number having non numeric characters ', () => {


    cy.get('#company_tax_number')
      .clear()
      .type('912AS')
    cy.get('#company_vat_number')
      .clear()
      .type('PP')
    cy.get('#company_reg_number')
      .clear()
      .type('9KK')
    // STEP 2: Click Save inside this tab
    cy.contains('.ant-tabs-tabpane-active button', 'Save').click();


  });

});

//TC 41 tax/VAT/registration number Left empty
//Expected : Settings not saved successfully due to missing mandatory fields
//Actual : Settings saved successfully  and missing inputs ignored
describe('Company Settings - Company Name', () => {

before(() => {
  cy.viewport(1280, 800);
  cy.visit('http://localhost:3000/login');

  cy.get('#normal_login_email').clear().type('admin@admin.com');
  cy.get('#normal_login_password').clear().type('admin123');
  cy.get('button[type="submit"]').click();

  // CHECK 1: URL after login
  cy.url({ timeout: 15000 }).should('eq', 'http://localhost:3000/');

  
  // Navigate to Settings
  cy.contains('Settings', { timeout: 10000 }).click();

  // Click the Company Settings tab
  cy.contains('.ant-tabs-tab', 'Company Settings').click();

  cy.get('#company_name').should('be.visible');
});

  it('TC 41 tax/VAT/registration number Left empty', () => {


    cy.get('#company_tax_number')
      .clear()
      .type(' ')
    cy.get('#company_vat_number')
      .clear()
      .type(' ')
    cy.get('#company_reg_number')
      .clear()
      .type(' ')
    // STEP 2: Click Save inside this tab
    cy.contains('.ant-tabs-tabpane-active button', 'Save').click();


  });

});

// TC-41(2) , TC 42 , TC 43 , TC 44 are same as TC 3 , TC 4 , TC 5 , TC 6 repectively

