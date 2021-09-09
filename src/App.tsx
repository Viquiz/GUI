import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/navbar/navbar';
import Home from './pages/home/home';
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";

const style = {
	flex:1
};

const App= (props: any) =>
{
	return(
		<main style = {style}>
			{props.children}
		</main>
	);
}

export default App;