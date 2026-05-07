class registration{

    constructor(page)
    {
        this.page=page;
        this.reg_link=page.getByText("Register here");
        this.firstname=page.getByPlaceholder("First Name");
        this.lastname=page.getByPlaceholder("Last Name");
        this.email_reg=page.getByRole('textbox',{name:'email@example.com'});
        this.mobile=page.getByRole('textbox',{name:'enter your number'});
        this.occupation=page.locator('select[formcontrolname="occupation"]');
        this.gender= page.getByRole('radio',{name:'Male'}).nth(0);
        this.password_reg=page.getByRole('textbox',{name:'Passsword'});
        this.confirm_pass=page.getByPlaceholder("Confirm Passsword");
        this.age=page.locator("input[type='checkbox']");
        this.btnreg=page.getByRole('button',{name:'Register'});

        this.login_link=page.locator('a[class="text-reset"]');
    }

    async click_reg_link()
    {
        await this.reg_link.click();
    }

    async user_reg(f_name,l_name,email,mobile_no,password_reg,confirm_pass)
    {
        await this.firstname.pressSequentially(f_name,{delay : 150});
        await this.lastname.pressSequentially(l_name,{delay : 150});
        await this.email_reg.pressSequentially(email,{delay : 150});
        await this.mobile.pressSequentially(mobile_no,{delay : 150});
        await this.occupation.selectOption('Student');
        await this.gender.check();
        await this.password_reg.pressSequentially(password_reg,{delay : 150});
        await this.confirm_pass.pressSequentially(confirm_pass,{delay : 150});
        await this.age.check();
       // await this.btnreg.click();
    }
    async click_login_link()
    {
        await this.login_link.click();
    }
}
module.exports={registration}