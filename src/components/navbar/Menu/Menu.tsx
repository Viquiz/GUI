import React from 'react';

const Menu =(props:any)=>
{
	return (
		<ul className={`flex justify-start h-full flex-col items-start text-white w-full`}>
			{props.children}
		</ul>

	);
}

export default Menu;