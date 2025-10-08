import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Manual chunk grouping to reduce a single huge vendor bundle and enable better caching.
export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    chunkSizeWarningLimit: 1200, // Raise limit after we implement proper splitting
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('recharts')) return 'charting'
            if (id.includes('framer-motion')) return 'animation'
            if (id.includes('lucide-react')) return 'icons'
          }
        },
      },
    },
  },
})
