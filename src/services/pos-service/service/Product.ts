import { AuthStore } from "../store/AuthStore"
import { Filter } from "../util/Filter"
import { Product as ProductModel, UpsertProductDTO } from "../model/Product"

export class Product {
    constructor(
        private readonly host: string,
        private readonly authStore: AuthStore,
        private readonly serviceUri = `${host}/api/products`
    ) { }

    async getProducts(): Promise<ProductModel[]> {
        const init = { headers: { 'Authorization': `Bearer ${this.authStore.session.token}` } }
        return fetch(this.serviceUri, init).then(r => r.json())
    }

    async getProduct(id: number): Promise<ProductModel> {
        const init = { headers: { 'Authorization': `Bearer ${this.authStore.session.token}` } }
        const response = await fetch(`${this.serviceUri}/${id}`, init)
        const jsonResponse = await response.json()
        if (!response.ok) throw jsonResponse
        return jsonResponse
    }

    async getProductsByCategory(categoryId: number, filter?: Filter<ProductModel>): Promise<ProductModel[]> {
        const init = { headers: { 'Authorization': `Bearer ${this.authStore.session.token}` } }
        const requestUrl = `${this.serviceUri}/categories/${categoryId}?${filter ? filter.build() : ''}`
        return fetch(requestUrl, init).then(r => r.json())
    }

    async findProduct(productId: number): Promise<ProductModel> {
        const init = {
            headers: {
                'Authorization': `Bearer ${this.authStore.session.token}`
            }
        }
        return fetch(`${this.serviceUri}/${productId}`, init)
            .then(r => r.json())
    }

    async createProduct(dto: UpsertProductDTO): Promise<ProductModel> {
        const _dto = {
            ...dto,
            available_days: dto.available_days.toString(),
            available_from: dto.available_from.toISOString(),
            available_until: dto.available_until.toISOString(),
        }
        const init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.authStore.session.token}`
            },
            body: JSON.stringify(_dto)
        }
        const response = await fetch(this.serviceUri, init)
        const jsonResponse = await response.json()
        if (!response.ok) throw jsonResponse
        return jsonResponse
    }

    async updateProduct(id: number, dto: UpsertProductDTO): Promise<ProductModel> {
        const _dto = {
            ...dto,
            available_days: dto.available_days.toString(),
            available_from: dto.available_from.toISOString(),
            available_until: dto.available_until.toISOString(),
        }
        const init = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.authStore.session.token}`
            },
            body: JSON.stringify(_dto)
        }
        const response = await fetch(`${this.serviceUri}/${id}`, init)
        const jsonResponse = await response.json()
        if (!response.ok) throw jsonResponse
        return jsonResponse
    }


    async deleteProduct(id: number) {
        const init = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${this.authStore.session.token}`
            }
        }
        return fetch(`${this.serviceUri}/${id}`, init)
            .then(r => r.json())
    }

    async addProductCategory(id: number, categoryId: number) {
        const init = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.authStore.session.token}`
            }
        }
        return fetch(`${this.serviceUri}/${id}/categories/${categoryId}`, init)
            .then(r => r.json())
    }

    async deleteProductCategory(id: number, categoryId: number) {
        const init = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${this.authStore.session.token}`
            }
        }
        return fetch(`${this.serviceUri}/${id}/categories/${categoryId}`, init)
            .then(r => r.json())
    }

}
