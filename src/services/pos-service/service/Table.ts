import { AuthStore } from "../store/AuthStore"

export class Table {
    constructor(
        private readonly host: string,
        private readonly authStore: AuthStore,
        private readonly serviceUri = `${host}/api/tables`
    ) { }

    async getTables() {
        const init = { headers: { 'Authorization': `Bearer ${this.authStore.session.token} ` } }
        return fetch(this.serviceUri, init).then(r => r.json())
    }

    async createTable(name: string) {
        const dto = { name }
        const init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.authStore.session.token} `
            },
            body: JSON.stringify(dto)
        }
        return fetch(this.serviceUri, init)
            .then(r => r.json())
    }

    async createTicketTable(tableId: number) {
        const init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.authStore.session.token} `
            },
        }
        return fetch(`${this.serviceUri}/${tableId}/tickets`, init)
            .then(r => r.json())
    }

    async updateTable(id: number, table) {
        const init = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${this.authStore.session.token} `,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(table)
        }
        return fetch(`${this.serviceUri}/${id}`, init)
            .then(r => r.json())
    }

    async deleteTable(id: number) {
        const init = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${this.authStore.session.token}`
            }
        }
        return fetch(`${this.serviceUri}/${id}`, init)
            .then(r => r.json())
    }
}