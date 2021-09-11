import React from 'react';
import * as faIcons from "react-icons/fa";
const style = {
	flex:1,
}
const Home = (props:any) =>
{
	return( 
		<p>{props.match.url}
		<div> auto connect to device </div>
		<div> some recenly used game (set of Question) 	</div>
		<div> some recenly make game 	</div>
		</p>
	);
}
	


export default Home;