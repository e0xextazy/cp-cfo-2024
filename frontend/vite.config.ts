import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import {fileURLToPath, URL} from 'url';

export default defineConfig({
    define: {
        VITE_API_HOST: `"${process.env.VITE_API_HOST}"`,
        VITE_ENABLE_MOCK: `"${process.env.VITE_ENABLE_MOCK}"`,
    },
    plugins: [svgr(), react()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    optimizeDeps: {
        extensions: ['.css'],
        esbuildOptions: {
            plugins: [
                (await import('esbuild-sass-plugin')).sassPlugin({
                    type: 'style',
                }),
            ],
        },
    },
});
