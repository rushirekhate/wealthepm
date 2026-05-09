import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  esbuild: {
    target: "esnext",
  },

  build: {
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 900,
    assetsInlineLimit: 4096,

    target: "esnext",
    minify: "terser",

    rollupOptions: {
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",

        manualChunks: (id) => {
          if (
            id.includes("react") ||
            id.includes("react-dom") ||
            id.includes("react-router-dom")
          ) {
            return "vendor-react";
          }

          if (id.includes("gsap") || id.includes("framer-motion")) {
            return "vendor-animation";
          }

          if (id.includes("react-icons") || id.includes("lucide-react")) {
            return "vendor-icons";
          }

          if (id.includes("three") || id.includes("@react-three")) {
            return "vendor-three";
          }

          if (id.includes("@emailjs")) {
            return "vendor-email";
          }
        },
      },
    },
  },
});