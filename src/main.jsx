import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main-styles.css' // Main stylesheet that imports all CSS in proper order

import App from './components/App.jsx'
import ErrorBoundary from './components/ErrorBoundary'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
