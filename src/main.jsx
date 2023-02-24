import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import App from './App'
import { DetailPodcast } from '@/pages/DetailPodcast'

import './index.css'
import { Podcasts } from '@/pages/Podcasts'
import { PodcastsProvider } from '@/contexts/podcasts'
import { TableDetailPodcast } from '@/components/TableDetailPodcast'
import { DetailEpisodePodcast } from '@/components/DetailEpisodePodcast'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Podcasts />
      },
      {
        path: 'podcast/:podcastId',
        element: <DetailPodcast />,
        children: [
          {
            path: '',
            element: <TableDetailPodcast />
          },
          {
            path: 'episode/:episodeId',
            element: <DetailEpisodePodcast />
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PodcastsProvider>
      <RouterProvider router={router} />
    </PodcastsProvider>
  </React.StrictMode>
)
