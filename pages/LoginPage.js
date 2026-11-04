
const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {

    constructor(page) {
        super(page);

        this.loginBtn = page.getByRole('button', {name: 'Login'});
        this.username = page.getByPlaceholder('Enter Username');
        this.password = page.getByPlaceholder('Enter a password');

        this.QkartloginButton = page.getByRole('button', {
            name: 'Login to QKart'
        });
    }

    async login(username, password) {

        await this.click(this.loginBtn);

        await this.fill(this.username, username);

        await this.fill(this.password, password);

        await this.click(this.QkartloginButton);

    }

}

module.exports = { LoginPage };
