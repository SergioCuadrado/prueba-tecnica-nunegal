import { useCallback, useState } from 'react'
import { searchPodcasts } from '@/services/podcasts'

export const usePodcasts = () => {
  const [podcasts, setPodcasts] = useState({
    podcasts: [],
    filterPodcasts: []
  })
  const [loading, setLoading] = useState(false)

  const getPodcasts = useCallback(async () => {
    try {
      setLoading(true)
      const response = await searchPodcasts()
      setPodcasts({ ...podcasts, podcasts: response, filterPodcasts: response })
    } catch (error) {
      console.warn(error)
    } finally {
      setLoading(false)
    }
  }, [])

  const filteredPodcasts = useCallback((valueSearch) => {
    const filterPodcastsValues = podcasts?.podcasts.filter((podcast) => {
      return podcast?.title.toLowerCase().includes(valueSearch?.toLowerCase()) || podcast?.author.toLowerCase().includes(valueSearch?.toLowerCase())
    })
    setPodcasts({ ...podcasts, filterPodcasts: filterPodcastsValues })
  }, [podcasts])

  return { loading, podcasts: podcasts.filterPodcasts, getPodcasts, filteredPodcasts }
}
