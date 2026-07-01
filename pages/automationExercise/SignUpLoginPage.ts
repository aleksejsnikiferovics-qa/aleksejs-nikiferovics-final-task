import { test, expect, Locator, Page } from '@playwright/test';
import { ShopHomePage } from './ShopHomePage';

export class SignUpLoginPage extends ShopHomePage {
    readonly usernameInput: Locator;
    readonly emailInput: Locator;
    readonly signUpButton: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.getByPlaceholder('Name')
        this.emailInput = page.locator('[data-qa="signup-email"]');
        this.signUpButton = page.getByRole('button', { name: 'Signup'})
        }

    
    async registerNewUser(username: string, email: string){
    await this.usernameInput.fill(username)
    await this.emailInput.fill(email)
    await this.signUpButton.click()
    }

}

