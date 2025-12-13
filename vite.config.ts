import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Charge les variables d'environnement basées sur le mode (development/production)
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    root: '.',
    build: {
      outDir: 'dist',
      sourcemap: true
    },
    // Cette section remplace process.env.API_KEY par la valeur réelle lors du build
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      // Empêche le crash si d'autres process.env sont accédés
      'process.env': {} 
    }
  };
});