 const {test, expect} = require('@playwright/test');
 const {POManager} = require('../pages/POManager');
 const dataset = JSON.parse(JSON.stringify(require("./utils/placeOrderTestData")));
const {customtest} = require('./utils/test-base');

test.describe.configure({mode: "parallel"});

 test('Client App login', async ({page})=>
 {
   const poManager = new POManager(page);
     const loginPage = poManager.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin(dataset.username,dataset.password);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart(dataset.productName);
     await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(dataset.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("pol","Poland");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
 });

 
 customtest('@Web Client App loginv2', async ({page, testDataForOrder})=>
 {
     const poManager = new POManager(page);
     const loginPage = poManager.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart(testDataForOrder.productName);
     await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("pol","Poland");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
 });
 

 



 

