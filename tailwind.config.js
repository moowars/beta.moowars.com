module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: "#215653",
        "light-green": "#33B174",
        "dark-green": "#102525",
        offwhite: "#F4F2EA",
        maroon: "#621732",
      },
      fontFamily: {
        cinder: "Cinder",
        "lexend-deca": "Lexend Deca",
        "lexend-exa": "Lexend Exa",
        cenotaph: "cenotaphtitling",
      },
    },
  },
  plugins: [],
};
