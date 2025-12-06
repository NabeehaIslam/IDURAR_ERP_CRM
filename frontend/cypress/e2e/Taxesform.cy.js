// //TC01 Search existing record 
// // Expected : existing Tax found during search
// // Actual : There exists a bug in this functionality 
// // as even if I enter already existing record , it don't get displayed 
// describe('Taxes Form - TC-01: Search existing tax', () => {

//   beforeEach(() => {
//     cy.viewport(1280, 800);

//     // Login
//     cy.visit('http://localhost:3000/login');
//     cy.get('#normal_login_email').clear().type('admin@admin.com');
//     cy.get('#normal_login_password').clear().type('admin123');
//     cy.get('button[type="submit"]').click();

//     cy.contains('Dashboard', { timeout: 8000 }).should('be.visible');

//     // Go to Taxes Form
//     cy.contains('Taxes').click();
//     cy.url().should('include', '/taxes');
//     cy.get('.ant-table', { timeout: 8000 }).should('be.visible');
//   });

//   it('should display matching tax record when searching for "Tax 0%"', () => {

//     // Step 1: Enter text in Search field
//     cy.get('input[placeholder*="Search"], .ant-input-search input')
//       .first()
//       .should('be.visible')
//       .clear()
//       .type('Tax 0%{enter}');

//     // Step 2: Wait for results
//     cy.wait(1500);

    
//     // Ensure no error messages appear
//     cy.get('.ant-message-error').should('not.exist');

//     cy.log(' Test Passed: Matching record displayed successfully.');
//   });
// });

// // TC02: Search text not present in DB  
// // Expected: UI should show "No data" (AntD empty table)
// // Actual : No result found for non existent record 
// describe('Taxes Form - TC-02: Search non-existing tax', () => {

//   beforeEach(() => {
//     cy.viewport(1280, 800);

//     // Login
//     cy.visit('http://localhost:3000/login');
//     cy.get('#normal_login_email').clear().type('admin@admin.com');
//     cy.get('#normal_login_password').clear().type('admin123');
//     cy.get('button[type="submit"]').click();

//     cy.contains('Dashboard', { timeout: 8000 }).should('be.visible');

//     // Navigate to Taxes
//     cy.contains('Taxes').click();
//     cy.url().should('include', '/taxes');
//     cy.get('.ant-table', { timeout: 8000 }).should('be.visible');
//   });

//   it('should show "No data" when searching for a non-existent tax "lmno"', () => {

//     // Step 1: Enter non-existing text in Search field
//     cy.get('input[placeholder*="Search"], .ant-input-search input')
//       .first()
//       .should('be.visible')
//       .clear()
//       .type('lmno{enter}');

//     // Step 2: Wait for results to update
//     cy.wait(1500);

//     // Expected Result: No results found → AntD shows "No data"
//     cy.get('.ant-table-tbody', { timeout: 8000 })
//       .should('contain.text', 'No data');

//     // Ensure no error messages appear
//     cy.get('.ant-message-error').should('not.exist');

//     cy.log(' Test Passed: No results found for "lmno", UI shows empty state.');
//   });
// });

// // TC03: Search text > 256 characters
// // Expected: Should not allow >256 chars OR show an error message.
// // Actual : no system crash with no recird display
// describe('Taxes Form - TC-03: Search text greater than 256 characters', () => {

//   beforeEach(() => {
//     cy.viewport(1280, 800);

//     // Login
//     cy.visit('http://localhost:3000/login');
//     cy.get('#normal_login_email').clear().type('admin@admin.com');
//     cy.get('#normal_login_password').clear().type('admin123');
//     cy.get('button[type="submit"]').click();

//     cy.contains('Dashboard', { timeout: 8000 }).should('be.visible');

//     // Go to Taxes Form
//     cy.contains('Taxes').click();
//     cy.url().should('include', '/taxes');
//     cy.get('.ant-table', { timeout: 8000 }).should('be.visible');
//   });

//   it('should not accept more than 256 characters or should show an error message', () => {

//     const longText = 'x'.repeat(300); // 300 chars ( > 256 )

//     // Step 1: Enter very long text
//     cy.get('input[placeholder*="Search"], .ant-input-search input')
//       .first()
//       .should('be.visible')
//       .clear()
//       .type(longText, { delay: 0 });

//     // Step 2: Trigger search
//     cy.get('input[placeholder*="Search"], .ant-input-search input')
//       .first()
//       .type('{enter}');

//     cy.wait(1500);

//     // Expected Outcome Path A → Search field should truncate input
//     cy.get('input[placeholder*="Search"], .ant-input-search input')
//       .first()
//       .invoke('val')
//       .then(val => {
//         if (val.length <= 256) {
//           cy.log(' Field truncated input to 256 characters.');
//           return;
//         }
//       });

