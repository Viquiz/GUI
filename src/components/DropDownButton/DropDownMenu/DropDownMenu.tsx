import React, { ReactElement } from 'react'
import {DropDownItems,listPROPS} from "./DropDownItems"

interface DropDownMenu_PROPS{
	children?:ReactElement<listPROPS>|ReactElement<listPROPS>[]
}

export const DropDownMenu:React.FC<DropDownMenu_PROPS>= (props)=> {
	return (
		<div
			className={`
			shadow-lg
			absolute top-full left-0
			overflow-hidden
			items
			w-full
			max-h-0
			animation
			text-inherit
			`}>
			{props.children}	
		</div>
	)
}
