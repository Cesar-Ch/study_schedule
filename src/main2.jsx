import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)

const clearSWAndCache = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations()
      for (const reg of registrations) {
        await reg.unregister()
        console.log('✅ Service Worker eliminado')
      }

      const cacheNames = await caches.keys()
      await Promise.all(cacheNames.map(name => caches.delete(name)))
      console.log('🧹 Cachés eliminadas')

      // Redirigir después de limpiar
      setTimeout(() => {
        // window.location.replace('/')
      }, 1000)
    } catch (err) {
      console.error('⚠️ Error al limpiar:', err)
    }
  } else {
    // window.location.replace('/')
  }
}

clearSWAndCache()