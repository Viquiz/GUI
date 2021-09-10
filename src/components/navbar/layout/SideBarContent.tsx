import React from 'react';

const SideBarContent =(props:any)=>
{
	return (
		<section className={"flex-1 py-2 border-t border-b border-gray-400 w-full"}>
			{props.children}
		</section>

	);
}

export default SideBarContent;