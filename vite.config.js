import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate', manifest: {
      name: 'Point of Sale',
      short_name: 'Total POS',
      description: 'Total POS a free and open-source solution.',
      theme_color: '#000',
      icons: [
        {
          src: 'pwa-144x144.png',
          sizes: '144x144',
          type: 'image/png'
        },
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-192x192.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  })],
  base: '/pos-client/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
