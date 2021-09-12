import React from 'react';
// import ReactDOM from 'react-dom';
// import NavBar from './components/navbar/navbar';
import Home from './pages/home/home';
import {Switch,Route, Redirect } from "react-router-dom";
import PouchDB from 'pouchdb';
import Setting from './pages/setting/Setting';
//open or create a new DB if not ex 
var database = new PouchDB('http://localhost:5984/testdB');

// save some thing
// const doc = {
// 	"_id": "mittens",
// 	"name": "Mittens",
// 	"occupation": "kitten",
// 	"age": 3,
// 	"hobbies": [
// 	  "playing with balls of yarn",
// 	  "chasing laser pointers",
// 	  "lookin' hella cute"
// 	]
//   }
// database.put(doc);

//get data
database.get('mittens').then(function (doc) {
	console.log(doc);
});

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