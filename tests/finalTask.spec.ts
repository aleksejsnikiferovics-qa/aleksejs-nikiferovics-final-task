import {
 epic, feature, story, severity, label, description, Severity
} from 'allure-js-commons';

import { expect } from '@playwright/test';
import { test } from '../fixtures/authenticatedShopPage';
import { ShopHomePage } from '../pages/automationExercise/ShopHomePage';
import { SignUpLoginPage } from '../pages/automationExercise/SignUpLoginPage'
import { generateUser } from '../utils/userGeneration';
import { AccountCreationPage } from  '../pages/automationExercise/AccountCreationPage'
import { ProductsPage } from '../pages/automationExercise/ProductsPage';
import { CartPage } from '../pages/automationExercise/CartPage';
import { CheckoutPage } from '../pages/automationExercise/CheckoutPage';
import { PaymentPage } from '../pages/automationExercise/PaymentPage';
import { PaymentConfirmationPage } from '../pages/automationExercise/PaymentConfirmationPage';
import { ProductDetailPage } from '../pages/automationExercise/ProductDetailPage';
import { ShopApiClient } from '../utils/shopApiClient';
import { AuthenticatedShopPage } from '../fixtures/authenticatedShopPage';


test.describe('All Test Cases', () => {
test.beforeEach(async ({ authenticatedShopPage }) => {
  });

test.afterEach(async ({ request, testUser }) => {
    const client = new ShopApiClient(request);

    await client.deleteAccount(
        testUser.email,
        testUser.password
    );
});

  test('TC-001', async ({ authenticatedShopPage, testUser }) => {
    await epic('Shoopping'),
    await feature('Checkout'),
    await story('Full E2E flow'),
    await severity(Severity.CRITICAL)

    const shopHomePage = new ShopHomePage(authenticatedShopPage);
    const signupLoginPage = new SignUpLoginPage(authenticatedShopPage);
    const accountCreationPage = new AccountCreationPage(authenticatedShopPage);
    const productsPage = new ProductsPage(authenticatedShopPage);
    const cartPage = new CartPage(authenticatedShopPage);
    const checkoutPage = new CheckoutPage(authenticatedShopPage);
    const paymentPage = new PaymentPage(authenticatedShopPage);
    const paymentConfirmationPage = new PaymentConfirmationPage(authenticatedShopPage);

    await shopHomePage.assertLoggedIn(testUser.username);

    await shopHomePage.gotoProducts();
    await productsPage.assertOnProductsPage();
    await productsPage.addToCartFirstProduct();

    await productsPage.redirectToCartPage();
    await cartPage.assertOnCartPage();
    await cartPage.proceedToCheckout();

    await checkoutPage.assertOnCheckoutPage();
    await checkoutPage.assertAddressDetails();
    await checkoutPage.placeOrder();

    await paymentPage.assertOnPaymentPage();
    await paymentPage.fillPaymentInfo();

    await paymentConfirmationPage.assertOnPaymentConfirmationPage();
    await paymentConfirmationPage.assertOrderPlaced();
  });

 test.fail('TC-002', async ({ authenticatedShopPage, testUser }) => {
    await epic('Shoopping'),
    await feature('Product Search'),
    await story('Keyword search'),
    await severity(Severity.NORMAL)

  const shopHomePage = new ShopHomePage(authenticatedShopPage);
  const productsPage = new ProductsPage(authenticatedShopPage);

  await shopHomePage.gotoProducts();
  await productsPage.assertOnProductsPage();

  await productsPage.assertSearchedProductsHeaderText();
  await productsPage.searchForAProduct('dress');
  await productsPage.assertSearchReturnKeyword();
 });

 test('TC-003', async ({ authenticatedShopPage, testUser }) => {
    await epic('Shoopping'),
    await feature('Cart'),
    await story('Add multiple products'),
    await severity(Severity.NORMAL)

  const shopHomePage = new ShopHomePage(authenticatedShopPage);
  const productsPage = new ProductsPage(authenticatedShopPage);
  const cartPage = new CartPage(authenticatedShopPage);
  const checkoutPage = new CheckoutPage(authenticatedShopPage);

  await shopHomePage.gotoProducts();
  await productsPage.assertOnProductsPage();
  

  await productsPage.addToCartFirstProduct();
  await productsPage.addToCartSecondProduct();
  await productsPage.redirectToCartPage();

  await cartPage.assertOnCartPage();
  await cartPage.assertTwoProductsOnCartPage();
  await cartPage.assertProductNamesOnCart();
  await cartPage.assertProductPrices();
  await cartPage.assertProductQuantities();
  await cartPage.proceedToCheckout();
  await checkoutPage.assertOnCheckoutPage();
  await checkoutPage.assertTotalPrice();

 });


 test('TC-004', async ({ authenticatedShopPage, testUser }) => {
    await epic('Shoopping'),
    await feature('Cart'),
    await story('Remove product'),
    await severity(Severity.NORMAL)

  const shopHomePage = new ShopHomePage(authenticatedShopPage);
  const productsPage = new ProductsPage(authenticatedShopPage);
  const cartPage = new CartPage(authenticatedShopPage);

  await shopHomePage.gotoProducts();
  await productsPage.assertOnProductsPage();

  await productsPage.addToCartFirstProduct();
  await productsPage.redirectToCartPage();

  await cartPage.assertOnCartPage();
  await cartPage.deleteProduct();
  await cartPage.assertAllDeleted();
  await cartPage.assertOnCartPage();

 });

 test('TC-005', async ({ authenticatedShopPage, testUser }) => {
    await epic('Shoopping'),
    await feature('Product Detail'),
    await story('View product'),
    await severity(Severity.MINOR)

  const shopHomePage = new ShopHomePage(authenticatedShopPage);
  const productsPage = new ProductsPage(authenticatedShopPage);
  const productDetailPage = new ProductDetailPage(authenticatedShopPage);

  await shopHomePage.gotoProducts();
  await productsPage.assertOnProductsPage();
  await productsPage.viewProduct();

  await productDetailPage.assertOnProductDetailPage();
  await productDetailPage.assertProductCategory();
  await productDetailPage.assertProductPrice();
  await productDetailPage.assertProductAvailability();
  await productDetailPage.assertProductCondition();
  await productDetailPage.assertProductBrand();
  await productDetailPage.addToCartButtonPresent();

 });

 test('TC-006', async ({ request }) => {
    await epic('API'),
    await feature('Products API'),
    await story('List all products'),
    await severity(Severity.CRITICAL)

  const client = new ShopApiClient(request);
 
    const { responseCode, products } = await client.getProducts();
    expect(responseCode).toBe(200);
 
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
 
    for (const product of products) {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('brand');
      expect(product).toHaveProperty('category');
    }
 
    const ids = products.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });


  test.fail('TC-007', async ({ request }) => {
    await epic('API'),
    await feature('Products API'),
    await story('Search Products'),
    await severity(Severity.NORMAL)

  const client = new ShopApiClient(request);
    const keyword = 'top';
    const { responseCode, products } = await client.searchProducts(keyword);
 
    expect(responseCode).toBe(200);
 
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
 
    for (const product of products) {
      expect(product.name.toLowerCase()).toContain(keyword.toLowerCase());
    }
  });


  test('TC-008', async ({ request }) => {
    const client = new ShopApiClient(request);
 
    const { responseCode, message } = await client.searchProducts();

    expect(responseCode).toBe(400);
 
    expect(message).toBeTruthy();
    expect(typeof message).toBe('string');
  });


 test('TC-009', async ({ authenticatedShopPage, testUser }) => {
    await epic('Marketing'),
    await feature('Newsletter'),
    await story('Footer subscription'),
    await severity(Severity.MINOR)

  const user = generateUser();
  const shopHomePage = new ShopHomePage(authenticatedShopPage);

  await shopHomePage.subscribeEmailFooter(user.email);
 });

  test.only('TC-010', async ({ authenticatedShopPage, testUser }) => {
    await epic('Auth'),
    await feature('Session'),
    await story('Redirect logged-in user'),
    await severity(Severity.MINOR)

    const shopHomePage = new ShopHomePage(authenticatedShopPage);

    await authenticatedShopPage.goto('/login');
    await expect(authenticatedShopPage).toHaveURL('/');
    await shopHomePage.assertLoggedIn(testUser.username);

 });


});


