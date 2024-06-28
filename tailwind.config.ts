import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tmdbLightGreen: "rgba(30, 213, 169)",
        tmdbLightBlue: "rgba(1, 180, 228)",
        tmdbDarkBlue: "#032541",
      },
    },
  },
  plugins: [nextui()],
};
export default config;
