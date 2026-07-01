import { test, expect, Locator, Page } from '@playwright/test';
import { ShopHomePage } from './ShopHomePage';

export class ProductDetailPage extends ShopHomePage {
    readonly productInfoFrame: Locator;
    readonly productCategory: Locator;
    readonly productPrice: Locator;
    readonly productAvailability: Locator;
    readonly productCondition: Locator;
    readonly productBrand: Locator;
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        super(page);
    this.productInfoFrame = page.locator('.product-information')
    this.productCategory = page.locator('p', { hasText: 'Category' });
    this.productPrice = page.locator('span', { hasText: 'Rs.' }).first();
    this.productAvailability = page.locator('p', { hasText: 'Availability:' });
    this.productCondition = page.locator('p', { hasText: 'Condition:' });
    this.productBrand = page.locator('p', { hasText: 'Brand:' });
    this.addToCartButton = page.locator('.btn-default.cart')
    
    }

    async assertOnProductDetailPage() {
        await expect(this.page.url()).toContain('product_details')
    }

    async assertProductCategory() {
    await expect(this.productCategory).toBeVisible();
    const text = await this.productCategory.textContent();
    expect(text?.replace('Category:', '').trim().length).toBeGreaterThan(0);
    }

    async assertProductPrice() {
    await expect(this.productPrice).toBeVisible();
    const text = await this.productPrice.textContent();
    expect(text?.replace('Rs.', '').trim().length).toBeGreaterThan(0);
    }

    async assertProductAvailability() {
    await expect(this.productAvailability).toBeVisible();
    const text = await this.productAvailability.textContent();
    expect(text?.replace('Availability:', '').trim().length).toBeGreaterThan(0);
    }

    async assertProductCondition() {
     await expect(this.productCondition).toBeVisible();
    const text = await this.productCondition.textContent();
    expect(text?.replace('Condition:', '').trim().length).toBeGreaterThan(0);
    }

    async assertProductBrand() {
     await expect(this.productBrand).toBeVisible();
    const text = await this.productBrand.textContent();
    expect(text?.replace('Brand:', '').trim().length).toBeGreaterThan(0);
    }

    async addToCartButtonPresent() {
    await expect(this.addToCartButton).toBeVisible();
    }


}

