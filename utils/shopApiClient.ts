import { APIRequestContext } from '@playwright/test';

export interface ProductCategory {
  usertype: { id: number; usertype: string };
  category: string;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  brand: string;
  category: ProductCategory;
}

export interface ProductsListResponse {
  responseCode: number;
  products: Product[];
}

export interface AccountActionResponse {
  responseCode: number;
  message: string;
}

export class ShopApiClient {
  private readonly request: APIRequestContext;
  private readonly baseUrl: string;

  constructor(
    request: APIRequestContext,
    baseUrl: string = 'https://automationexercise.com/api'
  ) {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  async getProducts() {
    const response = await this.request.get(`${this.baseUrl}/productsList`);
    return response.json();
  }

  async searchProducts(keyword?: string) {
    const response = await this.request.post(`${this.baseUrl}/searchProduct`, {
    form: keyword !== undefined ? { search_product: keyword } : {},
    });
    return response.json();
  }

  async deleteAccount(email: string, password: string) {
    const response = await this.request.delete(`${this.baseUrl}/deleteAccount`, {
      form: { email, password },
    });
    return response.json();
  }

}