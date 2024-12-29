import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ["react"],
  minify: true,
  banner: {
    js: '"use client";', // Add this if you want to support React Server Components
  },
});
