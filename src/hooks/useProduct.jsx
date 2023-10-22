import { useConfigStore } from "../stores/useConfigStore"
import { useSessionStore } from "../stores/useSessionStore"

export const useProduct = () => {
    const urlServer = useConfigStore(state => state.urlServer)
    const session = useSessionStore(state => state.session)
    const url = `${urlServer}/products`
    return {
        /**
         * Create a new Product
         * @param {string} name 
         * @param {string} description 
         * @param {number} price
         * @returns {Promise<[object, number]>}
         */
        createProduct: async (name, description, price) => {
            const dto = { name, description, price }
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
         * Delete a Product
         * @param {string} name 
         * @returns {Promise<[object, number]>}
         */
        deleteProduct: async (id) => {
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