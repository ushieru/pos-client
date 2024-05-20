import { Session } from "../model/Session";
import { AuthStore } from "../store/AuthStore";

export class Auth {

    constructor(
        private readonly host: string,
        private readonly authStore: AuthStore,
    ) { }

    async login(username: string, password: string): Promise<Session> {
        const credentials = btoa(`${username}:${password}`);
        const basicAuth = `Basic ${credentials}`;
        const response = await fetch(`${this.host}/api/auth`, {
            method: "POST",
            headers: { Authorization: basicAuth },
        })
        const jsonResponse = await response.json()
        if (!response.ok) throw jsonResponse
        this.authStore.saveSession(jsonResponse)
        return jsonResponse
    }

    async closeSession() {
        this.authStore.closeSession()
    }

    get session() {
        return this.authStore.session
    }
}
