module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#ff0000",
        secondary: "red",
        three: '#b5e745',
        four: '#4f4f4f',
        five: '#FF4D00',
        background: {
          DEFAULT: "#0F1416",
          lighter: '#263238',
          darker: "#0B0E0F",
        }
      },
      spacing: {
        in: 'inherit'
      },
      maxHeight: {
        106: '34rem'
      },
      maxWidth: {
        106: '34rem',
        "1/4": "25%",
      },
      width: {
        106: '34rem'
      },
      minHeight: {
        1: '1rem',
        2: '2rem',
        3: '3rem',
        4: '4rem',
        5: '5rem',
        11: "9.5rem",
        12: '11rem',
        106: '34rem'
      },
      minWidth: {
        36: '9rem',
        "1/4": "25%",
      },
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      }
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
      borderRadius: ["group-hover"],
      visibility: ["group-hover"],
      zIndex: ["hover"],
      opacity: ['disabled'],
      border: ['first', 'last'],
      borderColor: ['focus-visible', 'first'],
      borderWidth: ['first', 'last']
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp") 
  ],
  mode: 'jit',
}