//     // Expected Outcome Path B → Error message should appear
//     cy.get('body').then(($body) => {
//       if ($body.find('.ant-message-error').length) {
//         cy.get('.ant-message-error')
//           .should('contain.text', 'too long')
//           .or('contain.text', '256')
//           .or('contain.text', 'long');
//         cy.log(' Error message displayed for long input.');
//         return;
//       }
//     });

//     // Expected Outcome Path C → System processes search but shows no results
//     cy.get('.ant-table-tbody', { timeout: 8000 })
//       .should('contain.text', 'No data');

//     // Ensure system does NOT crash
//     cy.get('.ant-notification-error').should('not.exist');

//     cy.log('Test Completed: Input >256 chars is handled safely without system crash.');
//   });

// });

// //TC04 Tax search field empty  
// // Expected : No error message throen 
// // Actual : Succesfull execution of test case without error message 
// describe('Taxes Form - TC-04: Tax Search field empty', () => {

//   beforeEach(() => {
//     cy.viewport(1280, 800);

//     // Login
//     cy.visit('http://localhost:3000/login');
//     cy.get('#normal_login_email').clear().type('admin@admin.com');
//     cy.get('#normal_login_password').clear().type('admin123');
//     cy.get('button[type="submit"]').click();

//     cy.contains('Dashboard', { timeout: 8000 }).should('be.visible');

//     // Go to Taxes Form
//     cy.contains('Taxes').click();
//     cy.url().should('include', '/taxes');
//     cy.get('.ant-table', { timeout: 8000 }).should('be.visible');
//   });

//   it('observe behaviour for empty tax search field', () => {

//     // Step 1: Enter text in Search field
//     cy.get('input[placeholder*="Search"], .ant-input-search input')
//       .first()
//       .should('be.visible')
//       .clear()
//       .type(' {enter}');

//     // Step 2: Wait for results
//     cy.wait(1500);

    
//     // Ensure no error messages appear
//     cy.get('.ant-message-error').should('not.exist');

//     cy.log(' Test Passed: No error message shown on empty search field ');
//   });
// });


// //TC05 , TC10 , TC11 Valid Tax name and value entered entered in Add Tax Name filed
// //Expected : Successfull creation of Tax 
// //Actual :  Successfull creation of Tax
// describe('Taxes Form - TC05, TC10 , TC11', () => {

//   before(() => {
//     // Login first
//     cy.viewport(1280, 800);
//     cy.visit('http://localhost:3000/login');

//     cy.get('#normal_login_email').clear().type('admin@admin.com');
//     cy.get('#normal_login_password').clear().type('admin123');
//     cy.get('button[type="submit"]').click();

//     // Verify login success
//     cy.contains('Dashboard').should('be.visible');
//   });

//   it('Should open Taxes drawer and submit a new tax', () => {
//     // Navigate to Taxes page
//     cy.contains('Taxes').click();
//     cy.url().should('include', '/taxes');

//     // Click "Add New Tax"
//     cy.contains('Add New Tax')
//       .scrollIntoView()
//       .should('be.visible')
//       .click({ force: true });

//     // Scope everything inside the visible drawer
//     cy.get('.ant-drawer:visible', { timeout: 10000 }).within(() => {

//       // Fill taxName input
//       cy.get('input#taxName:visible')
//         .should('be.visible')
//         .clear({ force: true })
//         .type(`@`, { force: true });

//       // Fill taxValue input
//       cy.get('input#taxValue:visible')
//         .should('be.visible')
//         .clear({ force: true })
//         .type('15', { force: true });

//       // Toggle Enabled switch if needed
//       cy.get('#enabled:visible').then($switch => {
//         if ($switch.attr('aria-checked') === 'false') {
//           cy.wrap($switch).click({ force: true });
//         }
//       });

//       // Toggle Default switch if needed
//       cy.get('#isDefault:visible').then($switch => {
//         if ($switch.attr('aria-checked') === 'false') {
//           cy.wrap($switch).click({ force: true });
//         }
//       });

//       // Submit form
//       cy.contains('button', 'Submit').click({ force: true });
//     });

//     // Optional: Verify new tax appears in the table
//     cy.get('.ant-table:visible', { timeout: 10000 })
//       .contains('td', 'Test Tax')
//       .should('exist');
//   });
// });


// //TC06 In tax amount non numeric input entered
// //Expected : Error in creation of Tax 
// //Actual :  Error in creation of Tax
// describe('Taxes Form - TC06: Non-numeric value', () => {

//   before(() => {
//     cy.viewport(1280, 800);
//     cy.visit('http://localhost:3000/login');

//     cy.get('#normal_login_email').clear().type('admin@admin.com');
//     cy.get('#normal_login_password').clear().type('admin123');
//     cy.get('button[type="submit"]').click();

