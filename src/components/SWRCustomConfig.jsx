
import { SWRConfig } from 'swr'
import { useSessionStore } from '@/stores/useSessionStore'
import { useConfigStore } from '@/stores/useConfigStore'

export const SWRCustomConfig = ({ children }) => {
    const session = useSessionStore(s => s.session)
    const urlServer = useConfigStore(s => s.urlServer)

    return <SWRConfig value={{
        refreshInterval: 3000,
        fetcher: (url) => fetch(`${urlServer}${url}`, { headers: { 'Authorization': `Bearer ${session.token}` } }).then(res => res.json())
    }}>
        {children}
    </SWRConfig>
}
