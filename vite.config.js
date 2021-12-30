import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const host = 'http://127.0.0.1:8787';
// const host = 'https://ceinvatam.avram.dev'


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        proxy: {
            '/api/query': host,
            '/api/searchsuggestions': host,
        }
    }
})