import React from 'react'
import { BrowserRouter } from 'react-router'
import { createRoot } from 'react-dom/client'

import App from './App'

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
