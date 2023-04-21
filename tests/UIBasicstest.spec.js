const { test, expect} = require('@playwright/test');



const correctUserName = "rahulshettyacademy";
const password = "learning";



test('Browsery Context First Playwright test', async ({ browser }) =>
{
    const expectedErrorMessage = "Incorrect username/password.";
    const incorrectUserName = "rahulshetty";

    
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const userNameLocator = page.locator('#username');
    const passwordInput = page.locator("#password");
    const loginButton = page.locator("#signInBtn");

    const cardTitles = page.locator(".card-title a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title());

    await userNameLocator.type(incorrectUserName);
    await passwordInput.type(password);
    await page.locator("#terms").click();
    await loginButton.click();
    const errorMessage = await page.locator("[style*='block']").textContent();
    await expect(errorMessage).toEqual(expectedErrorMessage)

    await userNameLocator.fill(correctUserName);
    await Promise.all(
        [
            page.waitForNavigation(),
                loginButton.click(),
        ]
    );

    
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});

test('UI Controls', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")

    const userNameLocator = page.locator('#username');
    const passwordInput = page.locator("#password");
    const dropdown = page.locator('select.form-control');
    const loginButton = page.locator("#signInBtn");


    await userNameLocator.fill(correctUserName);
    await passwordInput.type(password);


    await dropdown.selectOption('consult');
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    await expect(page.locator('.radiotextsty').last()).toBeChecked();

    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();

    await expect(page.locator('.blinkingText')).toHaveCSS('animation','1s linear 0s infinite normal none running blink');


    
    await Promise.all(
        [
            page.waitForNavigation(),
                loginButton.click(),
        ]
    );
});

// test('Page First Playwright test', async ({ page }) =>
// {
    
    // await page.goto("https://google.com")
    // console.log(await page.title());
    // await expect(page).toHaveTitle("Google");

// });