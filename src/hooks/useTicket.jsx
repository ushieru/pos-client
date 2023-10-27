import { useConfigStore } from "../stores/useConfigStore"
import { useSessionStore } from "../stores/useSessionStore"

export const useTicket = () => {
  const urlServer = useConfigStore(state => state.urlServer)
  const session = useSessionStore(state => state.session)
  const url = `${urlServer}/tickets`
  return {
    /**
     * Create a new ticket 
     * @returns {Promise<Object>}
     */
    createTicket: async () => {
      const init = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.token}`
        },
      }
      return fetch(url, init)
        .then(r => r.json())
    },
    /**
     * Add a product from a ticket 
     * @param {string} ticketId Ticket identificator 
     * @param {string} productID Product identificator 
     * @returns {Promise<Object>}
     */
    addProduct: async (ticketId, productId) => {
      return fetch(`${url}/${ticketId}/products/${productId}`,
        { method: "POST", headers: { 'Authorization': `Bearer ${session.token}` } })
        .then(r => r.json())
    },
    /**
     * Delete a product from a ticket
     * @param {string} ticketId Ticket identificator 
     * @param {string} productID Product identificator 
     * @returns {Promise<Object>}
     */
    deleteProduct: async (ticketId, productId) => {
      return fetch(`${url}/${ticketId}/products/${productId}`,
        { method: "DELETE", headers: { 'Authorization': `Bearer ${session.token}` } })
        .then(r => r.json())
    },
    /**
     * Pay a ticket, only cashiers
     * @param {string} ticketId Ticket identificator 
     * @returns {Promise<Object>}
     */
    payTicket: async (ticketId) => {
      return fetch(`${url}/${ticketId}/pay`,
        { method: "PUT", headers: { 'Authorization': `Bearer ${session.token}` } })
        .then(r => r.json())
    },
    /**
     * Delete a ticket
     * @param {string} ticketId Ticket identificator 
     * @returns {Promise<Object>}
     */
    deleteTicket: async (ticketId) => {
      return fetch(`${url}/${ticketId}`,
        { method: "DELETE", headers: { 'Authorization': `Bearer ${session.token}` } })
        .then(r => r.json())
    },
  }
}
