import { usePodcasts } from '@/hooks/usePodcasts'
import React from 'react'
import { Link } from 'react-router-dom'
import { Loader } from '../Loader'
import './styles.css'
export const Header = () => {
  const { loading } = usePodcasts()
  console.log(loading)
  return (
    <header className='header-podcaster'>
      <h1 className='title-app'><Link to='/'>Podcaster</Link></h1>
      {loading ? <Loader /> : null}
    </header>
  )
}
