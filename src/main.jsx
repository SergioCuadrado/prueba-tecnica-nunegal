import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import App from './App'
import { DetailPodcast } from './pages/DetailPodcast'

import './index.css'
import { Products } from './pages/Products'
import { PodcastsProvider } from './contexts/podcasts'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Products />
      },
      {
        path: 'podcast/:podcastId',
        element: <DetailPodcast />
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
