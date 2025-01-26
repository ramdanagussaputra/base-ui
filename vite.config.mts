import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    dts({
      rollupTypes: true,
      exclude: ["src/*"],
      tsconfigPath: resolve(__dirname, "tsconfig.app.json"),
    }),
  ],
  build: {
    // Library entry and output settings
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      name: "massive-base-ui",
      fileName: "massive-base-ui",
    },
    // Bundler options
    // Externalize react-related imports
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime",
        },
      },
    },
  },
});
