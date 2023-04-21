const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require('./utils/APiUtils');
const loginPayLoad = {userEmail:"anshika@gmail.com",userPassword:"Iamking@000"};
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"62023a7616fcf72fe9dfc619"}]};
const fakePayLoadOrders = {data:[],message:"No Orders"};


let response;
test.beforeAll( async()=>
{
   const apiContext = await request.newContext();
   const apiUtils = new APiUtils(apiContext,loginPayLoad);
   response =  await apiUtils.createOrder(orderPayLoad);

})


test('Place the order', async ({page})=>
{
    page.addInitScript(value => {

        window.localStorage.setItem('token',value);
    }, response.token );
await page.goto("https://rahulshettyacademy.com/client/");


await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/62026f4edfa52b09e0a20b18",
async route=>
{
  const response =  await page.request.fetch(route.request());
  let body =fakePayLoadOrders;
   route.fulfill(
      {
        response,
        body,

      });
});

await page.locator("button[routerlink*='myorders']").click();
//await page.pause();
console.log(await page.locator(".mt-4").textContent());

});

