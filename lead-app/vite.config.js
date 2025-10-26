import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { copyFileSync, cpSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

// Plugin to copy API directory after build
const copyApiPlugin = () => ({
  name: 'copy-api',
  closeBundle() {
    const apiSource = join(process.cwd(), 'api')
    const apiDest = join(process.cwd(), 'dist', 'api')
    
    if (existsSync(apiSource)) {
      cpSync(apiSource, apiDest, { recursive: true })
      console.log('✓ Copied API directory to dist')
    }
  }
})

export default defineConfig({
  plugins: [react(), copyApiPlugin()],
  build: {
    minify: false, // Disable minification for debugging
  },
})
