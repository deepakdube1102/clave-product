import { BrowserRouter } from 'react-router-dom'
import { Toaster } from '@/components/ui/Toast'
import { AppRoutes } from '@/routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster />
    </BrowserRouter>
  )
}

export default App
