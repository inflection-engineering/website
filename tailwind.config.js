import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{njk,md}",
    "./eleventy.config.js"
    
  ],
  theme: {
    extend: {}
  },
  plugins: [daisyui],
  daisyui: {},
};