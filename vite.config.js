import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        proxy: {
            // '/api/query': 'http://127.0.0.1:8787',
            // '/api/searchsuggestions': 'http://127.0.0.1:8787',
            '/api/query': 'https://ceinvatam.avram.dev',
            '/api/searchsuggestions': 'https://ceinvatam.avram.dev',
        }
    }
})