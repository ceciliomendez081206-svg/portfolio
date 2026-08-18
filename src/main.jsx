import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './portfolio.jsx'
import { initAnalytics, trackPage } from './utils/analytics.js'

initAnalytics();
trackPage();
window.addEventListener('hashchange', () => trackPage());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
