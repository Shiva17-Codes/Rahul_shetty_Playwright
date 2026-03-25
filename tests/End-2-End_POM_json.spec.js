const {test,expect}=require('@playwright/test')
const {POMmanager}=require('../pages/POM_manager')
const test_data=JSON.parse(JSON.stringify(require('../utils/jsonfile')))

// using single json data
// test.skip("Flow Testing",async({page})=>{

//     const pomanager=new POMmanager(page);
//     const logintest=pomanager.getlogin();

//     await logintest.gotourl();

//     const reg_test=pomanager.getregistration();
//     await reg_test.click_reg_link();
//     await reg_test.user_reg(test_data.f_name,test_data.l_name,test_data.email,test_data.mob_no,test_data.password,test_data.confirm_p);
//     await reg_test.click_login_link();

//     await logintest.loginUser1(test_data.email,test_data.confirm_p);
//     await expect(page.getByText("Automation").nth(0)).toHaveText("Automation");  //validate the login successfully

//     const prod_test=pomanager.getproduct();
//     await prod_test.select_multiple_product();    //verify the cart no 
//     //await test.select_all_product();            //slecting all product 

//     const cart_test=pomanager.getcart();
//     await cart_test.verify_cart_no();             //verify the cart no 
//     await cart_test.click_cart();                 //clicking on the cart button
//     await page.waitForTimeout(1000);

//     await expect(page.locator('//div[@class="heading cf"]//h1')).toHaveText("My Cart");    //verify the cart page is open

//     await cart_test.cal_price();                 //calculate the price of the product 
//     await cart_test.total_price();                //Total price given by system

//     await expect(cart_test.len).toBe(2);        //how many product is there

//     await cart_test.delete_one_prod();            //delete one product 
//     await page.waitForTimeout(2000); 

//     await cart_test.cal_price();                 //calculate the price of the product 
//     await cart_test.total_price();               //Total price given by system

//     const checkout_test=pomanager.getcheckout();
//     const prod_cart=await page.locator('//div[@class="cartSection"]//h3').textContent();    //store the object value

//     await checkout_test.click_checkout();
//     await checkout_test.enter_detail(test_data.card_no,test_data.cvv_code,test_data.card_name,test_data.coup_add,test_data.ex_date,test_data.ex_month);     //Enter the detail of user
//     await page.waitForTimeout(4000);
//     await expect(await page.locator('//p[@class="mt-1 ng-star-inserted"]')).toHaveText('* Coupon Applied');   //Validate the coupon is apply 
//     await expect(await page.locator('//div[@class="user__name mt-5"]/label')).toHaveText(logintest.email_user);  //validate the email id 

//     await checkout_test.searchbox(test_data.sear_coun);      //search the country 

//      //confirmation  the product 
//     const prod_pay=await page.locator('//div[@class="item__title"]').textContent();
//     console.log("Name of the product "+prod_pay)
//     await expect(prod_pay.trim()).toContain(prod_cart);

//     await checkout_test.placeorder();     //click the place order button
//     await page.waitForTimeout(2000);

//     await expect(await page.locator('h1[class="hero-primary"]')).toHaveText(' Thankyou for the order. ');   //verify the order confirmation 

//      //verify the by product name
//     const after_place=await page.locator('//td/div[@class="title"]').first().textContent();
//     console.log("Name of the product "+after_place)
//     await expect(after_place.trim()).toContain(prod_cart);

//     //Store the order id
//     const orderid_finalpage=await page.locator('//label[@class="ng-star-inserted"]').first().textContent();
//     console.log("Name of the product "+orderid_finalpage);

//     //download csv file
//     const download_test=pomanager.getdownload();
//     await download_test.download_file();

//      const order_test=pomanager.getorder();
//     await order_test.orderpage();   //click on the order icon

//     //confirmation  the product 
//     const prod_order=await page.locator('//table/tbody/tr/td[2]').first().textContent();
//     console.log("Name of the product "+prod_order)
//     await expect(prod_order.trim()).toContain(prod_cart);

