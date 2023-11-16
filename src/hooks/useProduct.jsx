import { useConfigStore } from "../stores/useConfigStore"
import { useSessionStore } from "../stores/useSessionStore"

export const useProduct = () => {
    const urlServer = useConfigStore(state => state.urlServer())
    const session = useSessionStore(state => state.session)
    const url = `${urlServer}/products`
    return {
        /**
         * Find a product by id
         * @param {number} productId
         * returns {Promise<object>}
         */
        findProduct: async (productId) => {
            const init = {
                headers: {
                    'Authorization': `Bearer ${session.token}`
                }
            }
            return fetch(`${url}/${productId}`, init)
                .then(r => r.json())
        },
        /**
         * Create a new Product
         * @param {string} name 
         * @param {string} description 
         * @param {number} price
         * @param {string} available_from  date as ISO 8601
         * @param {string} available_until date as ISO 8601
         * @returns {Promise<object>}
         */
        createProduct: async (name, description, price, available_from, available_until) => {
            const dto = { name, description, price, available_from, available_until }
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
         * @param {number} id  
         * @returns {Promise<object>}
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
        /**
         * Add a Product-Category relation
         * @param {number} id
         * @param {number} categoryId
         * @returns {Promise<object>}
         */
        addProductCategory: async (id, categoryId) => {
            const init = {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session.token}`
                }
            }
            return fetch(`${url}/${id}/categories/${categoryId}`, init)
                .then(r => r.json())
        },
        /**
         * Delete a Product-Category relation
         * @param {number} id
         * @param {number} categoryId
         * @returns {Promise<object>}
         */
        deleteProductCategory: async (id, categoryId) => {
            const init = {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${session.token}`
                }
            }
            return fetch(`${url}/${id}/categories/${categoryId}`, init)
                .then(r => r.json())
        },
    }
}
