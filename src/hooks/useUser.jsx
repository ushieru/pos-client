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
        /**
         * Update a User
         * @param {string} id
         * @param {string} name
         * @param {string} email
         * @param {string} username
         * @param {string} account_type
         * @param {boolean} is_active
         * return {object} user instance or error
         */
        updateUser: async (id, name, email, username, account_type, is_active) => {
            const dto = { name, email, username, account_type, is_active }
            const init = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.token}`
                },
                body: JSON.stringify(dto)
            }
            return fetch(`${url}/${id}`, init)
                .then(r => r.json())
        },
        /**
         * Delete a user by id
         * @param {number} id
         * @return 
         */
        deleteUser: async (id) => {
            return fetch(`${url}/${id}`,
                { method: 'DELETE', headers: { 'Authorization': `Bearer ${session.token}` } })
                .then(r => r.json())
        }
    }
}

