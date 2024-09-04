/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        thin: ["Roboto-Thin"],
        light: ["Roboto-Light"],
        regular: ["Roboto-Regular"],
        medium: ["Roboto-Medium"],
        bold: ["Roboto-Bold"],
        black: ["Roboto-Black"],
      },
    },
  },
  plugins: [],
};
