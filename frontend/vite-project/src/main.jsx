import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {AuthProvider} from './context/authContext.jsx'
import {ColorProvider} from './context/colorTheme.jsx'
import { ApplicationProvider } from './context/applicationContext.jsx'

import { Bounce, ToastContainer } from 'react-toastify'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
        <ToastContainer
          position="top-center"
          limit={2}
          hideProgressBar
          pauseOnHover
          draggable
          autoClose={3000}
          closeButton={false}
          transition={Bounce}
          className="custom-toast-container"
          closeOnClick
        />
        <App />
    </AuthProvider>
  </StrictMode>,
)
