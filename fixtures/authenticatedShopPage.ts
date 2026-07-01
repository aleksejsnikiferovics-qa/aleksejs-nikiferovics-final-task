import {test as base, Page} from '@playwright/test';
import { ShopHomePage } from '../pages/automationExercise/ShopHomePage';
import { SignUpLoginPage } from '../pages/automationExercise/SignUpLoginPage';
import { AccountCreationPage } from '../pages/automationExercise/AccountCreationPage';
import { generateUser } from '../utils/userGeneration';
 
export type AuthenticatedShopPage = {
    testUser: ReturnType<typeof generateUser>;
    authenticatedShopPage: Page;
};
 
export const test = base.extend<AuthenticatedShopPage>({
    testUser: async ({}, use) => {
        await use(generateUser());
    },
 
    authenticatedShopPage: [
        async ({ browser, testUser }, use) => {
            const page: Page = await browser.newPage();
            const shopHomePage = new ShopHomePage(page);
            const signupLoginPage = new SignUpLoginPage(page);
            const accountCreationPage = new AccountCreationPage(page);
 
            await shopHomePage.goto();
            await shopHomePage.gotoLogin();
            await shopHomePage.assertOnLoginPage();
            await signupLoginPage.registerNewUser(testUser.username, testUser.email);
 
            await accountCreationPage.assertOnRegisterPage();
            await accountCreationPage.fillInAccountInfo(testUser.password);
            await accountCreationPage.fillinAddressInfo();
 
            await accountCreationPage.assertAccountCreated();
            await shopHomePage.assertOnHomePage();
 
            await use(page);
 
        },
        { timeout: 90_000 },
    ],
});