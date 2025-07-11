import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "@tailwindcss/vite";
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/study_schedule/",
  build: {
    rollupOptions: {
      input: {
        main:  resolve(__dirname, 'clean.html')
      }
    }
  }
})
