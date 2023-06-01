import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    root: resolve(__dirname, 'src'),
    build: {
        rollupOptions: {
            input: {
                // main: resolve(__dirname, 'src/index.html'),
                register: resolve(__dirname, 'src/pages/register.html'),
                login: resolve(__dirname, 'src/pages/login.html'),
                404: resolve(__dirname, 'src/pages/404.html'),
                500: resolve(__dirname, 'src/pages/500.html'),
            },
        },
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
    },
})