import {defineConfig} from "vitest/config";
import react from "@vitejs/plugin-react";
import {getViteConfig} from "./src/_server/helpers.ts";
import {visualizer} from "rollup-plugin-visualizer";
import type {PluginOption} from "vite";

export default ({mode}) => {
  const {VITE_BASE_URL, VITE_LOCAL_PORT, VITE_LOCAL_SERVER_PORT} =
    getViteConfig(mode);

  const PROD = mode === "production";

  if (!VITE_BASE_URL)
    throw new Error("vite.config: VITE_BASE_URL is undefined");
  if (!PROD) {
    if (!VITE_LOCAL_PORT)
      throw new Error("vite.config: VITE_LOCAL_PORT is undefined");
    if (!VITE_LOCAL_SERVER_PORT)
      throw new Error("vite.config: VITE_LOCAL_SERVER_PORT is undefined");
  }

  return defineConfig({
    base: VITE_BASE_URL,
    plugins: [
      react(),
      visualizer({
        filename: `./build/stats.html`,
        // open: true,
        gzipSize: true,
        brotliSize: true,
      }) as PluginOption,
    ],
    server: {
      port: parseInt(VITE_LOCAL_PORT, 10),
    },
    preview: {
      port: parseInt(VITE_LOCAL_SERVER_PORT, 10),
    },
    build: {
      outDir: "build",
    },
    test: {
      environment: "jsdom",
      setupFiles: ["./src/tests/vitestSetup.ts"],
      globals: true,
    },
  });
};
