import React from 'react';

const SideBarFooter =(props:any)=>
{
	return (
		<section className={"w-full h-50px border-t-1 flex items-center justify-center"}>
			{props.children}
		</section>

	);
}

export default SideBarFooter;