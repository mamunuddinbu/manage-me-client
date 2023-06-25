import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Router.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className='w-3/4 mx-auto'>
    <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </div>
)
