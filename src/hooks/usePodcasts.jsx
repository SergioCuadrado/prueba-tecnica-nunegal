import { useCallback, useState, useContext } from 'react'
import { searchPodcasts, detailPodcast } from '@/services/podcasts'

import { PodcastsContext } from '@/contexts/podcasts'

const updateLocalStorage = (item, state) => {
  window.localStorage.setItem(item, JSON.stringify(state))
}

export const usePodcasts = () => {
  const { podcasts, setPodcasts, loading, setLoading } = useContext(PodcastsContext)
  const [details, setDetails] = useState([])
  const [episode, setEpisode] = useState({})
  const ONE_DAY = 60 * 60 * 24 * 1000

  const getPodcasts = useCallback(async () => {
    try {
      setLoading(true)
      const localPodcasts = window.localStorage.getItem('podcasts') ? JSON.parse(window.localStorage.getItem('podcasts')) : null

      // if you ask for the information until 24 hours have passed that you get it from localstorage
      if (new Date(Date.now()) < new Date(localPodcasts?.expires)) {
        setPodcasts({ podcasts: localPodcasts.podcasts, filterPodcasts: localPodcasts.podcasts })
        return
      }

      const podcasts = await searchPodcasts()

      updateLocalStorage('podcasts', {
        podcasts,
        expires: new Date(Date.now() + ONE_DAY)
      })

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
      setLoading(true)
      const localPodcasts = window.localStorage.getItem(`details-podcasts-${id}`) ? JSON.parse(window.localStorage.getItem(`details-podcasts-${id}`)) : null

      if (new Date(Date.now()) < new Date(localPodcasts?.expires)) {
        setDetails(localPodcasts.details)
        return
      }
      podcasts?.podcasts.find((podcast) => podcast?.id === id)
      const details = await detailPodcast(id)
      if (details.length > 0) {
        updateLocalStorage(`details-podcasts-${id}`, {
          details,
          expires: new Date(Date.now() + ONE_DAY)
        })
        setDetails(details)
      } else throw new Error('Podcast not found')
    } catch (error) {
      console.warn(error)
    } finally {
      setLoading(false)
    }
  }, [podcasts])

  const detailEpisode = useCallback((id) => {
    if (!details || details.length === 0) return null
    if (!loading) {
      const episode = details?.find((detail) => detail?.id === id)
      if (!episode) console.warn('Episode not found')
      setEpisode(episode)
    }
  }, [details])

  return { loading, podcasts: podcasts.filterPodcasts, getPodcasts, filteredPodcasts, getPodcastById, detailOfPodcast, details, detailEpisode, episode }
}
