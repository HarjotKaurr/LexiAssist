import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/' : '/',
  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: true,
    hmr: {
      clientPort: 443,
    },
  },
  plugins: [
    react({
      jsxImportSource: 'react'
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'process.env': {}
  },
  optimizeDeps: {
    esbuildOptions: {
      // Enable JSX in .js files
      loader: { '.js': 'jsx' },
    },
  },
  esbuild: {
    jsx: 'automatic',
  },
}));
