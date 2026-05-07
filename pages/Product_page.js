const { expect } = require("@playwright/test");

class product_page{
                                                                                        
    constructor(page)
    {
        this.page=page;
        this.mul_prod=["//div[@class='container']//div[1]//div[1]//div[1]//button[2]","//div[@class='row']//div[2]//div[1]//div[1]//button[2]"];
        this.toast_verfiy=page.locator('div[aria-label="Product Added To Cart"]');

        
    }

    async select_multiple_product()
    {
        for(let products of this.mul_prod)
                {
                    await this.page.locator(products).click();
                    await this.page.waitForTimeout(1000);
                    await expect(this.toast_verfiy).toBeVisible();  
                }
    }


      async select_all_product()
    {
        const all_prod=await this.page.$$('//div[@class="row"]/div//button[2]');
        for(let products of all_prod)
                {
                    await products.click();
                    await this.page.waitForTimeout(1000);
                    await expect(this.toast_verfiy).toBeVisible();  
                }
    }


    async select_prod_byparameter(nameprice)
    {
        const productResults = {}; // This will store { "Product Name": "Price" }

    for (const productName of nameprice) {
        // Locate the specific card containing the product name
        const productCard = await this.page.locator(".card-body").filter({ hasText: productName });

        //  Extract the actual name and price from the card to verify them
        const actualName = await productCard.locator("h5 b").textContent();
        const price = await productCard.locator(".text-muted").textContent();

        // Click the 'Add to Cart' button within this specific card
        await productCard.locator("button:has-text(' Add To Cart')").click();

        // Save both to your results object
        // We trim() to remove extra spaces or newlines
        productResults[actualName.trim()] = price.trim();

        // Wait for the toast to ensure the action is registered
        await expect(this.toast_verfiy).toBeVisible();
    }

        console.log(productResults);
        return productResults; // Returns an object like { "ZARA COAT 3": "$ 31500", ... }
    }


}
module.exports={product_page}