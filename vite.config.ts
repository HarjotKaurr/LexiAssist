import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(() => ({
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
      jsxImportSource: 'react',
      // Add this to ensure proper JSX runtime handling
      jsxRuntime: 'automatic',
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Add this to ensure proper handling of JSX runtime
  esbuild: {
    jsx: 'automatic',
  },
}));
