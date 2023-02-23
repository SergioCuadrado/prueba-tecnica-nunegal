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
      let localPodcasts = window.localStorage.getItem('podcasts') ? JSON.parse(window.localStorage.getItem('podcasts')) : null

      // if you ask for the information until 24 hours have passed that you get it from localstorage
      if (new Date(Date.now()) < new Date(localPodcasts?.expires)) {
        setPodcasts({ podcasts: localPodcasts.podcasts, filterPodcasts: localPodcasts.podcasts })
        return
      }

      setLoading(true)
      const podcasts = await searchPodcasts()
      const ONE_DAY = 60 * 60 * 24 * 1000

      localPodcasts = {
        podcasts,
        expires: new Date(Date.now() + ONE_DAY)
      }
      window.localStorage.setItem('podcasts', JSON.stringify(localPodcasts))

      setPodcasts({ ...podcasts, podcasts, filterPodcasts: podcasts })
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
