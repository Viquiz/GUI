import React from 'react';
// import ReactDOM from 'react-dom';
// import NavBar from './components/navbar/navbar';
import Home from './pages/home/home';
import {Switch,Route } from "react-router-dom";
import PouchDB from 'pouchdb';
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
	flex:1
};

const App= (props: any) =>
{
	return(
		<main style = {style}>
			{/* {props.children} more clear*/} 
				<Switch>				
					<Route path="/Home" component={Home}/>
					<Route path="/devices" component={Home}/>
					<Route path="/setting" component={Home}/>
				</Switch>
		</main>
	);
}

export default App;