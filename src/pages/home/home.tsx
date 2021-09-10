import React from 'react';
const Home = (props:any) =>
{
	return( 
		<p>{props.match.url}</p>
	);
}
	


export default Home;