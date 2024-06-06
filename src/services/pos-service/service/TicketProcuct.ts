import { AuthStore } from "../store/AuthStore"
import { Filter } from "../util/Filter"

export class TicketProduct {
    constructor(
        private readonly host: string,
        private readonly authStore: AuthStore,
        private readonly serviceUri = `${host}/api/ticket-products`
    ) { }

    async list(filter?: Filter<any>): Promise<any[]> {
        const init = {
            headers: { 'Authorization': `Bearer ${this.authStore.session.token}` }
        }
        let queryParams = ''
        if (filter) queryParams += filter.build()
        return fetch(`${this.serviceUri}?${queryParams}`, init).then(r => r.json())
    }

    async setInPreparation(ticketProductID: number) {
        return fetch(`${this.serviceUri}/${ticketProductID}/in-preparation`,
            { method: "PUT", headers: { 'Authorization': `Bearer ${this.authStore.session.token}` } })
            .then(r => r.json())
    }

    async setPrepared(ticketProductID: number) {
        return fetch(`${this.serviceUri}/${ticketProductID}/prepared`,
            { method: "PUT", headers: { 'Authorization': `Bearer ${this.authStore.session.token}` } })
            .then(r => r.json())
    }
}