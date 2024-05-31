import { AuthStore } from "../store/AuthStore"

export class TicketProduct {
    constructor(
        private readonly host: string,
        private readonly authStore: AuthStore,
        private readonly serviceUri = `${host}/api/ticket-products`
    ) { }

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