import './App.css'
import { ListPodcast } from './components/ListPodcast'

function App () {
  return (
    <div>
      <header>
        <h1 className='title-app'>Podcaster</h1>
        <form className='form'>
          <strong>100</strong>
          <input type='text' placeholder='Filter podcasts...' />
        </form>
      </header>
      <ListPodcast />
    </div>
  )
}

export default App
