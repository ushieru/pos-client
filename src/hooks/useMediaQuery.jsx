import { useCallback, useSyncExternalStore } from "react"

export const useMediaQuery = (query) => {
  const subscribe = useCallback(
    (callback) => {
      const matchMedia = window.matchMedia(query)
      matchMedia.addEventListener("change", callback)
      return () => {
        matchMedia.removeEventListener("change", callback)
      }
    }, [query])

  const getSnapshot = () => {
    return window.matchMedia(query).matches
  }

  return useSyncExternalStore(subscribe, getSnapshot);
}
