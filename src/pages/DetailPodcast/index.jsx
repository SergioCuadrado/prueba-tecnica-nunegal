import { useState, useEffect } from 'react'
import { useParams, Outlet } from 'react-router-dom'

import { CardPodcast } from '@/components/CardPodcast'

import { usePodcasts } from '@/hooks/usePodcasts'

import './styles.css'

export const DetailPodcast = () => {
  const [podcast, setPodcast] = useState({})
  const { podcastId, episodeId } = useParams()
  const { getPodcastById } = usePodcasts()

  useEffect(() => {
    // filter if not exist return 404
    setPodcast(getPodcastById(podcastId))
  }, [getPodcastById])

  return (
    <div id='detail-podcast'>
      <CardPodcast podcast={podcast} podcastId={podcastId} />
      <Outlet context={{ podcastId, episodeId }} />
    </div>
  )
}
