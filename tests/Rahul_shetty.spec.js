
const {test , expect}=require("@playwright/test")
 
test("Rahul shetty",async({page})=>{
 
       //Opening the page
       await page.goto("https://rahulshettyacademy.com/angularpractice/");
       //validate the url of the page
       await expect(page).toHaveURL("https://rahulshettyacademy.com/angularpractice/");
       
       //print the title
       const pagetitle=await page.title();
       console.log(pagetitle);
       await expect(page).toHaveTitle("ProtoCommerce");   //validating the title of the page
 
       //Enter the name
      // await page.locator("input[name='name']").nth(0).pressSequentially("Shiva Singh",{delay : 150});
       await page.locator("input[name='name']").nth(0).click()
       //Enter the email
      // await page.locator("//input[@name='email']").pressSequentially("shivasingh@gmail.com",{delay :150});
        await page.locator("//input[@name='email']").click();
       //validating the name field
        const aa=page.locator("//div[normalize-space()='Name is required']");
        
        // const aab=await aa.textContent();
        // console.log(aab);
        await expect(aa).toContainText("required");

 
       //Enter the password
       await page.getByPlaceholder("Password").pressSequentially("shiva12345",{delay : 150});
 
       //Clicking on the check box
       await page.getByRole('checkbox',{name : "Check me out if you Love IceCreams!"}).check();
 
       //Select the item from dropdown
       await page.selectOption("#exampleFormControlSelect1","Female");
 
       //Click on the radio
       await page.getByRole('radio',{name :'Student'}).check();
       await expect(page.getByRole('radio',{name :'Student'})).toBeChecked();       //validate the radio button using toBeChecked()
       
       await page.getByRole('radio',{name :'Employed'}).check();
       await expect(page.getByRole('radio',{name :'Employed'})).toBeEnabled();     //validate the radio button using toBeEnabled()
 
      // await page.getByRole('radio',{name :'Entrepreneur (disabled)'}).check();
       await expect(page.getByRole('radio',{name :'Entrepreneur (disabled)'})).toBeDisabled();  //validate the radio button using toBeDisabled()
       
       //Enter the date of birth
       await page.locator('input[type="date"]').pressSequentially('11/20/2022',{delay : 150});
 
       //await page.pause();
 
       //Click on the submit button
       await page.getByRole('button',{name : 'Submit'}).click();
 
 
       await page.waitForTimeout(3000);
 
 
})
 
 


