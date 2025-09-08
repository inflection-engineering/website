import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{njk,md}",
  ],
  theme: {
    extend: {}
  },
  plugins: [daisyui],
  daisyui: {},
};