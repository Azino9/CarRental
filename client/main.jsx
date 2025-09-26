import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './src/index.css'
import App from './src/App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { AppProvider } from './src/context/AppContext.jsx'
import { MotionConfig } from 'motion/react'

// Wrap the App component with AppProvider to provide context to the entire app

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppProvider>
      <MotionConfig viewport={{ once: true}}>
        <App />
      </MotionConfig>
    </AppProvider>
  </BrowserRouter>,
)
