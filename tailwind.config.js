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
          primary:"rgba(52, 152, 219,1.0)",
          disabled:"rgba(127, 140, 141,1.0)",
          hover:"rgba(41, 128, 185,1.0)"
        }
      },
      boxShadow:{
        button:"inset 0 0 5px rgba(0,0,0,0.35)"
      }
    },
  },
  variants: {
    extend: {
      width: ["hover"],
      backgroundColor: ["disabled"],
      cursor:["disabled"],
      boxShadow: ['active'],
      scale:['active'],
      transform:['active']
    },
  },
  plugins: [],
}
