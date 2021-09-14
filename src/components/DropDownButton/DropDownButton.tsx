import React, { CSSProperties, ReactElement, useState } from 'react'
import { IconContext, IconType } from 'react-icons'
import { VscChevronDown } from 'react-icons/vsc'
import "./dropDown.scss"
import { listPROPS } from './DropDownMenu/DropDownItems'
import { DropDownMenu } from './DropDownMenu/DropDownMenu'
export { DropDownItems } from './DropDownMenu/DropDownItems'

interface DropDown_PROPS
{
	icon?:IconType
	text?:string
	disabled?:boolean
	style?:CSSProperties
	children?:ReactElement<listPROPS>
	[key:string]:unknown
}
export const DropDown:React.FC<DropDown_PROPS> = (props)=>{

	const [isActive,setActive] = useState<Boolean>(false)
	return(
	<button style={props.style} 
	onClick={props.items?undefined:()=>setActive(_isActive => !_isActive)}
	onBlur={()=>setActive(_isActive=> false)}
	disabled={props.disabled} 
	className={`${props.className}
	align-middle
	h-11 inline-flex justify-center items-center 
	disabled:cursor-default disabled:bg-button-disabled 
	active:shadow-button
	min-w-max 
	border border-blue-900
	font-semibold
	relative
	`}>
			<div 
			className={`
			p-3
			h-full
			w-full
			flex justify-center items-center
			hover:bg-opacity-20
			${isActive?"":"hover:bg-gray-900"}
			`}>
				<IconContext.Provider value={{size:".9em",className:"mr-1"}}>
					{props.icon?<props.icon/>:null}
				</IconContext.Provider>
				
				<div className="pointer-events-none w-fit mr-1">
					{props.text ||""}
				</div>
				<IconContext.Provider value={{className:""}}>
					<VscChevronDown/>
				</IconContext.Provider>
			</div>
			{isActive?
			<DropDownMenu>
				{props.children}
			</DropDownMenu>
			:null}
			
	</button>
	)
}