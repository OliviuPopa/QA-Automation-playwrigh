const { SauceDemoBasePage } = require('./base.page');

exports.SauceDemoLoginPage = class SauceDemoLoginPage extends SauceDemoBasePage {

    constructor(page){
        super(page);

        //locators
        this.userNameField = page.getByPlaceholder('Username');
        this.passWordField = page.getByPlaceholder('Password');
        this.loginBtn = page.getByRole('submit');
    }

    async logIn(username, password){
        await this.page.fill(this.userNameField, username);
        await this.page.fill(this.passWordField, password);
        await this.page.click(this.loginBtn);
    }

}