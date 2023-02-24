import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { CardPodcast } from '@/components/CardPodcast'
import { TableDetailPodcast } from '@/components/TableDetailPodcast'

import { usePodcasts } from '@/hooks/usePodcasts'

import './styles.css'

export const DetailPodcast = () => {
  const [podcast, setPodcast] = useState({})
  const { podcastId } = useParams()
  const { getPodcastById, detailOfPodcast, details } = usePodcasts()

  useEffect(() => {
    // filter if not exist return 404
    setPodcast(getPodcastById(podcastId))
  }, [getPodcastById])

  useEffect(() => {
    detailOfPodcast(podcastId)
  }, [podcastId])

  return (
    <div id='detail-podcast'>
      <CardPodcast podcast={podcast} />
      <TableDetailPodcast details={details} />
    </div>
  )
}
