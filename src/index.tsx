import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/navbar/navbar';
import {  Switch, Route, HashRouter} from 'react-router-dom';
import "./style/tailwind.css";
import App from "./App";
import QuizManager from"./pages/quiz/QuizManager";
import {ImBook} from "react-icons/im"
import {BsGearFill} from "react-icons/bs";
import Setting from './pages/setting/Setting';

const MenuItems = [{
	id:0,
	to:"/Quiz",
	display:"Quiz",
	component: QuizManager,
	icon: <ImBook/>,
	exact:true
},
{
	to:"/Quiz/:id",
	component: QuizManager,
},
{
	id:2,
	to:"/Setting",
	display:"Setting",
	component: Setting,
	icon: <BsGearFill/>
},
]
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
			<NavBar MenuItems={MenuItems}/>
			<App MenuItems={MenuItems}/>
		</HashRouter>
		</>	
	</React.StrictMode>,
	document.getElementById('root')
  );