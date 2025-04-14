import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { FirebaseAppProvider } from 'reactfire'
import './index.css'
import App from './App.jsx'
import { app } from './firebase/config'
import './i18n'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirebaseAppProvider firebaseApp={app}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FirebaseAppProvider>
  </StrictMode>,
)
