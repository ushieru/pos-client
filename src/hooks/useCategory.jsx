import { useConfigStore } from "../stores/useConfigStore"
import { useSessionStore } from "../stores/useSessionStore"

export const useCategory = () => {
    const urlServer = useConfigStore(state => state.urlServer())
    const session = useSessionStore(state => state.session)
    const url = `${urlServer}/categories`
    return {
        /**
         * Create a new category
         * @param {string} name 
         * @returns {Promise<[object, number]>}
         */
        createCategory: async (name) => {
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
        * Update a new category
        * @param {number} category id
        * @param {string} name 
        * @returns {object} Category instance or Error
        */
        updateCategory: async (id, name) => {
            const dto = { name }
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
         * Delete a category
         * @param {string} id 
         * @returns {Promise<[object, number]>}
         */
        deleteCategory: async (id) => {
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
