import { AuthStore } from "../store/AuthStore"
import { Category as CategoryModel, UpsertCategoryDTO } from "../model/Category"
import { Filter } from "../util/Filter"

export class Category {

    constructor(
        private readonly host: string,
        private readonly authStore: AuthStore,
        private readonly serviceUri = `${host}/api/categories`
    ) { }

    async getCategories(filter?: Filter<CategoryModel>): Promise<CategoryModel[]> {
        const init = {
            headers: { 'Authorization': `Bearer ${this.authStore.session.token}` }
        }
        return fetch(`${this.serviceUri}?${filter ? filter.build() : ''}`, init).then(r => r.json())
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

    async createCategory(dto: UpsertCategoryDTO): Promise<CategoryModel> {
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

    async updateCategory(id: number, dto: UpsertCategoryDTO): Promise<CategoryModel> {
        const _dto = {
            ...dto,
            available_days: dto.available_days.toString(),
            available_from: dto.available_from.toISOString(),
            available_until: dto.available_until.toISOString()
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