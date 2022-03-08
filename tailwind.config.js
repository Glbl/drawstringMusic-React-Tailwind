module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'],
        'epilogue': ["Epilogue", "sans-serif"]
      },
      colors: {
        primary: "#58BDFF",
        secondary: "#8D96BC",
        secondaryDark: "#373B3D",
        grayText: "#8395A7",
        card1: "#D5EFF7",
        card2: "#F4F3EB",
        card3: "#E5E3F7",
        body: "#413C5F",
        trackHover: '#242C46',
        lightGrayBackground: "#F6F8F9",
        background: "#2c323e"
      },
      lineHeight: {
        4.5: '1.125rem',
      },
      backdropBlur: {
        pBoard: "50px",
      },
      boxShadow: {
        "stop-btn-bg": "0px 2px 35px #c92efa",
      },
        spacing: {
        4.5: "1.125rem",
      },
      minWidth: {
        'how-it': '500px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
