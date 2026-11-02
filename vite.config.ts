import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "next/link": path.resolve(__dirname, "src/compat/link.tsx"),
      "next/image": path.resolve(__dirname, "src/compat/image.tsx"),
      "next/navigation": path.resolve(__dirname, "src/compat/navigation.ts"),
      "next/dynamic": path.resolve(__dirname, "src/compat/dynamic.tsx"),
      "next/font/google": path.resolve(__dirname, "src/compat/fonts.ts"),
    },
  },
});
