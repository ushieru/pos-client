import { Session } from "../model/Session"

export interface AuthStore {
    session: Session
    saveSession(session: Session): Promise<void>
    closeSession(): Promise<void>
}