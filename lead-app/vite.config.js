import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, mkdirSync, readdirSync, statSync, existsSync } from 'fs'
import { resolve, join } from 'path'

// Function to copy directory recursively
function copyDir(src, dest) {
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true })
  }
  
  const entries = readdirSync(src, { withFileTypes: true })
  
  for (const entry of entries) {
    const srcPath = join(src, entry.name)
    const destPath = join(dest, entry.name)
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      copyFileSync(srcPath, destPath)
    }
  }
}

// Custom plugin to copy API folder
const copyApiPlugin = () => ({
  name: 'copy-api',
  writeBundle() {
    const apiSrc = resolve(__dirname, 'api')
    const apiDest = resolve(__dirname, 'dist/api')
    
    if (existsSync(apiSrc)) {
      console.log('📦 Copying api/ folder to dist/...')
      copyDir(apiSrc, apiDest)
      console.log('✅ API files copied successfully!')
    }
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), copyApiPlugin()],
})
