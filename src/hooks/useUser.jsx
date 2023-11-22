import { useConfigStore } from "../stores/useConfigStore"
import { useSessionStore } from "../stores/useSessionStore"

export const useUser = () => {
    const urlServer = useConfigStore(state => state.urlServer())
    const session = useSessionStore(state => state.session)
    const url = `${urlServer}/users`
    return {
        /**
         * Create a new user
         * @param {string} name 
         * @param {string} email 
         * @param {string} username 
         * @param {"admin" | "cashier" | "waiter"} account_type 
         * @param {string} password 
         * @returns {object} user instance or error
         */
        createUser: async (name, email, username, account_type, password) => {
            const dto = { name, email, username, account_type, password }
            const init = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.token}`
                },
                body: JSON.stringify(dto)
            }
            return fetch(url, init)
                .then(r => r.json())
        },
    }
}