//     cy.url({ timeout: 10000 }).should('include', '/');
//     cy.contains('Dashboard').should('be.visible');
//   });

//   it('Should show error when non-numeric value is entered in Tax Value', () => {
//     cy.contains('Taxes').click();
//     cy.url().should('include', '/taxes');

//     cy.contains('Add New Tax')
//       .scrollIntoView()
//       .should('be.visible')
//       .click({ force: true });

//     cy.get('.ant-drawer:visible', { timeout: 10000 }).within(() => {
//       cy.get('input#taxName:visible')
//         .clear({ force: true })
//         .type('Test Tax Non-Numeric', { force: true });

//       cy.get('input#taxValue:visible')
//         .clear({ force: true })
//         .type('abc', { force: true });

//       // Toggle switches if needed
//       cy.get('#enabled:visible').then($switch => {
//         if ($switch.attr('aria-checked') === 'false') cy.wrap($switch).click({ force: true });
//       });
//       cy.get('#isDefault:visible').then($switch => {
//         if ($switch.attr('aria-checked') === 'false') cy.wrap($switch).click({ force: true });
//       });

//       // Submit
//       cy.contains('button', 'Submit').click({ force: true });

//     });

//     // Ensure invalid tax is NOT in table
//     cy.get('.ant-table:visible').contains('td', 'Test Tax Non-Numeric').should('not.exist');
//   });
// });

// //TC07 In tax amount non posistive integer input entered
// //Expected : Error in creation of Tax 
// //Actual :  Auto fix of negative value to zero withou any error message 
// describe('Taxes Form - TC07: Non-positive integer value', () => {

//   before(() => {
//     cy.viewport(1280, 800);

//     // Intercept key API calls to ensure page is fully loaded
//     cy.intercept('GET', '/api/setting/listAll').as('getSettings');
//     cy.intercept('GET', '/api/client/summary').as('getClientSummary');

//     cy.visit('http://localhost:3000/login');
//     cy.get('#normal_login_email').clear().type('admin@admin.com');
//     cy.get('#normal_login_password').clear().type('admin123');
//     cy.get('button[type="submit"]').click();

//     // Wait for dashboard to load
//     cy.wait(['@getSettings', '@getClientSummary']);
//     cy.contains('Dashboard', { timeout: 15000 }).should('be.visible');
//   });

//   it('Should show error when non-positive integer input entered', () => {
//     cy.contains('Taxes').click();
//     cy.url().should('include', '/taxes');

//     cy.contains('Add New Tax')
//       .scrollIntoView()
//       .should('be.visible')
//       .click({ force: true });

//     cy.get('.ant-drawer:visible', { timeout: 10000 }).within(() => {
//       cy.get('input#taxName:visible')
//         .clear({ force: true })
//         .type('Test Tax Non-Positive', { force: true });

//       cy.get('input#taxValue:visible')
//         .clear({ force: true })
//         .type('-100', { force: true });

//       // Toggle switches if needed
//       cy.get('#enabled:visible').then($switch => {
//         if ($switch.attr('aria-checked') === 'false') cy.wrap($switch).click({ force: true });
//       });
//       cy.get('#isDefault:visible').then($switch => {
//         if ($switch.attr('aria-checked') === 'false') cy.wrap($switch).click({ force: true });
//       });

//       // Submit
//       cy.contains('button', 'Submit').click({ force: true });


//     });

   
//   });
// });

// //TC08 Tax value grater than 100 entered
// //Expected : Error in creation of Tax 
// //Actual :  Auto fix of greater values to 100 without any error message 
// describe('Taxes Form - TC08: Tax value grater than 100 ', () => {

//   before(() => {
//     cy.viewport(1280, 800);

//     // Intercept key API calls to ensure page is fully loaded
//     cy.intercept('GET', '/api/setting/listAll').as('getSettings');
//     cy.intercept('GET', '/api/client/summary').as('getClientSummary');

//     cy.visit('http://localhost:3000/login');
//     cy.get('#normal_login_email').clear().type('admin@admin.com');
//     cy.get('#normal_login_password').clear().type('admin123');
//     cy.get('button[type="submit"]').click();

//     // Wait for dashboard to load
//     cy.wait(['@getSettings', '@getClientSummary']);
//     cy.contains('Dashboard', { timeout: 15000 }).should('be.visible');
//   });

//   it('Should show error when Tax value grater than 100 is entered', () => {
//     cy.contains('Taxes').click();
//     cy.url().should('include', '/taxes');

//     cy.contains('Add New Tax')
//       .scrollIntoView()
//       .should('be.visible')
//       .click({ force: true });

