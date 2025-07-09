import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html',
        notFound: './404.html'
      },
    }
  },
  plugins: [
    tailwindcss(),
  ],
  server: {
    port: 4635,
  }
});
