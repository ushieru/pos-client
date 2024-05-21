import { AuthStore } from "../store/AuthStore"
import { Filter } from "../util/Filter"
import { Ticket as TicketModel } from '../model/Ticket'

export class Ticket {
    constructor(
        private readonly host: string,
        private readonly authStore: AuthStore,
        private readonly serviceUri = `${host}/api/tickets`
    ) { }

    async getTickets(filter?: Filter<TicketModel>): Promise<TicketModel> {
        const init = { headers: { 'Authorization': `Bearer ${this.authStore.session.token}` } }
        return fetch(`${this.serviceUri}?${filter ? filter.build() : ''}`, init).then(r => r.json())
    }

    async findTicket(id: number) {
        const init = { headers: { 'Authorization': `Bearer ${this.authStore.session.token}` } }
        return fetch(`${this.serviceUri}/${id}`, init).then(r => r.json())
    }

    async createTicket() {
        const init = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.authStore.session.token}`
            },
        }
        return fetch(this.serviceUri, init)
            .then(r => r.json())
    }

    async addProduct(ticketId: number, productId: number) {
        return fetch(`${this.serviceUri}/${ticketId}/products/${productId}`,
            { method: "POST", headers: { 'Authorization': `Bearer ${this.authStore.session.token}` } })
            .then(r => r.json())
    }

    async deleteProduct(ticketId: number, productId: number) {
        return fetch(`${this.serviceUri}/${ticketId}/products/${productId}`,
            { method: "DELETE", headers: { 'Authorization': `Bearer ${this.authStore.session.token}` } })
            .then(r => r.json())
    }

    async payTicket(ticketId: number) {
        return fetch(`${this.serviceUri}/${ticketId}/pay`,
            { method: "PUT", headers: { 'Authorization': `Bearer ${this.authStore.session.token}` } })
            .then(r => r.json())
    }

    async deleteTicket(ticketId: number) {
        return fetch(`${this.serviceUri}/${ticketId}`,
            { method: "DELETE", headers: { 'Authorization': `Bearer ${this.authStore.session.token}` } })
            .then(r => r.json())
    }
}