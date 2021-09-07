import React from 'react';
import ReactDOM from 'react-dom';
// import "./style/tailwind.css"
import "./components/navbar/navbar.tsx"
import NavBar from './components/navbar/navbar';
import { BrowserRouter} from 'react-router-dom';
ReactDOM.render(
  <React.StrictMode>
	  <>
	  <BrowserRouter>
	  	<NavBar/>
	  </BrowserRouter>
	  </>
  </React.StrictMode>,
  document.getElementById('root')
);