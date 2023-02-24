import { createContext, useState } from 'react'

export const PodcastsContext = createContext()

export const PodcastsProvider = ({ children }) => {
  const [podcasts, setPodcasts] = useState({
    podcasts: [],
    filterPodcasts: []
  })

  return (
    <PodcastsContext.Provider value={{ podcasts, setPodcasts }}>
      {children}
    </PodcastsContext.Provider>
  )
}
