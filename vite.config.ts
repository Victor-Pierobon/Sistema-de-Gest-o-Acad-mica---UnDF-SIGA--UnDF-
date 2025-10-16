import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Sistema-de-Gest-o-Acad-mica---UnDF-SIGA--UnDF-/',
  build: {
    outDir: 'docs'
  }
})