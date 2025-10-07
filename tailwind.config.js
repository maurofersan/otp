/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "santander-red": "#dc3545",
        "santander-red-dark": "#c82333",
        "santander-gray": "#6c757d",
        "santander-light-gray": "#f8f9fa",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        button: "12px",
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.1)",
        "card-hover": "0 4px 12px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
