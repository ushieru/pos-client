import { useConfigStore } from "../stores/useConfigStore"
import { useSessionStore } from "../stores/useSessionStore"

export const useTable = () => {
    const urlServer = useConfigStore(state => state.urlServer())
    const session = useSessionStore(state => state.session)
    const url = `${urlServer}/tables`
    return {
        /**
         * Create a new table
         * @param {string} name 
         * @returns {Promise<object>}
         */
        createTable: async (name) => {
            const dto = { name }
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
         * Create a new ticket and link to table id
         * @param {number} tableId
         * @returns {Promise<object>}
         */
        createTicket: async (tableId) => {
            const init = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.token}`
                },
            }
            return fetch(`${url}/${tableId}/tickets`, init)
                .then(r => r.json())
        },
        /**
         * Delete a table
         * @param {number} id 
         * @param {{name: string, pos_x: number, pos_y: number}} table
         * @returns {Promise<object>}
         */
        updateTable: async (id, table) => {
            const init = {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${session.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(table)
            }
            return fetch(`${url}/${id}`, init)
                .then(r => r.json())
        },
        /**
         * Delete a table
         * @param {number} id 
         * @returns {Promise<object>}
         */
        deleteTable: async (id) => {
            const init = {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${session.token}`
                }
            }
            return fetch(`${url}/${id}`, init)
                .then(r => r.json())
        },
    }
}
