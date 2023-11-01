import { create } from 'zustand'

export const useConfigStore = create((set, get) => ({
    host: localStorage.getItem("pos-x-host") ?? 'localhost',
    port: localStorage.getItem("pos-x-port") ?? '8080',
    urlServer: () => `http://${get().host}:${get().port}/api`,
    setHost: (newHost) => {
        localStorage.setItem("pos-x-host", newHost)
        set({ host: newHost })
    },
    setPort: (newPort) => {
        localStorage.setItem("pos-x-port", newPort)
        set({ port: newPort })
    },
}))
