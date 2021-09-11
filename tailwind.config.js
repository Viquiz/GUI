module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '25px': '25px',
        '50px': '50px',
        '75px': '75px',
        '100px': '100px',
        '150px': '150px',
        '200px': '200px',
        '250px': '250px',
      },
      gridTemplateRows: {
        // Simple 8 row grid
       'fluentCard': 'repeat(30, 25px)',
      }
    },
  },
  variants: {
    extend: {width: ["hover"]},
  },
  plugins: [],
}
