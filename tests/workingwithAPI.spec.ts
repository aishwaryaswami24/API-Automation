import { test, expect } from '@playwright/test';

test.beforeEach(async ({page})=>{
  await page.route('*/**/api/tags',async route=>{ //*/** means users wants to match with any pattern URL '*/**/api/tags'
   // the actual URL is https://conduit.productionready.io/api/tags instead we are using '*/**/api/tags' to match with endpoint /api/tags
  const tags={
    
      "tags": [
          "Playwright",
          "Test",  
      ]
  }
  await route.fulfill({
    body:JSON.stringify(tags)
  })
})
  await page.goto('https://conduit.bondaracademy.com/');
})
test('has title', async ({ page }) => {
  await expect(page.locator('.navbar-brand')).toHaveText(/conduit/);
  await page.waitForTimeout(3000);
});
