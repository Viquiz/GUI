import React from 'react';
// import ReactDOM from 'react-dom';
// import NavBar from './components/navbar/navbar';
import Home from './pages/home/home';
import {Switch,Route, Redirect } from "react-router-dom";
import Setting from './pages/setting/Setting';

const style = {
	flex:1,
	height:"100%",
	overflow:"hidden",
	
};

const App= (props: any) =>
{
	return(
		<main className="w-content h-content ml-sideBar overflow-hidden">
				<Switch>				
					{props.MenuItems.map((item:any) =>
					{
						return <Route strict={item.strict} exact={item.exact} key={item.to} path={item.to} component={item.component}/>
						
					})}
					<Route exact path="/">
						<Redirect to={`${props.MenuItems[0].to}`} />
					</Route>
				</Switch>
		</main>
	);
}

export default App;