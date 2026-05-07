const {test,expect}=require('@playwright/test')

test("End-to-End Testing",async({page})=>{

       //Open the Login page
        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        await expect(page).toHaveTitle("Let's Shop");

        const Useremail='shiva@gmail123.com';
        
        //Enter the valid credentail 
        await page.getByRole('textbox',{name:'email@example.com'}).pressSequentially(Useremail,{delay : 150});    //Enter the email 
        await page.getByRole('textbox',{name:'Passsword'}).pressSequentially('Singh@1712',{delay : 150});
        //Clicking on the login button
         await page.getByRole('button',{name:'Login'}).click();
         await page.waitForTimeout(3000);

         await expect(page.getByText("Automation").nth(0)).toHaveText("Automation");


        // const add_b= await page.$$('//div[@class="row"]/div//button[2]');     //Selecting all the product from the page
        // console.log(add_b.length);
        // for(let products of add_b)
        // {
        //     await products.click();
        //     await page.waitForTimeout(1000);
        //     await expect(page.locator('div[aria-label="Product Added To Cart"]')).toBeVisible();  
        // }

        //Selecting Multiple product 
        const add_mul=["//div[@class='container']//div[1]//div[1]//div[1]//button[2]","//div[@class='row']//div[2]//div[1]//div[1]//button[2]"];
        //console.log(add_mul.length);
        for(let products of add_mul)
        {
            await page.locator(products).click();
            await page.waitForTimeout(1000);
            await expect(page.locator('div[aria-label="Product Added To Cart"]')).toBeVisible();  
        }

        //Validating the select product form cart icon
        const countproduct=await page.locator('//button[@class="btn btn-custom"]/label').textContent();   
        console.log("How many number are show on the cart icon "+countproduct);
        await expect(countproduct).toBe("2");

        await page.locator("button[routerlink='/dashboard/cart']").click();     //clicking on the cart button
        await page.waitForTimeout(1000);

        //Validate the selected product
        //const productname=await page.$$("//div[@class='cart']/ul/li//h3");   //name of the product
        const productprice=await page.$$("//div[@class='cart']/ul/li/div/div[2]/p");  //price of the product
        console.log("The number of the product "+productprice.length);
        let sum=0;
        for(let pc of productprice)
        {
            const value=await pc.textContent();
            const prices=value.replace('$','');
            sum=sum + parseInt(prices);
            console.log(prices);
        }  
        console.log("Total price of the product "+sum);

        //Validate the product and Total price of the product
        await expect(productprice.length).toBe(2);
        const total=await page.locator("//div[@class='subtotal cf ng-star-inserted']/ul/li[2]/span[2]");
        const totalprice=await total.textContent();
        const tp=totalprice.replace('$','');
       // console.log(parseInt(tp));         //Only print the total price 
        await expect(sum).toBe(parseInt(tp));

        //Delete one product from the cart
        await page.locator("//li[@class='items odd ng-star-inserted']//button[@class='btn btn-danger']").click();
        //Reference the page
        await page.reload();
        await page.waitForTimeout(2000);

        //Delete the one product from the cart then we Validate the product and Total price of the product
        const prod_cart=await page.locator('//div[@class="cartSection"]//h3').textContent();  //locating the product name 
        const del_pricepath=await page.$$("//div[@class='cart']/ul/li/div/div[2]/p");  //price of the product
        console.log("The number of the product "+del_pricepath.length);
        let sum1=0;
        for(let del_after of del_pricepath)
        {
            const value1=await del_after.textContent();
            const after_prices=value1.replace('$','');
            sum1=sum1 + parseInt(after_prices);
            console.log(after_prices);
        }  
        console.log("Total price of the product "+sum1);

        //Validate the product and Total price of the product
        await expect(del_pricepath.length).toBe(1);
        const after_total=await page.locator("//li[1]//span[2]");
        const totp=await after_total.textContent();
        const final_amount=totp.replace('$','');
        await expect(sum1).toBe(parseInt(final_amount));

        //Click on the checkout
        await page.locator("//li/button[@class='btn btn-primary']").click();

        //confirmation  the product 
        const prod_pay=await page.locator('//div[@class="item__title"]').textContent();
        console.log("Name of the product "+prod_pay)
        await expect(prod_pay.trim()).toContain(prod_cart);

        //Enter the card Number
        await page.locator('//div[@class="field"]//input[@class="input txt text-validated"]').fill("1111 1121 1081 1151");

        //selecting Expiry date 
        await page.selectOption('//div[@class="row"]//select[1]','11');          //selecting month 
         await page.selectOption('//div[@class="row"]//select[2]','21');         //selecting date

         //Enter the cvv code of the card
         await page.locator('//div[@class="field small"]/input[@class="input txt"]').pressSequentially("1430",{delay :150});

         //Enter the name of the card
         await page.locator('//div[@class="field"]/input[@class="input txt"]').pressSequentially('SHIVA SINGH',{delay :150});

         //Apply coupon
         await page.locator('input[name="coupon"]').pressSequentially('rahulshettyacademy',{delay :150});  //Enter the coupon name
         await page.locator('button[class="btn btn-primary mt-1"]').click();      //click on button
         await page.waitForTimeout(4000);
         await expect(await page.locator('//p[@class="mt-1 ng-star-inserted"]')).toHaveText('* Coupon Applied');   //Validate the coupon is apply         
    
         //verify the email
        // const v_email=await page.getByText("shiva@gmail123.com").textContent();
        const v_email=await page.locator('//div[@class="user__name mt-5"]/label').textContent();
        console.log(v_email);
        await expect(await page.locator('//div[@class="user__name mt-5"]/label')).toHaveText(Useremail);

        //search the country name((search box))
        await page.getByPlaceholder('Select Country').pressSequentially('Ind',{delay :150});
        await page.waitForTimeout(3000);
        const search=await page.$$('//section[@class="ta-results list-group ng-star-inserted"]/button');
       // console.log(search.length);   count the list 
       for(const sl of search)
       {
            const c_name=await sl.textContent();
            console.log(c_name);
         if(" India" == c_name)
         {
            await sl.click();
         }
        }

        //click on the placeorder button
        await page.locator('a[class="btnn action__submit ng-star-inserted"]').click();
        await page.waitForTimeout(2000);
        //Validate the order confirmation message
        await expect(await page.locator('h1[class="hero-primary"]')).toHaveText(' Thankyou for the order. ');
        
        //click on download csv
        //await page.locator('button[class="btn btn-primary mt-3 mb-3"]').click();

        //click on the order 
        await page.locator('button[routerlink="/dashboard/myorders"]').click();

         //confirmation  the product 
        const prod_order=await page.locator('//table/tbody/tr/td[2]').first().textContent();
        console.log("Name of the product "+prod_order)
        await expect(prod_order.trim()).toContain(prod_cart);
        await page.waitForTimeout(3000);

});