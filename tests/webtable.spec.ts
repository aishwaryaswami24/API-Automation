import test, {Page, expect } from "@playwright/test";

test.only("webtable",async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    const table= page.locator('//table[@name="BookTable"]');
    const headers=table.locator('th');
    const headercount=await headers.count();
    console.log(headercount);
    for(let i=0;i<headercount;i++){
        console.log(await headers.nth(i).textContent())
    }
    const rows=table.locator('tr');
    const rowscount=await rows.count();

    //fetch amit from table
    const amit=table.locator('tbody tr:nth-child(2) td:nth-child(2)');
    console.log(await amit.textContent());
    await expect(amit).toHaveText('Amit');
  
    expect(headercount).toBe(4);
    expect(rowscount).toBe(7);
   
})