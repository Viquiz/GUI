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
		className={`min-w-max h-10
		font-normal
		${props.className || ""}
		`}
		onClick={props.onClick}>
			<div className="
			p-1
			h-full
			hover:bg-opacity-20
			hover:bg-gray-900
			flex justify-start items-center 
			">
				
				<IconContext.Provider value={{size:"0.9em",className:"mx-2"}}>
					{props.icon?<props.icon/>:null}
				</IconContext.Provider>
				<span className="text-inherit mr-2">{props.children}</span>
			</div>
		</li>
	);
}