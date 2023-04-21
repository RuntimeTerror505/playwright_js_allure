 const { expect} = require('@playwright/test');
 const { customtest } = require('./utils/test-base');
 const {POManager} = require('../pages/POManager');
 const dataset =  JSON.parse(JSON.stringify(require("./utils/placeOrderTestData")));

//  for (const data of dataset) {

 customtest(`testing with ${dataset.email}`, async ({page})=>
 {
   const poManager = new POManager(page);
     const loginPage = poManager.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin(dataset.email,dataset.password);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart(dataset.productName);
     await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(dataset.productName);
    await cartPage.Checkout();

 });
// }

 

// const base = require('@playwright/test');

// exports.test = base.test.extend({
//   // Define an option and provide a default value.
//   // We can later override it in the config.
//   person: [{email : "anshika@gmail.com", password:"Iamking@000"},
//   {email : "rahulshetty@gmail.com", password:"Iamking@00"}],
// });



 

