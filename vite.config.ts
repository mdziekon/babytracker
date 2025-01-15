import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    base: 'babytracker',
    plugins: [
        react(),
        VitePWA({
            registerType: 'prompt',
            injectRegister: 'auto',

            pwaAssets: {
                disabled: false,
                config: true,
            },

            manifest: {
                name: 'babytracker',
                short_name: 'babytracker',
                description: 'App for tracking newborn baby related events ',
                theme_color: '#242424',
            },

            workbox: {
                globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
                cleanupOutdatedCaches: true,
                clientsClaim: true,
            },

            devOptions: {
                enabled: false,
                navigateFallback: 'index.html',
                suppressWarnings: true,
                type: 'module',
            },
        }),
    ],
    resolve: {
        alias: {
            /**
             * /esm/icons/index.mjs only exports the icons statically, so no separate chunks are created
             *
             * @see https://github.com/tabler/tabler-icons/issues/1233#issuecomment-2428245119
             */
            '@tabler/icons-react':
                '@tabler/icons-react/dist/esm/icons/index.mjs',
        },
    },
});
