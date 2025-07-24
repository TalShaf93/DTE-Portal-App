/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette (root‑level keys so `bg-brand-361` works)
        "brand-376": "#A8C94B", // primary lime
        "brand-361": "#79B652", // accent green
        "brand-349": "#1F6F3B", // deep green
        "brand-gray": "#7F7E82", // neutral gray
        // Gradient stops
        "grad-start": "#C0EBD8",
        "grad-end": "#E1FEC1",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg,var(--tw-gradient-stops))",
      },
      borderRadius: {
        lg: "1rem",
      },
    },
  },
  plugins: [],
};