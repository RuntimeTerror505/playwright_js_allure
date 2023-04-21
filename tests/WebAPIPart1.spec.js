const { test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');

const loginPayload = {
    userEmail: "anshika@gmail.com",
    userPassword: "Iamking@000"
  }


const orderPayload={
        orders: [
          {
            country: "Poland",
            productOrderedId: "6262e95ae26b7e1a10e89bf0"
          }
        ]
  }
let response;


test.beforeAll( async()=>{
   const apiContext =  await request.newContext();
   const apiUtils = new APIUtils(apiContext, loginPayload);
   response = await apiUtils.createOrder(orderPayload);

});

test('Place the order', async ({ page}) =>
{

    page.addInitScript(value =>{
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client")

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");

    for(let i =0; i<await rows.count(); i++){
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if(response.orderId.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    expect(response.orderId.includes(await page.locator(".col-text").textContent())).toBeTruthy();

});