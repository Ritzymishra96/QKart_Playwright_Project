const { BasePage } = require('./BasePage');

class RegisterPage extends BasePage {

    constructor(page) {
        super(page)

        this.registerBtn = page.getByRole('button', { name: 'Register' });

        this.userNameTF = page.getByPlaceholder('Enter Username');
        this.passwordTF = page.getByPlaceholder('Enter a password with minimum 6 characters');
        this.confirmPasswordTF = page.getByPlaceholder('Re-enter your password to confirm');

        this.registerNowBtn = page.getByRole('button', { name: 'Register Now' });
    }

    async register(userName, password, confirmPassword) {

        await this.click(this.registerBtn);

        await this.fill(this.userNameTF, userName);

        await this.fill(this.passwordTF, password);

        await this.fill(this.confirmPasswordTF, confirmPassword);

        await this.click(this.registerNowBtn);

    }
}

module.exports = { RegisterPage };