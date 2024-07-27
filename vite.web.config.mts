import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config
export default defineConfig((env) => {
  const {mode} = env

  return {
    root: './src/web/',
    mode,
    base: './',
    build: {
      outDir: `../../.vite/web/`,
    },
    // plugins: [pluginExposeRenderer(name)],
    resolve: {
      preserveSymlinks: true,
    },
    clearScreen: false,
  } as UserConfig
})
