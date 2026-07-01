import { test, expect, Locator, Page } from '@playwright/test';
import { generateUser } from '../../utils/userGeneration';

export class ShopHomePage {
    readonly signUpLoginNavLink: Locator;
    readonly cookieConsent: Locator;
    readonly productsPageNavLink: Locator;
    readonly footerSubscription: Locator;
    readonly sendSubscriptionButton: Locator;
    readonly successEmailMessage: Locator;

    constructor (readonly page: Page){
        this.signUpLoginNavLink = page.getByRole('link', { name: 'Signup / Login' });
        this.cookieConsent = page.locator('.fc-button-label', { hasText: 'Consent' });
        this.productsPageNavLink = page.getByRole('link', { name: ' Products' });
        this.footerSubscription = page.getByPlaceholder('Your email address');
        this.sendSubscriptionButton = page.locator('#subscribe');
        this.successEmailMessage = page.locator('#footer .alert-success');
    }

    async gotoNoCookies() {
        await this.page.goto('/');
    }

    async assertOnHomePage() {
        await expect(this.page.url()).toBe('https://automationexercise.com/');
    }

    async goto() {
        await this.page.goto('/');
        await this.cookieConsent.click()
    }

    async gotoLogin(){
        await this.signUpLoginNavLink.click();
    }

    async assertOnLoginPage() {
        await expect(this.page.url()).toContain('login')
    }

    async assertLoggedIn(username: string) {
    await expect(this.page.locator('#header')).toContainText(`Logged in as ${username}`);
    }

    async gotoProducts() {
        await this.productsPageNavLink.click();
    }

    async subscribeEmailFooter(email: string) {
        await this.footerSubscription.fill(email);
        await this.sendSubscriptionButton.click();
        await expect(this.successEmailMessage).toContainText('You have been successfully subscribed!');
        await expect(this.footerSubscription).toBeEmpty();
    }

}
