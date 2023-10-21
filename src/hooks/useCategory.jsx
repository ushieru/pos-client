import { useConfigStore } from "../stores/useConfigStore"
import { useSessionStore } from "../stores/useSessionStore"

export const useCategory = () => {
    const urlServer = useConfigStore(state => state.urlServer)
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
            const response = await fetch(url, init)
            const json = response.json()
            return [json, response.status]
        },
        /**
         * Delete a category
         * @param {string} name 
         * @returns {Promise<[object, number]>}
         */
        deleteCategory: async (id) => {
            const init = {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${session.token}`
                }
            }
            const response = await fetch(`${url}/${id}`, init)
            const json = response.json()
            return [json, response.status]
        },
    }
}