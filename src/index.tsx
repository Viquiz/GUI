import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/navbar/navbar';
import {  Switch, Route, HashRouter} from 'react-router-dom';
import "./style/tailwind.css";
import App from "./App";
import QuizManager from"@pages/quiz/QuizManager";
import QuizEditor from '@pages/quiz/QuizEditor';
import {ImBook, ImQuestion} from "react-icons/im"
import {BsGearFill} from "react-icons/bs";
import Setting from '@pages/setting/Setting';
import TitleBar from "@components/windowControl"
const MenuItems = [{
	id:0,
	to:"/Quiz",
	display:"Quiz",
	component: QuizManager,
	icon: <ImBook/>,
	exact:true
},
{
	id:10,
	to:"/Quiz/:id",
	component: QuizEditor,
},
{
	id:1,
	to:"/QuizEditor",
	display:"All Question",
	component: QuizEditor,
	icon: <ImQuestion/>,
<<<<<<< HEAD
=======
	exact:true
>>>>>>> 17516755976e8b7aae93de3c0199af9ed4b6373c
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

		note: HashRouter added annoying # in the front of the link  
		*/}
		<TitleBar title="Viquiz"/>
		<HashRouter>
			<div className="h-content flex justify-start items-center">
				<NavBar MenuItems={MenuItems}/>
				<App MenuItems={MenuItems}/>
			</div>
		</HashRouter>
		</>	
	</React.StrictMode>,
	document.getElementById('root')
  );