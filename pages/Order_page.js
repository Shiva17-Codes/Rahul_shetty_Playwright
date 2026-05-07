class orderpage{
    constructor(page)
    {
        this.page=page;
        this.prod_order=page.locator('button[routerlink="/dashboard/myorders"]');
    }
    async orderpage()
    {
        this.prod_order.click();
    }

}
module.exports={orderpage}