import { Link } from 'react-router-dom'
import './styles.css'

export const ListPodcast = ({ podcasts }) => {
  return (
    <ul className='list-podcasts'>
      {podcasts.map((podcast) => (
        <Link key={podcast?.id} to={`/podcast/${podcast?.id}`}>
          <li>
            <img src={podcast?.image} alt={podcast?.title} />
            <h2>{podcast?.title.toUpperCase()}</h2>
            <p>Author: {podcast?.author}</p>
          </li>
        </Link>
      ))}
    </ul>
  )
}
