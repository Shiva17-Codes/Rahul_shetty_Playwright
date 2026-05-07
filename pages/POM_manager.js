const {registration}=require('./Registration_page')
const {loginuser}=require('./Login')
const {product_page}=require('./Product_page')
const {cartpage}=require('./Cart_page')
const {checkoutpage}=require('./Checkout_page')
const {download_product}=require('./Download_page')
const {orderpage}=require('./Order_page')


class POMmanager
{
    constructor(page)
    {
        this.page=page;
        this.registration_pom=new registration(this.page);
        this.loginuser_pom=new loginuser(this.page);
        this.product_page_pom=new product_page(this.page);
        this.cartpage_pom=new cartpage(this.page);
        this.checkoutpage_pom=new checkoutpage(this.page);
        this.download_product_pom=new download_product(this.page);
        this.orderpage_pom=new orderpage(this.page);
    }

    getregistration()
    {
        return this.registration_pom;
    }
     getlogin()
    {
        return this.loginuser_pom;
    }
     getproduct()
    {
        return this.product_page_pom;
    }
     getcart()
    {
        return this.cartpage_pom;
    }
     getcheckout()
    {
        return this.checkoutpage_pom;
    }
     getdownload()
    {
        return this.download_product_pom;
    }
    getorder()
    {
        return this.orderpage_pom;
    }

}
module.exports={POMmanager}