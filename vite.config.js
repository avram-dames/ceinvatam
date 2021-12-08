import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        proxy: {
            '/query': 'https://ceinvatam-net-workers.lalatech.workers.dev/',
            // '/query': 'http://127.0.0.1:8787/',
        }
    }
})