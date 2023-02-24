import { createContext, useState } from 'react'

export const PodcastsContext = createContext()

export const PodcastsProvider = ({ children }) => {
  const [podcasts, setPodcasts] = useState({
    podcasts: [],
    filterPodcasts: []
  })
  const [loading, setLoading] = useState(false)

  return (
    <PodcastsContext.Provider value={{ podcasts, setPodcasts, loading, setLoading }}>
      {children}
    </PodcastsContext.Provider>
  )
}
