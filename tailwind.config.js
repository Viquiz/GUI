let titleBar_heigh=30
let sideBar_width=200

module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
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
        titleBar:`${titleBar_heigh}px`,
        sideBar:`${sideBar_width}px`,
      },
      height: {
        
        content:`calc(100vh - ${titleBar_heigh}px)`
      },
      width: {
        
        content:`calc(100% - ${sideBar_width}px)`
      }
      ,      
      gridTemplateRows: {
      },
      colors:{
        button: {
          primary:"#ffffff"
        }
      }
    },
  },
  variants: {
    extend: {width: ["hover"]},
  },
  plugins: [],
}
