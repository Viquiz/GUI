import PouchDB from 'pouchdb';
import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/navbar/navbar';
import { BrowserRouter, Switch, Route, HashRouter} from 'react-router-dom';
import "./style/tailwind.css";
import App from "./App";
import Home from './pages/home/home';


// // run here not a good idea ... but where xD ?
let db = new PouchDB("localDB");

//some data
let data = {
	_id: 'mydoc',
	title: 'Heroes'
  };

//save to local ... who care where is it 
db.put(data).then(function (response) {
	// handle response
  }).catch(function (err) {
	console.log(err);
  });

//get data ( by _id)
db.get('mydoc').then(function (doc) {
	// handle doc
	console.log("from local database");
	console.log(doc);
  }).catch(function (err) {
	console.log(err);
  });

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
				<Route path="/Home" component={Home}/>
			</App>
		</HashRouter>
		</>
	</React.StrictMode>,
	document.getElementById('root')
  );