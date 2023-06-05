import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    root: resolve(__dirname, 'src'),
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                register: resolve(__dirname, 'src/pages/register/register.html'),
                login: resolve(__dirname, 'src/pages/login/login.html'),
                404: resolve(__dirname, 'src/pages/404/404.html'),
                500: resolve(__dirname, 'src/pages/500/500.html'),
                profile: resolve(__dirname, 'src/pages/profile/profile.html'),
                changeProfile: resolve(__dirname, 'src/pages/change-profile/change-profile.html'),
                changePassword: resolve(__dirname, 'src/pages/change-password/change-password.html'),
                changeAvatar: resolve(__dirname, 'src/pages/change-avatar/change-avatar.html'),
            },
        },
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
    },
})