import { test, expect, Locator, Page } from '@playwright/test';
import { ShopHomePage } from './ShopHomePage';

export class CheckoutPage extends ShopHomePage {
    readonly addressFirst: Locator;
    readonly addressSecond: Locator;
    readonly placeOrderButton: Locator;
    readonly totalCheckout: Locator;

    constructor(page: Page) {
        super(page);
        this.addressFirst = page.locator('#address_delivery')
        this.addressSecond = page.locator('#address_delivery')
        this.placeOrderButton = page.getByRole('link', { name: "Place Order" })
        this.totalCheckout = page.locator('.cart_total_price').getByText('Rs. 900')
        }

    
   async assertOnCheckoutPage() {
    await expect(this.page.url()).toContain('checkout')
   }

   async assertAddressDetails() {
    await expect(this.addressFirst).toContainText('300 MiddleSt')
    await expect(this.addressSecond).toContainText('8th Ave N')
   }

   async placeOrder() {
    await this.placeOrderButton.click();
   }

    async assertTotalPrice() {
    await expect(this.totalCheckout).toHaveText('Rs. 900')
    }

}

