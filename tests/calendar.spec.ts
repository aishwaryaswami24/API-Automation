import {test,expect} from '@playwright/test';
import {DateTime} from 'luxon';

test.beforeEach(async({page})=>{
    await page.goto('https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo');
})

test('Calendar fill',async({page})=>{
    let date='1996-10-24';
    await page.fill('#birthday',date);
    await page.waitForTimeout(4000);
    
})

test('Calendar fill with date picker',async({page})=>{
    await page.locator('input[placeholder="Start date"]').click();
    
    const monthyear=page.locator('div[class="datepicker-days"] th[class="datepicker-switch"]');
    const prevbutton=page.locator('div[class="datepicker-days"] th[class="prev"]');
    const nextbutton=page.locator('div[class="datepicker-days"] th[class="next"]');

    let datetoselect='June 2025';
    const formattedmonthyear=DateTime.fromFormat(datetoselect,'MMMM yyyy');

    while(await monthyear.textContent() !=datetoselect){
        if(formattedmonthyear < DateTime.fromJSDate(new Date())){
            await prevbutton.click();
        }
        else{
            await nextbutton.click();
        }
    }

    await page.locator('//td[normalize-space()="6"]').click();
    await page.waitForTimeout(4000);

});

test.only('Calendar fill with date picker using function',async({page})=>{
    await page.locator('input[placeholder="Start date"]').click();
    await selectdate(6,'June 2025',page);

});
async function selectdate(date:number,datetoselect:string,page:any){

    const monthyear=page.locator('div[class="datepicker-days"] th[class="datepicker-switch"]');
    const prevbutton=page.locator('div[class="datepicker-days"] th[class="prev"]');
    const nextbutton=page.locator('div[class="datepicker-days"] th[class="next"]');

    const formattedmonthyear=DateTime.fromFormat(datetoselect,'MMMM yyyy');

    while(await monthyear.textContent() !=datetoselect){
        if(formattedmonthyear < DateTime.fromJSDate(new Date())){
            await prevbutton.click();
        }
        else{
            await nextbutton.click();
        }
    }
    await page.locator(`//td[normalize-space()="${date}"]`).click();
}