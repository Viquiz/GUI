import React from 'react'
import { IconContext, IconType } from 'react-icons';


export interface listPROPS
{
	icon?:IconType
	onClick?:React.MouseEventHandler
	[key: string]: unknown
}

export const DropDownItems:React.FC<listPROPS> = (props)=>{
	return(	
		<li
		className="w-full h-titleBar 
		text-left hover:bg-button-hover
		flex justify-start items-center 
		text-inherit
		"
		onClick={props.onClick}>
			<IconContext.Provider value={{size:"1.15em",className:"mx-2"}}>
				{props.icon?<props.icon/>:null}
			</IconContext.Provider>
			<span className="text-inherit">{props.children}</span>
		</li>
	);
}