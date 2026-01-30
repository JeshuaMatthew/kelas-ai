import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AIArticleDark from './pages/AIArticle.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AIArticleDark/>
  </StrictMode>,
)
