/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      "primary-black": "#111111",
      "cta-green": "#ADC837",
      "cta-darkgreen": "#79A03F",
      link: "#6B83B3",
      white: "#FFFFFF",
      error: "#E0442F",
      required: "#D19841",
      "input-field": "#8C867E",
      "dark-blue": "#314863",
      divider: "#E6E6E6",
      "light-gray": "#F2F2F2",
    },
    extend: {},
  },
  plugins: [],
};
