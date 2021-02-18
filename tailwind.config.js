module.exports = {
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      fontFamily: {
        sans: ["IBM Plex Mono", "Roboto", "Helvetica", "Arial", "sans-serif"],
      },
      fontSize: {
        "vh-xxs": "calc(.5vh + .5rem)",
        "vh-xs": "calc(1vh + .5rem)",
        "vh-sm": "calc(1vh + .875rem)",
        "vh-base": "calc(1vh + 1rem)",
        "vh-lg": "calc(1vh + 1.125rem)",
        "vh-xl": "calc(1vh + 1.25rem)",
        "vh-2xl": "calc(1vh + 1.5rem)",
        "vh-3xl": "calc(1vh + 1.875rem)",
        "vh-4xl": "calc(1vh + 2.25rem)",
        "vh-5xl": "calc(1vh + 3rem)",
        "vh-6xl": "calc(1vh + 4rem)",
        "vh-7xl": "calc(1vh + 5rem)",
        "vw-xxs": "calc(.5vw + .5rem)",
        "vw-xs": "calc(1vw + .5rem)",
        "vw-sm": "calc(1vw + .875rem)",
        "vw-base": "calc(1vw + 1rem)",
        "vw-lg": "calc(1vw + 1.125rem)",
        "vw-xl": "calc(1vw + 1.25rem)",
        "vw-2xl": "calc(1vw + 1.5rem)",
        "vw-3xl": "calc(1vw + 1.875rem)",
        "vw-4xl": "calc(1vw + 2.25rem)",
        "vw-5xl": "calc(1vw + 3rem)",
        "vw-6xl": "calc(1vw + 4rem)",
        "vw-7xl": "calc(1vw + 5rem)",
      },
      transitionDuration: {
        2000: "2000ms",
      },
    },
  },
  variants: {
    margin: ["even", "odd"],
  },
  plugins: [],
};
