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
  await page.getByText('Sign in').click()
  await page.getByRole('textbox',{name:'Email'}).fill('testt@test.com')
  await page.getByRole('textbox',{name:'Password'}).fill('Dond')
  await page.getByRole('button').click()
})
test('has title', async ({ page }) => {
  await expect(page.locator('.navbar-brand')).toHaveText(/conduit/);
  await page.waitForTimeout(3000);
});

test('Delete article',async ({page,request})=>{
  const response=await request.post('https://conduit-api.bondaracademy.com/api/users/login',{
    //playwright callls requestbody as data
    data:{
      "user":{"email":"testt@test.com","password":"Dond"}

    }
  
})
const responseBody=await response.json();
//console.log(responseBody.user.token)//first print responseBody.user.token using console.log then you can remove and store that value in other variable
const accessToken=responseBody.user.token

const articleResponse=await request.post('https://conduit-api.bondaracademy.com/api/articles/',{
  data:{
    "article":{"title":"This is Article","description":"This is title","body":"This is Discription","tagList":[]}
  },
  headers:{
    //value changes:'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyMzM1Mn0sImlhdCI6MTc0Mjk5MzQxNCwiZXhwIjoxNzQ4MTc3NDE0fQ.rDFpaZyQ-eAmZKBU2Pr9sP-nnFnTVly7D6FVdhmhlBs'
    authorization:`Token ${accessToken}`

  }
})
expect(articleResponse.status()).toEqual(201)

await page.getByText('Global Feed').click()
await page.getByText('This is Article').click()
await page.getByRole('button',{name:' Delete Article '}).first()
await page.getByText('Global Feed').click()

await expect(page.locator('app-article-list h1').first()).not.toContainText('This is Article')
})

test('create article',async({page})=>{
  await page.getByText(' New Article ').click()
  await page.getByPlaceholder('Article Title').fill('This is title')
  await page.getByPlaceholder('What\'s this article about?').fill('playwright is awesome')
  await page.getByPlaceholder('Write your article (in markdown)').fill('automation is easy')
  await page.getByRole('button',{name:' Publish Article '}).click()
  
  await expect(page.locator('.article-page h1')).toContainText('This is title')
  await page.getByText('Home').click()
  await page.getByText('Global Feed').click()
  await expect(page.locator('app-article-list h1').first()).toContainText('This is title')
})