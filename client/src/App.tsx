import { Suspense } from 'react'
import { AuthProvider } from './auth-provider'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<>Carregando...</>}>
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </Suspense>
    </QueryClientProvider>
  )
}

export default App
