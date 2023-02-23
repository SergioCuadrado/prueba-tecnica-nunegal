import { useEffect, useState } from 'react'
import { ListPodcast } from '@/components/ListPodcast'
import { usePodcasts } from './hooks/usePodcasts'

import './App.css'

function App () {
  const { podcasts, getPodcasts, filteredPodcasts } = usePodcasts()
  const [valueSearch, setValueSearch] = useState('')

  const handleSearch = (e) => {
    filteredPodcasts(e.target.value)
    setValueSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    getPodcasts()
  }, [])

  return (
    <div>
      <header>
        <h1 className='title-app'>Podcaster</h1>
        <form className='form' onSubmit={handleSubmit}>
          <strong>{podcasts?.length}</strong>
          <input type='text' placeholder='Filter podcasts...' value={valueSearch} onChange={handleSearch} />
        </form>
      </header>
      <ListPodcast podcasts={podcasts} />
    </div>
  )
}

export default App
