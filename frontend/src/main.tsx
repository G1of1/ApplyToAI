import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { supabase } from './supbaseClient.ts'

// React Query client
const queryClient = new QueryClient()

// Mount app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider supabaseClient={supabase}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SessionContextProvider>
    </QueryClientProvider>
  </StrictMode>
)
