import { AuthStore } from "../store/AuthStore"
import { ProductionCenter as ProductionCenterModel } from "../model/ProductionCenter"
import { Filter } from "../util/Filter"
import { TicketProduct } from "./TicketProcuct"

export class ProductionCenter {

    constructor(
        private readonly host: string,
        private readonly authStore: AuthStore,
        private readonly serviceUri = `${host}/api/production-centers`
    ) { }

    async list(filter?: Filter<ProductionCenterModel>): Promise<ProductionCenterModel[]> {
        const init = {
            headers: { 'Authorization': `Bearer ${this.authStore.session.token}` }
        }
        let queryParams = ''
        if (filter) queryParams += filter.build()
        return fetch(`${this.serviceUri}?${queryParams}`, init).then(r => r.json())
    }

    async listTicketProducts(): Promise<TicketProduct[]> {
        const init = {
            headers: { 'Authorization': `Bearer ${this.authStore.session.token}` }
        }
        const response = await fetch(`${this.serviceUri}/ticket-products`, init)
        const jsonResponse = await response.json()
        if (!response.ok) throw jsonResponse
        return jsonResponse
    }

    async find(productionCenterId: string): Promise<ProductionCenterModel[]> {
        const init = {
            headers: { 'Authorization': `Bearer ${this.authStore.session.token}` }
        }
        const response = await fetch(`${this.serviceUri}/${productionCenterId}`, init)
        const jsonResponse = await response.json()
        if (!response.ok) throw jsonResponse
        return jsonResponse
    }

    async create(name: string): Promise<ProductionCenterModel> {
        const init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.authStore.session.token}`
            },
            body: JSON.stringify({ name })
        }
        const response = await fetch(this.serviceUri, init)
        const jsonResponse = await response.json()
        if (!response.ok) throw jsonResponse
        return jsonResponse
    }

    async update(id: string, name: string): Promise<ProductionCenterModel> {
        const init = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.authStore.session.token}`
            },
            body: JSON.stringify({ name })
        }
        const response = await fetch(`${this.serviceUri}/${id}`, init)
        const jsonResponse = await response.json()
        if (!response.ok) throw jsonResponse
        return jsonResponse
    }

    async addAccount(id: string, accountId: string): Promise<ProductionCenterModel> {
        const init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.authStore.session.token}`
            }
        }
        const response = await fetch(`${this.serviceUri}/${id}/accounts/${accountId}`, init)
        const jsonResponse = await response.json()
        if (!response.ok) throw jsonResponse
        return jsonResponse
    }

    async deleteAccount(id: string, accountId: string): Promise<ProductionCenterModel> {
        const init = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.authStore.session.token}`
            }
        }
        const response = await fetch(`${this.serviceUri}/${id}/accounts/${accountId}`, init)
        const jsonResponse = await response.json()
        if (!response.ok) throw jsonResponse
        return jsonResponse
    }

    async addCategory(id: string, categoryId: string): Promise<ProductionCenterModel> {
        const init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.authStore.session.token}`
            }
        }
        const response = await fetch(`${this.serviceUri}/${id}/categories/${categoryId}`, init)
        const jsonResponse = await response.json()
        if (!response.ok) throw jsonResponse
        return jsonResponse
    }

    async deleteCateogry(id: string, categoryId: string): Promise<ProductionCenterModel> {
        const init = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.authStore.session.token}`
            }
        }
        const response = await fetch(`${this.serviceUri}/${id}/categories/${categoryId}`, init)
        const jsonResponse = await response.json()
        if (!response.ok) throw jsonResponse
        return jsonResponse
    }

    async delete(id: string) {
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