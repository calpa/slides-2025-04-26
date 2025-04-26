import { defineConfig } from 'unocss'

export default defineConfig({
    content: {
        filesystem: [
            './styles/*.{html,js,ts,jsx,tsx,vue,svelte,astro}',
            './*.md'
        ]
    }
})