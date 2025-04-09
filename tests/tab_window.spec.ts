import {test,expect} from '@playwright/test';

test.beforeEach('Login',async({page})=>{
    // Navigate to the page before each test
    await page.goto("https://demo.automationtesting.in/Windows.html");
});

test('Single Tab',async({page})=>{

    //Promise.all:Represents the completion of an asynchronous operation.
    const [new_tab]=await Promise.all([
        page.waitForEvent('popup'), // Wait for the new tab to open
        await page.click("//a[@href='http://www.selenium.dev']//button[@class='btn btn-info'][normalize-space()='click']")
    ])

    await new_tab.waitForLoadState();// Wait for the new tab to load completely
    await expect(new_tab).toHaveTitle('Selenium');
    await expect(new_tab).toHaveURL('https://www.selenium.dev/');
   
});

test('Single Window',async({page})=>{
    await page.click("//a[normalize-space()='Open New Seperate Windows']");

    //Promise.all:Represents the completion of an asynchronous operation.
    const [new_window]=await Promise.all([
        page.waitForEvent('popup'), // Wait for the new tab to open
        await page.click("//button[@onclick='newwindow()']")
    ])

    await new_window.waitForLoadState();// Wait for the new tab to load completely
    await expect(new_window).toHaveTitle('Selenium');
    await expect(new_window).toHaveURL('https://www.selenium.dev/');
});