import './styles.css'

export const CardPodcast = ({ podcast }) => {
  return (
    <div className='card'>
      <img src={podcast?.image} alt={podcast?.title} />
      <div className='card-header'>
        <h2 className='card-title'>{podcast?.title}</h2>
        <i className='card-author'>by {podcast?.author}</i>
      </div>
      <div className='card-body'>
        <h3 className='card-description'>Description:</h3>
        <p className='card-description-body'>{podcast?.description}</p>
      </div>
    </div>
  )
}
