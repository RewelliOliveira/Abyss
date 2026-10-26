import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      svgrOptions: {
        svgProps: { focusable: 'false' },
      },
    }),
  ],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'seafloor', test: /seafloor\.svg/ },
            { name: 'sea-life', test: /assets[/\\]svg[/\\](sea-turtle|fish|manta-ray|hammerhead-shark|jellyfish|squid|swordfish|lanternfish|hatchetfish|sperm-whale|viperfish|anglerfish|gulper-eel|vampire-squid|crown-jellyfish|tripod-fish|bigfin-squid|red-shrimp|sea-anemone|snailfish)/ },
            { name: 'illustrations', test: /assets[/\\]svg/ },
            { name: 'vendor', test: /node_modules/ },
          ],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
