import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 900,
    /* Inline tiny assets (< 4 kB) to save round-trips */
    assetsInlineLimit: 4096,
    /* Target modern browsers for smaller output */
    target: ["es2020", "chrome90", "firefox88", "safari14"],
    rollupOptions: {
      output: {
        /* Keep chunk names stable so CDN/browser cache works */
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
        manualChunks: (id) => {
          /* Core React + router — always needed */
          if (id.includes("react") || id.includes("react-dom") || id.includes("react-router-dom")) {
            return "vendor-react";
          }
          /* Heavy animation libs — load after page paint */
          if (id.includes("gsap") || id.includes("framer-motion")) {
            return "vendor-animation";
          }
          /* Icon packs — defer */
          if (id.includes("react-icons") || id.includes("lucide-react")) {
            return "vendor-icons";
          }
          /* Three.js + R3F — defer */
          if (id.includes("three") || id.includes("@react-three")) {
            return "vendor-three";
          }
          /* emailjs */
          if (id.includes("@emailjs")) {
            return "vendor-email";
          }
        },
      },
    },
  },
});
