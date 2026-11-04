
class BasePage {

    constructor(page) {
        this.page = page;
    }

    // Navigate to a URL
    async navigateTo(url) {
        await this.page.goto(url);
    }

    // Click an element
    async click(locator) {
        await locator.click();
    }

    // Enter text
    async fill(locator, value) {
        await locator.fill(value);
    }

    // Get text from an element
    async getText(locator) {
        return await locator.textContent();
    }

    // Verify element is visible
    async isVisible(locator) {
        return await locator.isVisible();
    }

    // Get element count
    async getCount(locator) {
        return await locator.count();
    }

    // Select dropdown option
    async selectOption(locator, value) {
        await locator.selectOption(value);
    }

    // Wait for element to be visible
    async waitForVisible(locator) {
        await locator.waitFor({
            state: 'visible'
        });
    }

}

module.exports = { BasePage };
