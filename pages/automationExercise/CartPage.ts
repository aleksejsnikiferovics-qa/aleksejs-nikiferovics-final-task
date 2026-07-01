import { test, expect, Locator, Page } from '@playwright/test';
import { ShopHomePage } from './ShopHomePage';
import { CheckoutPage } from './CheckoutPage';

export class CartPage extends ShopHomePage {
    readonly proceedToCheckoutButton: Locator;
    readonly productRows: Locator;
    readonly firstProductNameOnCart: Locator;
    readonly secondProductNameOnCart: Locator;
    readonly firstProductPriceOnCart: Locator;
    readonly secondProductPriceOnCart: Locator;
    readonly quantityFirstProduct: Locator;
    readonly quantitySecondProduct: Locator;
    readonly removeProduct: Locator;

    constructor(page: Page) {
        super(page);
        this.proceedToCheckoutButton = this.page.locator('.check_out');
        this.productRows = this.page.locator('tr[id^="product-"]')
        this.firstProductNameOnCart = page.locator('.cart_description').first()
        this.secondProductNameOnCart = page.locator('.cart_description').nth(1)
        this.firstProductPriceOnCart = page.locator('.cart_price').first()
        this.secondProductPriceOnCart = page.locator('.cart_price').nth(1)
        this.quantityFirstProduct = page.locator('.cart_quantity').first()
        this.quantitySecondProduct = page.locator('.cart_quantity').nth(1)
        this.removeProduct = page.locator('.fa-times').first()
    }

    async assertOnCartPage() {
    await expect(this.page.url()).toContain('view_cart')
    }

    async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
    }

    async assertTwoProductsOnCartPage() {
    await expect(this.productRows).toHaveCount(2);
    }

    async assertProductNamesOnCart() {
    await expect(this.firstProductNameOnCart).toContainText('Blue Top')
    await expect(this.secondProductNameOnCart).toContainText('Men Tshirt')
    }
    
    async assertProductPrices(){
    await expect(this.firstProductPriceOnCart).toContainText('Rs. 500')
    await expect(this.secondProductPriceOnCart).toContainText('Rs. 400')
    }

    async assertProductQuantities() {
    await expect(this.quantityFirstProduct).toContainText('1')
    await expect(this.quantitySecondProduct).toContainText('1')
    }

    async deleteProduct() {
    await this.removeProduct.click();
    }

    async assertAllDeleted() {
    await expect(this.productRows).not.toBeVisible(); 
    await expect(this.page.locator('b').getByText('Cart is empty!')).toHaveText('Cart is empty!')
    }
}

