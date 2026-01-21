import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CoursesProvider } from './context/CoursesContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ToastProvider>
    <CoursesProvider>
      <App />
    </CoursesProvider>
  </ToastProvider>
)