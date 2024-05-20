import { AuthStore } from "../store/AuthStore"
import { Category as CategoryModel } from "../model/Category"

export class Category {

    constructor(
        private readonly host: string,
        private readonly authStore: AuthStore,
        private readonly serviceUri = `${host}/api/categories`
    ) { }

    async getCategories(): Promise<CategoryModel[]> {
        const init = {
            headers: { 'Authorization': `Bearer ${this.authStore.session.token}` }
        }
        return fetch(this.serviceUri, init).then(r => r.json())
    }

    async getCategory(categoryId: number): Promise<CategoryModel[]> {
        const init = {
            headers: { 'Authorization': `Bearer ${this.authStore.session.token}` }
        }
        const response = await fetch(`${this.serviceUri}/${categoryId}`, init)
        const jsonResponse = await response.json()
        if (!response.ok) throw jsonResponse
        return jsonResponse
    }

    async createCategory(name: string): Promise<CategoryModel> {
        const dto = { name }
        const init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.authStore.session.token}`
            },
            body: JSON.stringify(dto)
        }
        const response = await fetch(this.serviceUri, init)
        const jsonResponse = await response.json()
        if (!response.ok) throw jsonResponse
        return jsonResponse
    }

    async updateCategory(id: number, name: string): Promise<CategoryModel> {
        const dto = { name }
        const init = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.authStore.session.token}`
            },
            body: JSON.stringify(dto)
        }
        const response = await fetch(`${this.serviceUri}/${id}`, init)
        const jsonResponse = await response.json()
        if (!response.ok) throw jsonResponse
        return jsonResponse
    }

    async deleteCategory(id: number) {
        const init = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${this.authStore.session.token}`
            }
        }
        const response = await fetch(`${this.serviceUri}/${id}`, init)
        const jsonResponse = await response.json()
        if (!response.ok) throw jsonResponse
        return jsonResponse
    }
}