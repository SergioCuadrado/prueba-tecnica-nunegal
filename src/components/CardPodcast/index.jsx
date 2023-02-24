import { Link } from 'react-router-dom'

import './styles.css'

export const CardPodcast = ({ podcast, podcastId }) => {
  return (
    <div className='card'>
      <Link to={`/podcast/${podcastId}`}>
        <img src={podcast?.image} alt={podcast?.title} />
        <div className='card-header'>
          <h2 className='card-title'>{podcast?.title}</h2>
          <i className='card-author'>by {podcast?.author}</i>
        </div>
      </Link>
      <div className='card-body'>
        <h3 className='card-description'>Description:</h3>
        <p className='card-description-body'>{podcast?.description}</p>
      </div>
    </div>
  )
}
