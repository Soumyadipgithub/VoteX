import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcssAnimate from 'tailwindcss-animate';

export default defineConfig({
  plugins: [
    react(), // React plugin for Vite
    tailwindcssAnimate(), // Tailwind CSS animate plugin
  ],
});
