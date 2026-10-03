import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import { resolve } from 'path';

export default defineConfig({
    root: '.',
    base: '/memory-game/',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: true,
        cssMinify: false
    },
    css: {
        devSourcemap: true,
        preprocessorOptions: {
            scss: {
                sourceMap: true,
            }
        }
    },
    server: {
        port: 5173,
        open: true,
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(import.meta.dirname, 'index.html'),
            }
        }
    }
});