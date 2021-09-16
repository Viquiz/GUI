<<<<<<< HEAD
import React from 'react';
import {Switch,Route, Redirect} from "react-router-dom";


const App= (props: any) =>
{
	return(
		<main className="h-content flex-1 overflow-hidden">
				<Switch>			
						{/*hmmm cemu dont think map like this is a good idea ...  */}
					{props.MenuItems.map((item:any,index:number) =>
					{
						return <Route strict={item.strict} exact={item.exact} key={index} path={item.to} component={item.component}/>	
					})}
=======
import React from "react";
// import ReactDOM from 'react-dom';
// import NavBar from './components/navbar/navbar';
// import Home from './pages/home/home';
import { Switch, Route, Redirect, useParams } from "react-router-dom";
// import Setting from './pages/setting/Setting';

import QuizEditor from "./pages/quiz/QuizEditor";

const style = {
    flex: 1,
    height: "100%",
    overflow: "hidden",
};

const App = (props: any) => {
    return (
        <main className="w-content h-content ml-sideBar overflow-hidden">
            <Switch>
                {/*hmmm cemu dont think map like this is a good idea ...  */}
                {props.MenuItems.map((item: any) => {
                    return (
                        <Route
                            strict={item.strict}
                            exact={item.exact}
                            key={item.id}
                            path={item.to}
                            component={item.component}
                        />
                    );
                })}
>>>>>>> 17516755976e8b7aae93de3c0199af9ed4b6373c

                <Route exact path="/">
                    <Redirect to={`${props.MenuItems[0].to}`} />
                </Route>
            </Switch>
        </main>
    );
};

export default App;
