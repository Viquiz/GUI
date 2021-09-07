// import * as PouchDB from 'pouchdb';
import PouchDB from 'pouchdb';
import React from 'react';
import ReactDOM from 'react-dom';
// import "./style/tailwind.css"
import "./components/navbar/navbar.tsx"
import NavBar from './components/navbar/navbar';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

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

class App extends React.Component
{
	render() {
		return(
			// this is ... the real main =)
			<main style = {{position: 'fixed', right: "0", width: "calc(100vw - 200px)",}}>
			<Switch>

			<Route path = "/libraries">
				 <h1>Libraries page</h1>
	  		</Route>

			<Route path = "/Devices">
				 <h1>Devices page</h1>
	  		</Route>

			<Route path = "/">
				 <h1>index page</h1>
	  		</Route>

			</Switch>
			</main>
		);
	}
}

ReactDOM.render(
	<React.StrictMode>
		<>
		<BrowserRouter>	
		 {/* should move NavBar outside main ...  */}
		 <NavBar/>
		  <App/>
		</BrowserRouter>
		</>
	</React.StrictMode>,
	document.getElementById('root')
  );