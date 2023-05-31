import { resolve } from 'path'
import { defineConfig } from 'vite'
import handlebars from "vite-plugin-handlebars";

const pageData = {
    '/index.html': {
        username: 'User',
    },
    '/pages/profile.html': {
        username: 'Philomel',
    },
};

export default defineConfig({
    root: resolve(__dirname, 'src'),
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                profile: resolve(__dirname, 'src/pages/profile.html'),
            },
        },
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
    },
    plugins: [handlebars({
        partialDirectory: resolve(__dirname, 'src/partials'),
        context(pagePath) {
            return pageData[pagePath];
        },
    })],
})