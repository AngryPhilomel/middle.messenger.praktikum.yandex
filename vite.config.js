import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    root: resolve(__dirname, 'src'),
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                register: resolve(__dirname, 'src/pages/register.html'),
            },
        },
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
    },
})