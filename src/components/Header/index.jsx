import React from 'react'
import { Link } from 'react-router-dom'
import { Loader } from '../Loader'
import './styles.css'
export const Header = () => {
  return (
    <header className='header-podcaster'>
      <h1 className='title-app'><Link to='/'>Podcaster</Link></h1>
      <Loader />
    </header>
  )
}
