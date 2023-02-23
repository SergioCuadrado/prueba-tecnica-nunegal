import React from 'react'
import { feed } from '@/mocks/resultsPodcasts.json'

import './styles.css'

export const ListPodcast = () => {
  const { entry } = feed
  return (
    <ul className='list-products'>
      {entry.map((podcast) => (
        <li key={podcast.id.attributes['im:id']}>
          <img src={podcast['im:image'][2].label} alt={podcast['im:name'].label} />
          <h2>{podcast['im:name'].label.toUpperCase()}</h2>
          <p>Author: {podcast['im:artist'].label}</p>
        </li>
      ))}
    </ul>
  )
}
