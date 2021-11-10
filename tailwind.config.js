module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: true, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        // 'landing-screen-door': "url('./static/img/Landing_screen1.png')",
        // 'landing-screen-light': "url('./static/img/Landing_screen1_light.png')"
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
