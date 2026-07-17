import { defineConfig } from "tsdown";

export default defineConfig({
  entry: [
    "src/transition.ts",
  ],
  format: "esm",
  dts: true,
  sourcemap: true,
  clean: true,
  unbundle: true,
});
