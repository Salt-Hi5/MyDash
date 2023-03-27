import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './Components/App'
import './CSS/index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="134081916161-l7tpv46h6vbagicqho47o1l6ks220r4g.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
)
