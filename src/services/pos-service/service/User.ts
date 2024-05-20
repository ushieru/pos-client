
import { AuthStore } from "../store/AuthStore"
import { UpdateUserDto, User as UserModel } from "../model/User"

export class User {
    constructor(
        private readonly host: string,
        private readonly authStore: AuthStore,
        private readonly serviceUri = `${host}/api/users`
    ) { }

    async getUsers(): Promise<UserModel> {
        return fetch(this.serviceUri, { headers: { 'Authorization': `Bearer ${this.authStore.session.token}` } })
            .then(r => r.json())
    }

    async getUser(id: number): Promise<UserModel> {
        const response = await fetch(`${this.serviceUri}/${id}`, { headers: { 'Authorization': `Bearer ${this.authStore.session.token}` } })
        const jsonResponse = await response.json()
        if (!response.ok) throw jsonResponse
        return jsonResponse
    }

    async createUser(name: string, email: string, username: string, account_type: 'admin' | 'cashier' | 'waiter', password: string) {
        const dto = { name, email, username, account_type, password }
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

    async updateUser(updateUserDto: UpdateUserDto) {
        const init = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.authStore.session.token}`
            },
            body: JSON.stringify(updateUserDto)
        }
        const response = await fetch(`${this.serviceUri}/${updateUserDto.id}`, init)
        const jsonResponse = await response.json()
        if (!response.ok) throw jsonResponse
        return jsonResponse

    }

    async deleteUser(id: number) {
        const response = await fetch(`${this.serviceUri}/${id}`,
            { method: 'DELETE', headers: { 'Authorization': `Bearer ${this.authStore.session.token}` } })
        const jsonResponse = await response.json()
        if (!response.ok) throw jsonResponse
        return jsonResponse
    }
}
