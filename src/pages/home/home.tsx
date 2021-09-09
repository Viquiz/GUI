import React from 'react';
import * as faIcons from "react-icons/fa";
const style = {
	flex:1,
}
const Home = (props:any) =>
{
	return( 
		<p>{props.match.url}</p>
	);
}
	


export default Home;