const { test, expect} = require('@playwright/test');

const correctUserName = "anshika@gmail.com";
let webContext;


test.beforeAll(async({browser})=>{

    // const context = await browser.newContext();
    // const page = await context.newPage();
    // const password = "Iamking@000";

    // const userNameLocator = page.locator('#userEmail');
    // const userPasswordLocatot = page.locator('#userPassword');

    // await page.goto("https://rahulshettyacademy.com/client")
    // await userNameLocator.fill(correctUserName);
    // await userPasswordLocatot.fill(password);
    // await page.locator("[value='Login']").click();
    
    // await page.waitForLoadState('networkidle');
    // await context.storageState({path: 'state.json'});


    webContext = await browser.newContext({storageState: 'state.json'})
})

test('Client app with API part 2', async () =>
{
    // const password = "Iamking@000";

    // const userNameLocator = page.locator('#userEmail');
    // const userPasswordLocatot = page.locator('#userPassword');
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client")


    const cardTitles = page.locator(".card-body b");
    const products = page.locator('.card-body');
    const productName = "zara coat 3";

    // await page.goto("https://rahulshettyacademy.com/client")
    // await userNameLocator.fill(correctUserName);
    // await userPasswordLocatot.fill(password);
    // await page.locator("[value='Login']").click();
    
    // await page.waitForLoadState('networkidle');

    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);

    const countOfProducts = await products.count();

    for(let i=0; i<countOfProducts; i++){
        if(await products.nth(i).locator("b").textContent() === productName){
            await products.nth(i).locator("text=Add to Cart").click();
            break;
        }
            
    }
    await page.locator("[routerlink*='cart']").click();

    await page.locator('div li').first().waitFor();
    const bool = await page.locator("h3:has-text('zara coat 3')").isVisible;
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Select Country']").type("pol", {delay:100});
    const options = page.locator('.ta-results');
    await options.waitFor();
    const dropdownCount = await options.locator('button').count();
    const dropdown = options.locator('button');


    for(let i = 0; i<dropdownCount; i++){
        if(await dropdown.nth(i).textContent() === ' Poland'){
            await dropdown.nth(i).click();
            break;
        }
    }
    const emailValue = await page.locator(".user__name input[type='text']").inputValue();
    expect(emailValue).toEqual(correctUserName);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order.");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");

    for(let i =0; i<await rows.count(); i++){
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if(orderId.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    expect(orderId.includes(await page.locator(".col-text").textContent())).toBeTruthy();

});