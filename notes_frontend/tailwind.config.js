module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        secondary: "#6366F1",
        accent: "#F59E42",
        background: "var(--background)",
        foreground: "var(--foreground)"
      }
    },
  },
  plugins: [],
};
