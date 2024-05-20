import { Session } from "../model/Session"
import { AuthStore } from "./AuthStore"

export class AuthStoreLocalStorage implements AuthStore {
    private readonly SESSION_KEY = 'x-pos-session'

    async saveSession(session: Session) {
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(session))
    }

    async closeSession(): Promise<void> {
        localStorage.removeItem(this.SESSION_KEY)
    }

    get session() {
        return JSON.parse(localStorage.getItem(this.SESSION_KEY))
    }
}