import { test, expect, Locator, Page } from '@playwright/test';
import { ShopHomePage } from './ShopHomePage';

export class PaymentPage extends ShopHomePage {
    readonly nameOnCardField: Locator;
    readonly cardNumberField: Locator;
    readonly cvcCode: Locator;
    readonly expirationMonth: Locator;
    readonly expirationYear: Locator;
    readonly payAndConfirmButton: Locator;

    constructor(page: Page) {
        super(page);
        this.nameOnCardField = page.locator('input[name="name_on_card"]');
        this.cardNumberField = page.locator('input[name="card_number"]');
        this.cvcCode = page.locator('input[name="cvc"]');
        this.expirationMonth = page.locator('input[name="expiry_month"]');
        this.expirationYear = page.locator('input[name="expiry_year"]');
        this.payAndConfirmButton = page.getByRole('button', {name: 'Pay and Confirm Order'})
        }

    async assertOnPaymentPage() {
        await expect(this.page.url()).toContain('payment')
    }

    async fillPaymentInfo() {
    await this.nameOnCardField.fill('John DoeTest')
    await this.cardNumberField.fill('99123818238123818')
    await this.cvcCode.fill('311')
    await this.expirationMonth.fill('12')
    await this.expirationYear.fill('2029')
    await this.payAndConfirmButton.click();
    }


}

