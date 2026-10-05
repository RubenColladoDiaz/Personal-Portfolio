import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { FirebaseAppProvider } from 'reactfire'
import './index.css'
import App from './App.jsx'
import { app } from './firebase/config'
import './i18n'

if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

console.log(
  '%cr.%c  Hola, curioso. Si has llegado hasta aquí, hablemos: ruben.co.diaz@gmail.com',
  'font: 600 28px system-ui, sans-serif; color: #ff5c21;',
  'font: 12px monospace; color: inherit;',
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirebaseAppProvider firebaseApp={app}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FirebaseAppProvider>
  </StrictMode>,
)
