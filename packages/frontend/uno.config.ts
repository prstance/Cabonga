import { defineConfig, presetUno, transformerVariantGroup } from "unocss";

export default defineConfig({
  presets: [
    presetUno()
  ],

  transformers: [
    transformerVariantGroup()
  ],

  theme: {
    fontFamily: {
      sans: "Inter"
    },
    colors: {
      primary: "#0069FD",
      secondary: "#48F861",
      gray1: "#797777",
      gray2: "#D9D9D9",
      gray3: "#C5C5C5"
    }
  }
});