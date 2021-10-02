let titleBar_heigh=30
let sideBar_width=170

module.exports = {
    purge: {
        enabled: process.env.NODE_ENV === 'production',
        content: [
          // TypeScript
          '*.tsx',
        ]
      },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '1px': '1px',
        '2px': '2px',
        '3px': '3px',
        '4px': '4px',
        '5px': '5px',
        '6px': '6px',
        '7px': '7px',
        '8px': '8px',
        '9px': '9px',
        '10px':'10px',
        '50px': '50px',
        '75px': '75px',
        '100px': '100px',
        '150px': '150px',
        '200px': '200px',
        '250px': '250px',
        '700px': '700px',
        '800px': '800px',
        titleBar:`${titleBar_heigh}px`,
        sideBar:`${sideBar_width}px`,
      },
      height: {
        
        content:`calc(100vh - ${titleBar_heigh}px)`
      },
      minHeight: {
        '14': '14em',
        '16': '16em',
        '20': '20em',
        '24': '24em',
        '26': '6rem',
        '1/2': '50%',
       },
      width: {
        
        content:`calc(100% - ${sideBar_width}px)`
      }
      ,      
      gridTemplateRows: {
      },
      colors:{
        button: {
          primary:"rgba(0, 120, 212,1.0)",
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
      transform:['active'],
      borderWidth: ['hover', 'focus-within'],
      cursor: ['hover', 'focus'],
    },
  },
  plugins: [],
}
