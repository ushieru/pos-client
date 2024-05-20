import { Session } from "../model/Session"
import { AuthStore } from "./AuthStore"

export class AuthStoreInMemory implements AuthStore {
    private _session: Session

    async saveSession(session: Session) {
        this._session = session
    }

    async closeSession(): Promise<void> {
        this._session = null
    }

    get session() {
        return this._session
    }
}