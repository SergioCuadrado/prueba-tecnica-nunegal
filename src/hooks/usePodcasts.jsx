import { useCallback, useState, useContext } from 'react'
import { searchPodcasts, detailPodcast } from '@/services/podcasts'

import { PodcastsContext } from '@/contexts/podcasts'

export const usePodcasts = () => {
  const { podcasts, setPodcasts } = useContext(PodcastsContext)
  const [details, setDetails] = useState({})
  const [loading, setLoading] = useState(false)

  const getPodcasts = useCallback(async () => {
    try {
      setLoading(true)
      let localPodcasts = window.localStorage.getItem('podcasts') ? JSON.parse(window.localStorage.getItem('podcasts')) : null

      // if you ask for the information until 24 hours have passed that you get it from localstorage
      if (new Date(Date.now()) < new Date(localPodcasts?.expires)) {
        setPodcasts({ podcasts: localPodcasts.podcasts, filterPodcasts: localPodcasts.podcasts })
        return
      }

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

  const getPodcastById = useCallback((id) => {
    if (!podcasts) return null
    if (!loading) return podcasts?.podcasts.find((podcast) => podcast?.id === id)
  }, [podcasts])

  const detailOfPodcast = useCallback(async (id) => {
    if (!podcasts) return null
    try {
      const details = await detailPodcast(id)
      setDetails(details)
    } catch (error) {
      console.warn(error)
    }
  }, [podcasts])

  return { loading, podcasts: podcasts.filterPodcasts, getPodcasts, filteredPodcasts, getPodcastById, detailOfPodcast, details }
}
