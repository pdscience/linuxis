import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://linuxis.tec.br',
  server: {
    port: 4321,
    open: true,
  },
  build: {
    format: 'directory',
  },
});
