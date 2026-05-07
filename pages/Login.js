

class loginuser{

    constructor(page)
    {
        this.page =page;
        this.email_id= page.getByRole('textbox',{name:'email@example.com'});
        this.password1= page.getByRole('textbox',{name:'Passsword'});
        this.btnLogin=page.getByRole('button',{name:'Login'});
    }

    async gotourl()
    {
         await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }
    async loginUser1(email,password)
    {
        this.email_user=email;
        await this.email_id.pressSequentially(email,{delay : 150});
        await this.password1.pressSequentially(password,{delay :150});
       await this.btnLogin.click();
    }9                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                

}
module.exports={loginuser}