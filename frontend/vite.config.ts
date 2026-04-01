import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // React-resolver
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),

      // Path aliases
      "/@features": path.resolve(__dirname, "src/features"),
      "/@components": path.resolve(__dirname, "src/components"),
      "/@hooks": path.resolve(__dirname, "src/hooks"),
      "/@pages": path.resolve(__dirname, "src/pages"),
      "/@assets": path.resolve(__dirname, "src/assets")
    },
  },
});