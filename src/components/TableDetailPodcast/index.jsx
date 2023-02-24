import { Link, useOutletContext } from 'react-router-dom'
import { usePodcasts } from '@/hooks/usePodcasts'

import './styles.css'
import { useEffect } from 'react'

export const TableDetailPodcast = () => {
  const { details, detailOfPodcast } = usePodcasts()
  const { podcastId } = useOutletContext()

  useEffect(() => {
    detailOfPodcast(podcastId)
  }, [podcastId])

  return (
    <section>
      <div>
        <h2>Episodes: {details?.length}</h2>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {details?.length > 0
              ? details.map(detail => (
                <tr key={detail.id}>
                  <td><Link to={`/podcast/${podcastId}/episode/${detail.id}`}>{detail.title}</Link></td>
                  <td>{detail.date}</td>
                  <td>{detail.duration}</td>
                </tr>
              ))
              : null}
          </tbody>
        </table>
      </div>

    </section>

  )
}
