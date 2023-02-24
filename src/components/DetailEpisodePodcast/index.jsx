import { usePodcasts } from '@/hooks/usePodcasts'
import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import './styles.css'

export const DetailEpisodePodcast = () => {
  const { details, detailOfPodcast, detailEpisode, episode } = usePodcasts()
  const { podcastId, episodeId } = useOutletContext()

  useEffect(() => {
    detailOfPodcast(podcastId)
  }, [podcastId])

  useEffect(() => {
    if (details) detailEpisode(episodeId)
  }, [details])

  return (
    <section className='section-detail-episode'>
      <div className='detail-information'>
        <h2>{episode?.title}</h2>
        <i dangerouslySetInnerHTML={{ __html: episode?.description }} />
      </div>
      <div className='detail-audio'>
        <audio controls>
          {episode?.audio ? <source src={episode?.audio} type='audio/mpeg' /> : null}
        </audio>
      </div>
    </section>
  )
}
