import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  base: "./",  // This ensures assets are loaded correctly on GitHub Pages
  plugins: [
    react(),
    mode === 'development' && {
      name: 'lovable-tagger',
      transform(code: string, id: string) {
        // Simple implementation without dynamic require
        return code;
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom']
          // Removed the web3 chunk that was causing the build error
        }
      }
    }
  }
}));
