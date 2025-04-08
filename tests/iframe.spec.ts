import {test,expect} from '@playwright/test';

test.beforeEach('Login',async({page})=>{
    await page.goto('https://ui.vision/demo/webtest/frames/');
});

test('iframe',async({page})=>{
    const frame=page.frameLocator('//frame[@src="frame_1.html"]');
    const frame1textbox=frame.locator('[name="mytext1"]');
    await frame1textbox.fill('Hello World!');
    await page.waitForTimeout(2000);
});

test.only('nested frame',async({page})=>{
    const frame=page.frame({url:'https://ui.vision/demo/webtest/frames/frame_3.html'});
    const childFrames=frame?.childFrames();
    await page.waitForTimeout(3000);
    const childFramescount=childFrames?.length;
    console.log(childFramescount);
    const c1= await childFrames[0].locator('//div[@id="i6"]//div[@class="AB7Lab Id5V1"]').check({force:true});
    const c2= await childFrames[0].locator('//div[@id="i21"]//div[@class="PkgjBf MbhUzd"]').check({force:true});
    await expect(await c1.isChecked()).toBeTruthy();
    await expect(await c2.isChecked()).toBeTruthy();
    await page.waitForTimeout(2000);
});