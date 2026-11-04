const { BasePage } = require('./BasePage');

class CheckoutPage extends BasePage {

    constructor(page) {
        super(page);

        this.checkoutBtn = page.getByRole('button', { name: 'Checkout' });
        this.addAddressBtn = page.getByRole('button', { name: 'Add new address' });
        this.addressInput = page.getByPlaceholder('Enter your complete address');
        this.saveAddressBtn = page.getByRole('button', { name: 'Add', exact: true });
        this.addressOption = page.getByRole('radio').first();
        this.placeOrderBtn = page.getByRole('button', { name: /place order/i });
        this.orderConfirmation = page.getByText(/Yay! It's ordered/i);
    }

    async checkout(address) {
        await this.click(this.checkoutBtn);

        if (await this.addAddressBtn.isVisible()) {
            await this.click(this.addAddressBtn);
            await this.fill(this.addressInput, address);
            await this.click(this.saveAddressBtn);
        }

        await this.addressOption.waitFor({ state: 'visible' });
        if (!(await this.addressOption.isChecked())) {
            await this.click(this.addressOption);
        }

        await this.click(this.placeOrderBtn);
        await this.waitForVisible(this.orderConfirmation);
        const confirmationText = await this.getText(this.orderConfirmation);
        return confirmationText.trim();

    }

}
module.exports = { CheckoutPage };