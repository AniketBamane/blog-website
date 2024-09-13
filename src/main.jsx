import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from "@/components/ui/toaster"
import { ContextProvider } from './context/myContext.jsx'
import { BrowserRouter } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ContextProvider>
    <App />
    <Toaster />
  </ContextProvider>,
  </BrowserRouter>
)
