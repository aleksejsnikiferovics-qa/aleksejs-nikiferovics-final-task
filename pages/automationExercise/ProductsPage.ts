import { test, expect, Locator, Page } from '@playwright/test';
import { ShopHomePage } from './ShopHomePage';

export class ProductsPage extends ShopHomePage {
    readonly firstProduct: Locator;
    readonly addToCartButton: Locator;
    readonly addedModal: Locator;
    readonly viewCartButton: Locator;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly eachProduct: Locator;
    readonly headerTwo: Locator;
    readonly addToCartSecond: Locator;
    readonly secondProduct: Locator;
    readonly continueShopping: Locator;
    readonly viewProductFirst: Locator;

    constructor(page: Page) {
        super(page);
        this.firstProduct = page.locator('.productinfo.text-center').first();
        this.addToCartButton = page.locator('a[data-product-id="1"]').first();
        this.addedModal = page.locator('.modal-content');
        this.viewCartButton = page.getByRole('link', { name: 'View Cart', exact: true });
        this.searchInput = page.getByPlaceholder('Search Product');
        this.searchButton = page.locator('#submit_search');
        this.eachProduct = page.locator('.productinfo p');
        this.headerTwo = page.locator('.text-center');
        this.secondProduct = page.locator('.productinfo.text-center').nth(1);
        this.addToCartSecond = page.locator('a[data-product-id="2"]').first();
        this.continueShopping = page.getByRole('button', {name: "Continue Shopping"})
        this.viewProductFirst = page.getByRole('link', {name: "View Product" }).first()
        }

    async assertOnProductsPage(){
    await expect(this.page.url()).toContain('products')
    }

    async addToCartFirstProduct() {
    await this.firstProduct.hover();
    await this.addToCartButton.click();  
    await expect(this.addedModal).toBeVisible();
    }

    async redirectToCartPage(){
    await this.viewCartButton.click();
    }

    async searchForAProduct(searchKeyword: string) {
    await this.searchInput.fill(searchKeyword);
    await this.searchButton.click();
    }

    async assertSearchedProductsHeaderText(){
    await expect(this.headerTwo).toHaveText('Searched Products')
    }

    async assertAtLeastOneProductReturned() {
    await expect(this.eachProduct.count()).toBeGreaterThan(0);
    }

    async assertSearchReturnKeyword() {
    const texts = await this.eachProduct.allTextContents();
    expect(texts.length).toBeGreaterThan(0);
    texts.forEach(text => expect(text.toLowerCase()).toContain('dress'));
    }

    async addToCartSecondProduct() {
    await this.continueShopping.click();
    await this.secondProduct.hover();
    await this.addToCartSecond.click();
    }

    async viewProduct() {
    await this.viewProductFirst.click();
    }

    async waitForProductsLoaded() {
    await this.page.waitForResponse(resp =>
        resp.url().includes('/api/productsList') && resp.status() === 200
    );

}

}

