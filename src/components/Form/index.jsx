import { useEffect, useState } from 'react'
import { usePodcasts } from '@/hooks/usePodcasts'

export const Form = () => {
  const { podcasts, filteredPodcasts } = usePodcasts()
  const [valueSearch, setValueSearch] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleSearch = ({ target }) => {
    setValueSearch(target.value)
    filteredPodcasts(target.value)
  }

  useEffect(() => {
    filteredPodcasts(valueSearch)
  }, [])

  return (
    <form className='form' onSubmit={handleSubmit}>
      <strong>{podcasts?.length}</strong>
      <input type='text' placeholder='Filter podcasts...' value={valueSearch} onChange={handleSearch} />
    </form>
  )
}
