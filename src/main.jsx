import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/study_schedule/dev-dist/sw.js')
      .then((registration) => {
        console.log('[SW] Registrado con éxito:', registration);
      })
      .catch((error) => {
        console.error('[SW] Error al registrar:', error);
      });
  });
}