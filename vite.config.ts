import { rmSync } from 'fs';
import { join, resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import electron from 'vite-plugin-electron';
import renderer from 'vite-plugin-electron/renderer';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import Pages from 'vite-plugin-pages';

rmSync('dist', { recursive: true, force: true }); // v14.14.0

// https://vitejs.dev/config/
export default defineConfig({
  alias: {
    '@': resolve(__dirname, 'src'),
  },
  plugins: [
    vue(),
    Pages({
      dirs: 'src/pages',
    }),
    Components({
      resolvers: [NaiveUiResolver()],
      dts: 'src/types/components.d.ts',
    }),
    AutoImport({
      imports: ['vue-router', 'vue'],
      vueTemplate: true,
      dts: 'src/types/autoImport.d.ts',
    }),
    electron({
      main: {
        entry: 'electron/main/index.ts',
        vite: {
          build: {
            sourcemap: false,
            outDir: 'dist/electron/main',
          },
        },
      },
      preload: {
        input: {
          // You can configure multiple preload here
          splash: join(__dirname, 'electron/preload/splash.ts'),
        },
        vite: {
          build: {
            // For debug
            sourcemap: 'inline',
            outDir: 'dist/electron/preload',
          },
        },
      },
    }),
    // Enable use Electron, Node.js API in Renderer-process
    renderer(),
  ],
});
