import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'
export const Header = () => {
  return (
    <header>
      <h1 className='title-app'><Link to='/'>Podcaster</Link></h1>
    </header>
  )
}
