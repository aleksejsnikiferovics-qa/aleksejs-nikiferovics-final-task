import { test, expect, Locator, Page } from '@playwright/test';
import { ShopHomePage } from './ShopHomePage';

export class PaymentConfirmationPage extends ShopHomePage {
   

    constructor(page: Page) {
        super(page);
     
        }

    async assertOnPaymentConfirmationPage(){
        await expect(this.page.url()).toContain('payment_done')
    }

    async assertOrderPlaced() {
    await expect(this.page.locator('body')).toContainText('Order Placed');
    }
}

