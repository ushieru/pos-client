import { create } from 'zustand'
import { toast } from 'react-toastify';

export const useSessionStore = create((set) => ({
    session: JSON.parse(localStorage.getItem("pos-x-token")),
    initSession: async (user, password) => {
        const credentials = btoa(`${user}:${password}`)
        const basicAuth = `Basic ${credentials}`
        return fetch('http://localhost:8080/api/auth', {
            method: 'POST',
            headers: { 'Authorization': basicAuth }
        })
            .then(r => r.json())
            .then(session => {
                if (session.code) {
                    toast.error("Error en usuario o contraseña")
                    return
                }
                localStorage.setItem("pos-x-token", JSON.stringify(session))
                set({ session })
            })
            .then(_ => true)
            .catch(_ => false)
    },
    closeSession: () => {
        localStorage.removeItem("pos-x-token")
        set({ session: undefined })
    }
}))
