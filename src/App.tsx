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

                <Route exact path="/">
                    <Redirect to={`${props.MenuItems[0].to}`} />
                </Route>
            </Switch>
        </main>
    );
};

export default App;
