import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CardPodcast } from '@/components/CardPodcast'
import { usePodcasts } from '@/hooks/usePodcasts'

export const DetailPodcast = () => {
  const [podcast, setPodcast] = useState({})
  const { podcastId } = useParams()
  const { getPodcastById } = usePodcasts()

  useEffect(() => {
    // filter if not exist return 404
    setPodcast(getPodcastById(podcastId))
  }, [getPodcastById])

  return (
    <div>{podcastId} DetailPodcast
      <CardPodcast podcast={podcast} />
    </div>
  )
}
