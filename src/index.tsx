import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/navbar/navbar';
import {  Switch, Route, HashRouter} from 'react-router-dom';
import "./style/tailwind.css";
import App from "./App";
import QuizManager from"@pages/quiz/QuizManager";
import GamePlay1 from "@pages/play/game1"
import QuizEditor from '@pages/quiz/QuizEditor';
import QuizEditorV2 from '@pages/quiz/QuizEditorV2';
import {ImBook, ImQuestion} from "react-icons/im"
import {BsGearFill, BsController} from "react-icons/bs";
import Setting from '@pages/setting/Setting';
import TitleBar from "@components/windowControl"
import { QuestionManager } from '@pages/QuestionManager';
import QuizDashBoard from '@pages/quiz/QuizDashBoard';


import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { PartialTheme, ThemeProvider } from '@fluentui/react';
initializeIcons();

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
	component: QuizDashBoard,
},
{
	id:1,
	to:"/QuizEditor",
	display:"All Question",
	component: QuizEditor,
	icon: <ImQuestion/>,
},
{
	id:2,
	to:"/Setting",
	display:"Setting",
	component: Setting,
	icon: <BsGearFill/>
},
{
	id:3,
	to:"/GamePlay1",
	display:"GamePlay1",
	component: GamePlay1,
	icon: <BsController/>
},
]

const myTheme: PartialTheme = {
      };
ReactDOM.render(
	<React.StrictMode>
		{/* 
		HashRouter instead of BrowserRouter
		BrowserRouter use with file protocol has different path base on where the application is located.
		ex:
			executable root: d:\Viquiz\viquiz.exe
			=> url path = d:\Viquiz\ 
			instead of path = "/"

		note: HashRouter added annoying # in the front of the link  
		*/}
		<ThemeProvider theme={myTheme}>
			<TitleBar title="Viquiz"/>
			<HashRouter>
				<div className="h-content flex justify-start items-center">
					<NavBar MenuItems={MenuItems}/>
					<App MenuItems={MenuItems}/>
				</div>
			</HashRouter>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
  );