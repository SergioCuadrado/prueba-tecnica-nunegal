import { Outlet } from 'react-router-dom'

import { Header } from '@/components/Header'
import './App.css'
import { usePodcasts } from './hooks/usePodcasts'
import { useEffect } from 'react'

function App () {
  const { getPodcasts } = usePodcasts()

  useEffect(() => {
    getPodcasts()
  }, [])

  return (
    <>
      <Header />
      <div className='container'>
        <Outlet />
      </div>
    </>
  )
}

export default App
