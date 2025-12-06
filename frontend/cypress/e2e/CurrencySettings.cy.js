// // TC 48 , TC 49 , TC 50 , TC 54 , TC 55 done by exploratory testing 

// //Key Observations For Company Logo form (TC 45 , 46 , 47) : Image Upload field is optional 
// // and form works fine even if no image is uploded
// // There exists a mechanism to ensure that Invalid format files are
// //  not uploaded by user and only images are uploaded

// //TC 51 , TC 56 ,TC 58 , TC 61  valid currency symbol , Decimal Separator , Thousand Separator and Cent precision typed
// //Expected : Settings  saved successfully 
// //Actual : Settings saved successfully  
// describe('Settings – Currency Settings', () => {

//   before(() => {
//     // SET VIEWPORT
//     cy.viewport(1280, 800);

//     // VISIT LOGIN PAGE
//     cy.visit('http://localhost:3000/login');

//     // LOGIN
//     cy.get('#normal_login_email')
//       .clear()
//       .type('admin@admin.com');

//     cy.get('#normal_login_password')
//       .clear()
//       .type('admin123');

//     cy.get('button[type="submit"]').click();

//     // ASSERT LOGIN SUCCESS
//     cy.url({ timeout: 15000 }).should('eq', 'http://localhost:3000/');

//     // NAVIGATE TO SETTINGS PAGE
//     cy.visit('http://localhost:3000/settings');

//     // CLICK Company Settings TAB
//     cy.contains('.ant-tabs-tab', 'Company Settings').click();

//     // CLICK Currency Settings INSIDE LEFT MENU IF EXISTS
//     cy.contains('Currency Settings').click({ force: true });

//     // CHECK CURRENCY SYMBOL FIELD IS VISIBLE
//     cy.get('#currency_symbol').should('be.visible');
//   });

//   it('TC 51 , TC 56 ,TC 58 , TC 61  valid currency symbol , Decimal Separator , Thousand Separator and Cent precision typed', () => {

//     // STEP 1: Enter $
//     cy.get('#currency_symbol')
//       .clear()
//       .type('$');
//         cy.get('#decimal_sep')
//       .clear()
//       .type(',');
//           cy.get('#thousand_sep')
//       .clear()
//       .type(',');
//           cy.get('#cent_precision')
//       .clear()
//       .type('3');
//     // STEP 2: Click Save button of this sub-form
//     cy.contains('.ant-tabs-tabpane-active button', 'Save').click();

//   });

// });

// //TC 52 , TC 57 ,TC 59 , TC 62  Invalid currency symbol , Decimal Separator/Thousand Separator , Cent precision  blank 
// //Expected : Settings not saved successfully due to missing mandatory fields
// //Actual : Settings not saved successfully due to missing cent precision field , all other empty fields ignored 
// describe('Settings – Currency Settings', () => {

//   before(() => {
//     // SET VIEWPORT
//     cy.viewport(1280, 800);

//     // VISIT LOGIN PAGE
//     cy.visit('http://localhost:3000/login');

//     // LOGIN
//     cy.get('#normal_login_email')
//       .clear()
//       .type('admin@admin.com');

//     cy.get('#normal_login_password')
//       .clear()
//       .type('admin123');

//     cy.get('button[type="submit"]').click();

//     // ASSERT LOGIN SUCCESS
//     cy.url({ timeout: 15000 }).should('eq', 'http://localhost:3000/');

//     // NAVIGATE TO SETTINGS PAGE
//     cy.visit('http://localhost:3000/settings');

//     // CLICK Company Settings TAB
//     cy.contains('.ant-tabs-tab', 'Company Settings').click();

//     // CLICK Currency Settings INSIDE LEFT MENU IF EXISTS
//     cy.contains('Currency Settings').click({ force: true });

//     // CHECK CURRENCY SYMBOL FIELD IS VISIBLE
//     cy.get('#currency_symbol').should('be.visible');
//   });

//   it('TC 52 , TC 57 ,TC 59 , TC 62  Invalid currency symbol , Decimal Separator/Thousand Separator , Cent precision  blank ', () => {

