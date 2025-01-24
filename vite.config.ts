import * as child from 'child_process';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const commitDate = child
    .execSync(
        'git log -1 --format="%at" | xargs -I{} date -d @{} +%Y/%m/%d\\ %H:%M:%S'
    )
    .toString()
    .trim();
const commitHash = child
    .execSync('git rev-parse --short HEAD')
    .toString()
    .trim();

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
    define: {
        'import.meta.env.VITE_APP_COMMIT_DATE': JSON.stringify(commitDate),
        'import.meta.env.VITE_APP_COMMIT_HASH': JSON.stringify(commitHash),
    },
});
