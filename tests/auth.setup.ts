/*import {test as setup} from '@playwright/test'
import user from '../.auth/user.json'
import fs from 'fs'

const authfile='.auth/user.json'

setup('authentication',async({page,request})=>{
//here we are directly using api for authetication

    // await page.goto('https://conduit.bondaracademy.com/');
    // await page.getByText('Sign in').click()
    // await page.getByRole('textbox',{name:'Email'}).fill('testt@test.com')
    // await page.getByRole('textbox',{name:'Password'}).fill('Dond')
    // await page.getByRole('button').click()
    // await page.waitForResponse('https://conduit-api.bondaracademy.com/api/tags')
    // await page.context().storageState({path:authfile})

    const response=await request.post('https://conduit-api.bondaracademy.com/api/users/login',{
        //playwright callls requestbody as data
        data:{
          "user":{"email":"testt@test.com","password":"Dond"}
    
        }
      
    })
    const responseBody=await response.json();
    const accessToken=responseBody.user.token
    user.origins[0].localStorage[0].value=accessToken
    fs.writeFileSync(authfile,JSON.stringify(user))

    process.env['ACCESS_TOKEN']=accessToken
})*/