import { create } from 'zustand'

export const useConfigStore = create((set) => ({
    host: 'localhost',
    port: 8080,
    urlServer: 'http://localhost:8080/api'
}))
