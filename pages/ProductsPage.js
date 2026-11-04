const { BasePage } = require('./BasePage');
const { expect } = require('@playwright/test');

class ProductsPage extends BasePage {

    constructor(page) {
        super(page);

        this.productsCard = page.locator('.card');
        this.searchBox = page.getByPlaceholder('Search for items/categories').first();
        this.cartTotal = page.locator("[data-testid='cart-total']");
        this.cartCard = page.locator('.cart');
        this.addOutBtn = this.cartCard.getByTestId('AddOutlinedIcon').locator('..');
        this.cartQuantity = this.cartCard.getByTestId('item-qty');
    }

    async searchProduct(productName) {
        await this.fill(this.searchBox, productName);
        return this.productsCard.filter({ hasText: productName });
    }

    async searchProductNoMatch(productName) {
        await this.fill(this.searchBox, productName);
        return this.page.getByText(/no products found/i);
    }

    async addToCart(productName, quantity = 1) {
        if (!Number.isInteger(quantity) || quantity < 1) {
            throw new RangeError('Quantity must be a positive integer');
        }

        const productCard = this.productsCard.filter({ hasText: productName });
        const priceText = await this.getText(productCard.locator('p').nth(1));
        await this.click(productCard.getByRole('button', { name: /add to cart/i }));
        await this.waitForVisible(this.cartTotal);
        await this.waitForVisible(this.cartCard.getByText(productName, { exact: true }));

        for (let currentQuantity = 1; currentQuantity < quantity; currentQuantity++) {
            await this.click(this.addOutBtn);
            await expect(this.cartQuantity).toHaveText(String(currentQuantity + 1));
        }

        return priceText.trim();
    }

}

module.exports = { ProductsPage };