//     // STEP 1: Enter $
//     cy.get('#currency_symbol')
//       .clear()
//       .type('abc');
//         cy.get('#decimal_sep')
//       .clear()
//       .type(' ');
//           cy.get('#thousand_sep')
//       .clear()
//       .type(' ');
//           cy.get('#cent_precision')
//       .clear()
//       .type(' ');
//     // STEP 2: Click Save button of this sub-form
//     cy.contains('.ant-tabs-tabpane-active button', 'Save').click();

//   });

// });


// //TC 53 , TC 58(a) ,TC 60 , TC 63   currency symbol blank , Decimal Separator/Thousand Separator invalid character values  , Cent precision  value > upperlimit 
// //Expected : Settings not saved successfully due to missing mandatory field as well as invalid inputs of other fields
// //Actual : Settings saved successfully and issues ignored
// describe('Settings – Currency Settings', () => {

//   before(() => {
//     // SET VIEWPORT
//     cy.viewport(1280, 800);

//     // VISIT LOGIN PAGE
//     cy.visit('http://localhost:3000/login');

//     // LOGIN
//     cy.get('#normal_login_email')
//       .clear()
//       .type('admin@admin.com');

//     cy.get('#normal_login_password')
//       .clear()
//       .type('admin123');

//     cy.get('button[type="submit"]').click();

//     // ASSERT LOGIN SUCCESS
//     cy.url({ timeout: 15000 }).should('eq', 'http://localhost:3000/');

//     // NAVIGATE TO SETTINGS PAGE
//     cy.visit('http://localhost:3000/settings');

//     // CLICK Company Settings TAB
//     cy.contains('.ant-tabs-tab', 'Company Settings').click();

//     // CLICK Currency Settings INSIDE LEFT MENU IF EXISTS
//     cy.contains('Currency Settings').click({ force: true });

//     // CHECK CURRENCY SYMBOL FIELD IS VISIBLE
//     cy.get('#currency_symbol').should('be.visible');
//   });

//   it('TC 53 , TC 58(a) ,TC 60 , TC 63   currency symbol blank , Decimal Separator/Thousand Separator invalid character values  , Cent precision  value > upperlimit  ', () => {

//     // STEP 1: Enter $
//     cy.get('#currency_symbol')
//       .clear()
//       .type(' ');
//         cy.get('#decimal_sep')
//       .clear()
//       .type('a');
//           cy.get('#thousand_sep')
//       .clear()
//       .type('a');
//           cy.get('#cent_precision')
//       .clear()
//       .type('10000000');
//     // STEP 2: Click Save button of this sub-form
//     cy.contains('.ant-tabs-tabpane-active button', 'Save').click();

//   });

// });

// //TC 64 non numeric value of cent precision
// //Expected : Settings not saved successfully due to invalid input
// //Actual : Settings  not saved successfully due to invalid input
// describe('Settings – Currency Settings', () => {

//   before(() => {
//     // SET VIEWPORT
//     cy.viewport(1280, 800);

//     // VISIT LOGIN PAGE
//     cy.visit('http://localhost:3000/login');

//     // LOGIN
//     cy.get('#normal_login_email')
//       .clear()
//       .type('admin@admin.com');

//     cy.get('#normal_login_password')
//       .clear()
//       .type('admin123');

//     cy.get('button[type="submit"]').click();

//     // ASSERT LOGIN SUCCESS
//     cy.url({ timeout: 15000 }).should('eq', 'http://localhost:3000/');

//     // NAVIGATE TO SETTINGS PAGE
//     cy.visit('http://localhost:3000/settings');

//     // CLICK Company Settings TAB
//     cy.contains('.ant-tabs-tab', 'Company Settings').click();

//     // CLICK Currency Settings INSIDE LEFT MENU IF EXISTS
//     cy.contains('Currency Settings').click({ force: true });

//     // CHECK CURRENCY SYMBOL FIELD IS VISIBLE
//     cy.get('#currency_symbol').should('be.visible');
//   });

//   it('TC 64 non numeric value of cent precision', () => {

//     // STEP 1: Enter $
   
//     cy.get('#cent_precision')
//       .clear()
//       .type('ere');
//     // STEP 2: Click Save button of this sub-form
//     cy.contains('.ant-tabs-tabpane-active button', 'Save').click();

//   });

// });

