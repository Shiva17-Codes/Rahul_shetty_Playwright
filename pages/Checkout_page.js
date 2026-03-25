

class checkoutpage{

    constructor(page)
    {
        this.page=page;
        this.btncheckout=page.locator("//li/button[@class='btn btn-primary']");
        this.card_no=page.locator('//div[@class="field"]//input[@class="input txt text-validated"]');
        this.month=page.locator('//div[@class="row"]//select[1]');
        this.day1=page.locator('//div[@class="row"]//select[2]');
        this.cvvcode=page.locator('//div[@class="field small"]/input[@class="input txt"]');
        this.cardname=page.locator('//div[@class="field"]/input[@class="input txt"]');
        this.coupon=page.locator('input[name="coupon"]');
        this.btnapply=page.locator('button[class="btn btn-primary mt-1"]');
        this.search_country=page.getByPlaceholder('Select Country');
        this.btnorder=page.locator('a[class="btnn action__submit ng-star-inserted"]');
        
    }

    async click_checkout()
    {
       await this.btncheckout.click();
    }

    async enter_detail(cardno,cvvcode,card_name,coupon_apply,month1,day2 )
    {
        await this.card_no.clear();
        await this.card_no.pressSequentially(cardno,{delay :150});
        await this.cvvcode.pressSequentially(cvvcode,{delay :150});
        await this.month.selectOption(month1);
         await this.day1.selectOption(day2);
        await this.cardname.pressSequentially(card_name,{delay :150});
        await this.coupon.pressSequentially(coupon_apply,{delay :150});
        await this.btnapply.click();
        
    }
    async searchbox(coun_name)
    {
        await this.search_country.pressSequentially(coun_name,{delay :150});
        await this.page.waitForTimeout(3000);
        const search=await this.page.$$('//section[@class="ta-results list-group ng-star-inserted"]/button');
       // console.log(search.length);   count the list 
       for(const sl of search)
       {
            const c_name=await sl.textContent();
            console.log(c_name);
         if(" India" == c_name)
         {
            await sl.click();
            break;
         }
        }
    }

    async placeorder()
    {
            await this.btnorder.click();
    }


}
module.exports={checkoutpage}