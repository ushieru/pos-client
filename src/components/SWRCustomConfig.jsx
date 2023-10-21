
import { SWRConfig } from 'swr'
import { useSessionStore } from '@/stores/useSessionStore'

export const SWRCustomConfig = ({ children }) => {
    const session = useSessionStore(s => s.session)

    return <SWRConfig value={{
        refreshInterval: 3000,
        fetcher: (url) => fetch(`http://localhost:8080${url}`, { headers: { 'Authorization': `Bearer ${session.token}` } }).then(res => res.json())
    }}>
        {children}
    </SWRConfig>
}