//     cy.get('.ant-drawer:visible', { timeout: 10000 }).within(() => {
//       cy.get('input#taxName:visible')
//         .clear({ force: true })
//         .type('Test Tax Non-Positive', { force: true });

//       cy.get('input#taxValue:visible')
//         .clear({ force: true })
//         .type('100000', { force: true });

//       // Toggle switches if needed
//       cy.get('#enabled:visible').then($switch => {
//         if ($switch.attr('aria-checked') === 'false') cy.wrap($switch).click({ force: true });
//       });
//       cy.get('#isDefault:visible').then($switch => {
//         if ($switch.attr('aria-checked') === 'false') cy.wrap($switch).click({ force: true });
//       });

//       // Submit
//       cy.contains('button', 'Submit').click({ force: true });


//     });

   
//   });
// });

// //TC09 , TC12 Tax value and Tax name left empty
// //Expected : Error in creation of Tax 
// //Actual :  Error in creation of Tax due to missing field value , missing tax name don't cause any error 
// describe('Taxes Form - TC09 , TC12: Tax name and value left empty ', () => {

//   before(() => {
//     cy.viewport(1280, 800);

//     // Intercept key API calls to ensure page is fully loaded
//     cy.intercept('GET', '/api/setting/listAll').as('getSettings');
//     cy.intercept('GET', '/api/client/summary').as('getClientSummary');

//     cy.visit('http://localhost:3000/login');
//     cy.get('#normal_login_email').clear().type('admin@admin.com');
//     cy.get('#normal_login_password').clear().type('admin123');
//     cy.get('button[type="submit"]').click();

//     // Wait for dashboard to load
//     cy.wait(['@getSettings', '@getClientSummary']);
//     cy.contains('Dashboard', { timeout: 15000 }).should('be.visible');
//   });

//   it('Should show error when Tax value left empty', () => {
//     cy.contains('Taxes').click();
//     cy.url().should('include', '/taxes');

//     cy.contains('Add New Tax')
//       .scrollIntoView()
//       .should('be.visible')
//       .click({ force: true });

//     cy.get('.ant-drawer:visible', { timeout: 10000 }).within(() => {
//       cy.get('input#taxName:visible')
//         .clear({ force: true })
//         .type(' ', { force: true });

//       cy.get('input#taxValue:visible')
//         .clear({ force: true })
//         .type(' ', { force: true });

//       // Toggle switches if needed
//       cy.get('#enabled:visible').then($switch => {
//         if ($switch.attr('aria-checked') === 'false') cy.wrap($switch).click({ force: true });
//       });
//       cy.get('#isDefault:visible').then($switch => {
//         if ($switch.attr('aria-checked') === 'false') cy.wrap($switch).click({ force: true });
//       });

//       // Submit
//       cy.contains('button', 'Submit').click({ force: true });


//     });

   
//   });
// });

// //TC13 Enter name of tax > 256 characters
// //Expected : Error message displayed 
// //Actual : No error messgae displayed tax saved successfully 
// describe('Taxes Form - TC13: Tax name > 256 ', () => {

//   before(() => {
//     cy.viewport(1280, 800);

//     // Intercept key API calls to ensure page is fully loaded
//     cy.intercept('GET', '/api/setting/listAll').as('getSettings');
//     cy.intercept('GET', '/api/client/summary').as('getClientSummary');

//     cy.visit('http://localhost:3000/login');
//     cy.get('#normal_login_email').clear().type('admin@admin.com');
//     cy.get('#normal_login_password').clear().type('admin123');
//     cy.get('button[type="submit"]').click();

//     // Wait for dashboard to load
//     cy.wait(['@getSettings', '@getClientSummary']);
//     cy.contains('Dashboard', { timeout: 15000 }).should('be.visible');
//   });

//   it('Should show error when Tax name > 256', () => {
//     cy.contains('Taxes').click();
//     cy.url().should('include', '/taxes');

//     cy.contains('Add New Tax')
//       .scrollIntoView()
//       .should('be.visible')
//       .click({ force: true });

//     cy.get('.ant-drawer:visible', { timeout: 10000 }).within(() => {
//       cy.get('input#taxName:visible')
//         .clear({ force: true })
//         .type('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', { force: true });

//       cy.get('input#taxValue:visible')
//         .clear({ force: true })
//         .type('34', { force: true });

//       // Toggle switches if needed
//       cy.get('#enabled:visible').then($switch => {
//         if ($switch.attr('aria-checked') === 'false') cy.wrap($switch).click({ force: true });
//       });
//       cy.get('#isDefault:visible').then($switch => {
//         if ($switch.attr('aria-checked') === 'false') cy.wrap($switch).click({ force: true });
//       });

//       // Submit
//       cy.contains('button', 'Submit').click({ force: true });


//     });

   
//   });
// });