//     //verify the order id 
//     const orderid_orderpage=await orderid_finalpage.replaceAll("|","");
//     await expect(page.locator('//th[@scope="row"]').first()).toHaveText(orderid_orderpage.trim());


//     await page.waitForTimeout(3000);


// });

//Using multiple data in json
for(let data of test_data)
{
    test(`Flow Testing ${data.email}`,async({page})=>{

        const pomanager=new POMmanager(page);
        const logintest=pomanager.getlogin();

        await logintest.gotourl();

        const reg_test=pomanager.getregistration();
        await reg_test.click_reg_link();
        await reg_test.user_reg(data.f_name,data.l_name,data.email,data.mob_no,data.password,data.confirm_p);
        await reg_test.click_login_link();

        await logintest.loginUser1(data.email,data.confirm_p);
        await expect(page.getByText("Automation").nth(0)).toHaveText("Automation");  //validate the login successfully
        
        const prod_test=pomanager.getproduct();
        await prod_test.select_multiple_product();    //verify the cart no 
       

         const cart_test=pomanager.getcart();
        await cart_test.verify_cart_no();             //verify the cart no 
        await cart_test.click_cart();                 //clicking on the cart button
        await page.waitForTimeout(1000);

        await expect(page.locator('//div[@class="heading cf"]//h1')).toHaveText("My Cart");    //verify the cart page is open

        await cart_test.cal_price();                 //calculate the price of the product 
        await cart_test.total_price();                //Total price given by system

        await expect(cart_test.len).toBe(2);        //how many product is there

        await cart_test.delete_one_prod();            //delete one product 
        await page.waitForTimeout(2000); 

        await cart_test.cal_price();                 //calculate the price of the product 
        await cart_test.total_price();               //Total price given by system
    
        const checkout_test=pomanager.getcheckout();
        const prod_cart=await page.locator('//div[@class="cartSection"]//h3').textContent();    //store the object value

        await checkout_test.click_checkout();
        await checkout_test.enter_detail(data.card_no,data.cvv_code,data.card_name,data.coup_add,data.ex_date,data.ex_month);         //Enter the detail of user
        await page.waitForTimeout(4000);
        await expect(await page.locator('//p[@class="mt-1 ng-star-inserted"]')).toHaveText('* Coupon Applied');                       //Validate the coupon is apply 
        await expect(await page.locator('//div[@class="user__name mt-5"]/label')).toHaveText(logintest.email_user);                  //validate the email id 

        //search the country 
        await checkout_test.searchbox(data.sear_coun);              

         //confirmation  the product 
        const prod_pay=await page.locator('//div[@class="item__title"]').textContent();
        console.log("Name of the product "+prod_pay)
        await expect(prod_pay.trim()).toContain(prod_cart);

        //click the place order button
        await checkout_test.placeorder();              
        await page.waitForTimeout(2000);

        await expect(await page.locator('h1[class="hero-primary"]')).toHaveText(' Thankyou for the order. ');   //verify the order confirmation 

         //Store the order id
        const orderid_finalpage=await page.locator('//label[@class="ng-star-inserted"]').first().textContent();
        console.log("Name of the product "+orderid_finalpage);

        //download csv file
        const download_test=pomanager.getdownload();
        await download_test.download_file();

        const order_test=pomanager.getorder();
        await order_test.orderpage();   //click on the order icon

        //confirmation  the product 
        const prod_order=await page.locator('//table/tbody/tr/td[2]').first().textContent();
        console.log("Name of the product "+prod_order)
        await expect(prod_order.trim()).toContain(prod_cart);

        //verify the order id 
        const orderid_orderpage=await orderid_finalpage.replaceAll("|","");
        await expect(page.locator('//th[@scope="row"]').first()).toHaveText(orderid_orderpage.trim());


        await page.waitForTimeout(3000);


    });

}