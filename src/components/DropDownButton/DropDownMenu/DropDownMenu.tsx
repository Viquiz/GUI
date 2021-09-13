import React, { ReactElement } from 'react'
import {DropDownItems,listPROPS} from "./DropDownItems"

interface DropDownMenu_PROPS{
	children?:ReactElement<listPROPS>|ReactElement<listPROPS>[]
}

export const DropDownMenu:React.FC<DropDownMenu_PROPS>= (props)=> {
	return (
		<ul
			className={`
			shadow-lg
			absolute top-full left-0
			overflow-hidden
			text-black
			items
			w-full
			max-h-0
			animation
			`}>
			{props.children}	
		</ul>
	)
}
