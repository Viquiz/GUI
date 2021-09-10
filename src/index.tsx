import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/navbar/navbar';
import {  Switch, Route, HashRouter} from 'react-router-dom';
import "./style/tailwind.css";
import App from "./App";
import Home from './pages/home/home';

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
			<App>
				<Switch>
					<Route path="/Home" component={Home}/>
				</Switch>
			</App>
		</HashRouter>
		</>
	</React.StrictMode>,
	document.getElementById('root')
  );