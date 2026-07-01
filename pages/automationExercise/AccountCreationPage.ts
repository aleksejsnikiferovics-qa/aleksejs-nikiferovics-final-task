import { test, expect, Locator, Page } from '@playwright/test';
import { ShopHomePage } from './ShopHomePage';

export class AccountCreationPage extends ShopHomePage {
    readonly passwordInput: Locator;
    readonly daySelect: Locator;
    readonly monthSelect: Locator;
    readonly yearSelect: Locator;
    readonly checkBoxNewsLetter: Locator;
    readonly checkBoxSpecialOffers: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly companyInput: Locator;
    readonly addressInput: Locator;
    readonly address2Input: Locator;
    readonly countrySelect: Locator;
    readonly stateInput: Locator;
    readonly cityInput: Locator;
    readonly zipcodeInput: Locator;
    readonly mobileNumberInput: Locator;
    readonly createAccountButton: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        super(page);
        this.passwordInput = page.getByLabel('password')
        this.daySelect = page.locator('[data-qa="days"]');
        this.monthSelect = page.locator('[data-qa="months"]');
        this.yearSelect = page.locator('[data-qa="years"]');
        this.checkBoxNewsLetter = page.getByRole('checkbox', {name: 'newsletter'})
        this.checkBoxSpecialOffers = page.getByRole('checkbox', {name: 'optin'})
        this.firstNameInput = page.locator('[data-qa="first_name"]');
        this.lastNameInput = page.locator('[data-qa="last_name"]');
        this.companyInput = page.locator('[data-qa="company"]');
        this.addressInput = page.locator('[data-qa="address"]');
        this.address2Input = page.locator('[data-qa="address2"]');
        this.countrySelect = page.locator('[data-qa="country"]');
        this.stateInput = page.locator('[data-qa="state"]');
        this.cityInput = page.locator('[data-qa="city"]');
        this.zipcodeInput = page.locator('[data-qa="zipcode"]');
        this.mobileNumberInput = page.locator('[data-qa="mobile_number"]');
        this.createAccountButton = page.getByRole('button', { name:'Create Account' })
        this.continueButton = page.locator('[data-qa="continue-button"]');
        }

    async assertOnRegisterPage() {
    await expect(this.page.url()).toContain('signup')
        }

    async fillInAccountInfo(password: string){
    await this.selectRandomGender();
    await this.passwordInput.fill(password)
    await this.selectRandomDay();
    await this.selectRandomMonth();
    await this.selectRandomYear();
    await this.checkBoxNewsLetter.check();
    await this.checkBoxNewsLetter.check()
    }

    async selectRandomGender() {
        const radios = this.page.locator('.radio');
        const index = Math.random() < 0.5 ? 0 : 1;
        await radios.nth(index).click();
    }

    async selectRandomDay() {
    const day = Math.floor(Math.random() * 31) + 1;
    await this.daySelect.click();
    await this.daySelect.selectOption(String(day));
    }

    async selectRandomMonth() {
    const month = Math.floor(Math.random() * 12) + 1;
    await this.monthSelect.click();
    await this.monthSelect.selectOption(String(month));
}

async selectRandomYear() {
    const year = Math.floor(Math.random() * (2021 - 1900 + 1)) + 1900;
    await this.yearSelect.click();
    await this.yearSelect.selectOption(String(year));
}

async fillinAddressInfo() {
await this.firstNameInput.fill('John');
await this.lastNameInput.fill('DoeTest')
await this.companyInput.fill('TestdevlabXoriantGroup')
await this.addressInput.fill('300 MiddleSt')
await this.address2Input.fill('8th Ave N')
await this.selectRandomCountry();
await this.stateInput.fill('Washington')
await this.cityInput.fill('Seattle')
await this.zipcodeInput.fill('US-9811092')
await this.mobileNumberInput.fill('12391293193912')
}

async selectRandomCountry() {
    const countries = [
        'India',
        'United States',
        'Canada',
        'Australia',
        'Israel',
        'New Zealand',
        'Singapore'
    ];
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    await this.countrySelect.click();
    await this.countrySelect.selectOption(randomCountry);
}

async assertAccountCreated(){
await this.createAccountButton.click();
await expect(this.page.locator('body')).toContainText('Account Created');
await this.continueButton.click();
}

}