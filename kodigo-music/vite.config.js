import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/spa-react>/', // Reemplaza <nombre-del-repo> con el nombre de tu repositorio
  plugins: [react()],
});