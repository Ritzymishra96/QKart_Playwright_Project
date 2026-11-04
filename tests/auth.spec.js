const { test, expect } = require('../fixtures/test');
const dataset = require('../utils/TestData.json');
const username = process.env.QKART_USERNAME;
const password = process.env.QKART_PASSWORD;
const registrationPassword = process.env.QKART_TEST_PASSWORD || 'TestPassword123!';
const incorrectPassword = process.env.QKART_INCORRECT_PASSWORD || 'IncorrectPassword123!';

async function registerAndLogin(page, registerPage, loginPage) {
    const username = `testuser${Date.now()}${Math.random().toString(36).slice(2, 8)}@gmail.com`;

    await registerPage.register(username, registrationPassword, registrationPassword);
    await expect(page.getByRole('alert')).toHaveText(/registered successfully/i);

    await page.goto('/');
    await loginPage.login(username, registrationPassword);
}

test('Register a new customer', async ({ page, registerPage }) => {
    const regUsername = `testuser${Date.now()}${Math.random().toString(36).slice(2, 8)}@gmail.com`;

    await page.goto('/');
    await registerPage.register(regUsername, registrationPassword, registrationPassword);

    await expect(page.getByRole('alert')).toHaveText(/registered successfully/i);
});

test('Login with valid credentials', async ({ page, loginPage }) => {
    test.skip(!username || !password, 'Set QKART_USERNAME and QKART_PASSWORD to run this test');

    await page.goto('/');
    await loginPage.login(username, password);

    await expect(page.getByRole('button', { name: /logout/i })).toBeVisible();
});

test('Reject invalid login credentials', async ({ page, loginPage }) => {
    test.skip(!username || !password, 'Set QKART_USERNAME and QKART_PASSWORD to run this test');

    await page.goto('/');
    await loginPage.login(username, incorrectPassword);

    await expect(page.getByText(/password is incorrect/i)).toBeVisible();
});

test('Load catalog and search for a product', async ({ page, loginPage, productsPage }) => {
    test.skip(!username || !password, 'Set QKART_USERNAME and QKART_PASSWORD to run this test');

    await page.goto('/');
    await loginPage.login(username, password);

    const product = await productsPage.searchProduct(dataset.Product);
    await expect(product).toBeVisible();
});

test('Show no products found for an unknown product', async ({ page, loginPage, productsPage }) => {
    test.skip(!username || !password, 'Set QKART_USERNAME and QKART_PASSWORD to run this test');

    await page.goto('/');
    await loginPage.login(username, password);

    const noProductsMessage = await productsPage.searchProductNoMatch('nonexistent-product');
    await expect(noProductsMessage).toBeVisible();
});

test('Add a product to the cart and verify its total', async ({
    page,
    loginPage,
    registerPage,
    productsPage
}) => {
    await page.goto('/');
    await registerAndLogin(page, registerPage, loginPage);

    const quantity = 5;
    const productPrice = await productsPage.addToCart(dataset.Product, quantity);
    const expectedTotal = `$${Number(productPrice.replace('$', '')) * quantity}`;

    await expect(productsPage.cartQuantity).toHaveText(String(quantity));
    await expect(productsPage.cartTotal).toHaveText(expectedTotal);
});

test('Perform checkout and verify order confirmation', async ({
    page,
    loginPage,
    registerPage,
    productsPage,
    checkoutPage
}) => {
    await page.goto('/');
    await registerAndLogin(page, registerPage, loginPage);
    await productsPage.addToCart(dataset.Product, 2);

    const confirmationText = await checkoutPage.checkout('123 Main St, New York, USA');
    expect(confirmationText).toContain("Yay! It's ordered");
});
