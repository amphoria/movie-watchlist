import {resolve} from 'path'
import {defineConfig} from 'vite'

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				index: resolve(__dirname, 'index.html'),
				watchlist: resolve(__dirname, 'watchlist.html'),
			},
		},
	},
})