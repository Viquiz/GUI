import React from 'react';
const style = {
	flex:1
};

const App= (props: any) =>
{
	return(
		<main style = {style}>
			{props.children}
		</main>
	);
}

export default App;