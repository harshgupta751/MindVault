import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import { RecoilRoot } from 'recoil'

createRoot(document.getElementById('root')!).render(
 <BrowserRouter>
  <StrictMode>
      <RecoilRoot>
    <App />
    </RecoilRoot>
  </StrictMode>
  </BrowserRouter>
)
