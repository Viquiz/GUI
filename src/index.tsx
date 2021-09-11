// import PouchDB from 'pouchdb';
import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/navbar/navbar';
import {HashRouter} from 'react-router-dom';
import "./style/tailwind.css";
import App from "./App";
// import path from 'path';

ReactDOM.render(
	<React.StrictMode>
		<>

		{/* 
		HashRouter instead of BrowserRouter
		BrowserRouter use with file protocol has different path base on where the application is located.
		ex:
			executable root: d:\Viquiz\viquiz.exe
			=> url path = d:\Viquiz\ 
			instead of path = "/"
		
		*/}
		<HashRouter>
			<NavBar/>
			{/* <App> */}
	
			<App/>
		</HashRouter>
		</>
	</React.StrictMode>,
	document.getElementById('root')
  );