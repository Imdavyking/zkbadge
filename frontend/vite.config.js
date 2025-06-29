import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import rollupNodePolyFill from "rollup-plugin-polyfill-node";
import { nodePolyfills } from "vite-plugin-node-polyfills";
// https://vite.dev/config/

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    nodePolyfills({
      include: ["process", "util", "path"],
    }),
  ],
  define: {
    "process.env": {},
    global: "globalThis",
  },
  resolve: {
    alias: {
      // path: "path-browserify",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          // buffer: true,
          process: false,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
    },
  },
});
