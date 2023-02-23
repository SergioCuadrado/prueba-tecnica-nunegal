import './styles.css'

export const ListPodcast = ({ podcasts }) => {
  return (
    <ul className='list-products'>
      {podcasts.map((podcast) => (
        <li key={podcast?.id}>
          <img src={podcast?.image} alt={podcast?.title} />
          <h2>{podcast?.title.toUpperCase()}</h2>
          <p>Author: {podcast?.author}</p>
        </li>
      ))}
    </ul>
  )
}
