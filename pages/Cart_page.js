const { expect } = require("@playwright/test");


class cartpage{

    constructor(page)
    {
        this.page=page;
        this.countproduct=page.locator('//button[@class="btn btn-custom"]/label');
        this.btncart=page.locator("button[routerlink='/dashboard/cart']");
        this.tot_price=page.locator("//li[2]//span[2]");
        this.del_one= page.locator("//li[@class='items odd ng-star-inserted']//button[@class='btn btn-danger']");
        



    }


    async verify_cart_no()
    {
        const prod_no=await this.countproduct.textContent();
        console.log("Number of product "+prod_no);
        await expect(prod_no).toBe("2");
    }

    async click_cart()
    {
        await this.btncart.click();
    }

    async cal_price()
    {
        this.sum=0;
        const productprice=await this.page.$$("//div[@class='cart']/ul/li/div/div[2]/p");  //price of the product
        console.log("The number of the product "+productprice.length);
       this.len=productprice.length;
        for(let pc of productprice)
        {
            const value=await pc.textContent();
            const prices=await value.replace('$','');
            this.sum=this.sum + parseInt(prices);
            console.log(prices);
        }  
        console.log("Total price of the product "+this.sum);

       
    }

    async total_price()
    {
        
        const totp=await this.tot_price.textContent();
        const final_amount=totp.replace('$','');
        await expect(this.sum).toBe(parseInt(final_amount));
    }

    async delete_one_prod()
    {
            await this.del_one.click();
            await this.page.reload();           //reload the screen 
    }


     async select_byparameter(nameprice) 
    {
        const productResults = {}; 

        // 1. Correct loop: [product_name, expectedPrice]
        for (const [product_name, expectedPrice] of Object.entries(nameprice)) 
        {
            const productCard = this.page.locator('.cartSection').filter({ hasText: product_name }).first();
            //name of the cart 
            const actualName = await productCard.locator("h3").textContent();
           //price of the cart
            const actualPrice = await productCard.locator("p").nth(1).textContent();

            const cleanprice=await actualPrice.replace("MRP","").trim();
            productResults[actualName.trim()] = cleanprice;
        }

        // JSON.stringify can fail if the order is different; toEqual handles it better
        // if (JSON.stringify(productResults) === JSON.stringify(nameprice)) {
        //     console.log("Success: Shop prices match Cart prices!");
        // }
        
        await expect(productResults).toEqual(nameprice);
    }
    
    
}

module.exports={cartpage}