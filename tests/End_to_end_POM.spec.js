const {test,expect}=require('@playwright/test')
const {registration}=require('../pages/Registration_page')
const {loginuser}=require('../pages/Login')
const {product_page}=require('../pages/Product_page')
const {cartpage}=require('../pages/Cart_page')
const {checkoutpage}=require('../pages/Checkout_page')
const {download_product}=require('../pages/Download_page')
const {orderpage}=require('../pages/Order_page')

test("End-to-End Testing",async({page})=>{

    const login_ob=new loginuser(page);  //create object for login 
    await login_ob.gotourl();

    const reg_ob=new registration(page);  //create object for registration 
    await reg_ob.click_reg_link();
    await reg_ob.user_reg("Shiva","Singh","shivasingh782@gmail.com","1234567890","Singh@1712","Singh@1712");       //f_name,l_name,email,mobile_no,password_reg
    await reg_ob.click_login_link();

    await login_ob.loginUser1('shiva@gmail123.com','Singh@1712');
    await expect(page.getByText("Automation").nth(0)).toHaveText("Automation");  //validate the login successfully

    const prod_select= new product_page(page);         //create object for prduct page
    await prod_select.select_multiple_product();      //selecting multiple product 
   // await prod_select.select_all_product();          //slecting all product 

   const cartpage_ob=new cartpage(page);  //create object of the cart class 
   await cartpage_ob.verify_cart_no();     //verify the cart no 
   await cartpage_ob.click_cart();          //clicking on the cart button
   await page.waitForTimeout(1000);

   await expect(page.locator('//div[@class="heading cf"]//h1')).toHaveText("My Cart");    //verify the cart page is open
   
   await cartpage_ob.cal_price();    //calculate the price of the product 
   await cartpage_ob.total_price();   //Total price given by system

    await expect(cartpage_ob.len).toBe(2);  //how many product is there

   await cartpage_ob.delete_one_prod();  //delete one product 
   
   await page.waitForTimeout(2000);  

   await cartpage_ob.cal_price();  //calculate the price of the product 
   await cartpage_ob.total_price();   //Total price given by system


   const checkout_ob=new checkoutpage(page);    //create object for checkout page
   await checkout_ob.click_checkout();
   await checkout_ob.enter_detail("1111 1121 1081 1151","1430","SHIVA SINGH","rahulshettyacademy",'11','11');     //Enter the detail of user
   await page.waitForTimeout(4000);
   await expect(await page.locator('//p[@class="mt-1 ng-star-inserted"]')).toHaveText('* Coupon Applied');   //Validate the coupon is apply 
   await expect(await page.locator('//div[@class="user__name mt-5"]/label')).toHaveText(login_ob.email_user);  //validate the email id 
   await checkout_ob.searchbox("Ind");

   await checkout_ob.placeorder();   //click the place order button
   await page.waitForTimeout(2000);
   await expect(await page.locator('h1[class="hero-primary"]')).toHaveText(' Thankyou for the order. ');   //verify the order confirmation 

   //download csv file
   // const download_ob=new download_product(page);  //create object for download class
  // await download_ob.download_file();

    const order_ob=new orderpage(page);  //create object for order class
   await order_ob.orderpage();            //click on the order icon
   await page.waitForTimeout(3000);
   
});