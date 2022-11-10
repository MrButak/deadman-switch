import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        outDir: "../public/dist"
    },
    // To use SCSS/SCSS preprosser with a Vite/Vue. This code is along with installing the node package 'npm i scss --save-dev'
	css: {
		preprocessorOptions: {
			scss: {
				quietDeps: true

                // Reference for global scss variables
                // additionalData: `@import "@/assets/global.scss";`, // for importing global scss variables
			},
		}
	},
})
