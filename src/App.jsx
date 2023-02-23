import { useEffect, useState } from 'react'
import './App.css'
import { ListPodcast } from '@/components/ListPodcast'
import { getPodcasts } from '@/services/podcasts'

function App () {
  const [podcasts, setPodcasts] = useState([])
  const [valueSearch, setValueSearch] = useState([])

  // filter podcasts for title and name authors
  // const filterPodcasts = podcasts.filter(podcast => {
  //   return podcast.title.toLowerCase().includes(podcasts.toLowerCase()) || podcast.authors.toLowerCase().includes(podcasts.toLowerCase())
  // })

  const handleSearch = (e) => {
    setValueSearch(e.target.value)
  }

  const podcastsGet = async () => {
    const response = await getPodcasts()
    setPodcasts(response)
    console.log(response)
  }

  useEffect(() => {
    podcastsGet()
  }, [])

  return (
    <div>
      <header>
        <h1 className='title-app'>Podcaster</h1>
        <form className='form'>
          <strong>100</strong>
          <input type='text' placeholder='Filter podcasts...' value={valueSearch} onChange={handleSearch} />
        </form>
      </header>
      <ListPodcast podcasts={podcasts} />
    </div>
  )
}

export default App
