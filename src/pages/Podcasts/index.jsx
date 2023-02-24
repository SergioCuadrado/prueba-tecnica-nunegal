import { ListPodcast } from '@/components/ListPodcast'
import { useState, useEffect } from 'react'
import { usePodcasts } from '@/hooks/usePodcasts'

import './styles.css'

export const Podcasts = () => {
  const { podcasts, filteredPodcasts } = usePodcasts()
  const [valueSearch, setValueSearch] = useState('')

  const handleSearch = (e) => {
    filteredPodcasts(e.target.value)
    setValueSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    filteredPodcasts('')
  }, [])

  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
        <strong>{podcasts?.length}</strong>
        <input type='text' placeholder='Filter podcasts...' value={valueSearch} onChange={handleSearch} />
      </form>
      <ListPodcast podcasts={podcasts} />
    </>
  )
}
