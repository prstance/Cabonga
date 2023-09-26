import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import unocssPlugin from "unocss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [
    unocssPlugin(),
    solidPlugin()
  ],
  server: {
    port: 3000
  },
  build: {
    target: "esnext"
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
});