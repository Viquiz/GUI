import { values } from '@fluentui/utilities'
import React, { useState } from 'react'
import { IconContext, IconType } from 'react-icons'
import { VscSearch } from 'react-icons/vsc'

interface SearchBoxProps
{
	placeholder?:string
	callback?:(value:string) => void
	icon?:IconType
	[key:string]:unknown
}
const SearchBox:React.FC<SearchBoxProps> = (props) => {

	const [focus,setFocus] = useState(false)
	
	return (
		<div
		onBlur={()=>{setFocus(false)}}
		onFocus={()=>{setFocus(true)}}
		className={`
		${props.className || ""}
		align-middle
		h-9
		inline-flex
		justify-start
		items-center
		border-2
		border-gray-400
		focus-within:border-button-primary
		`} >
			<IconContext.Provider value={{className:`${focus?"w-0":""} duration-200 my-1 mx-2`}}>
			{props.icon?<props.icon/>:<VscSearch/>}
			</IconContext.Provider>
		
		<input onChange={(e)=>{
			props.callback?.(e.target.value)
		}} className="w-28 outline-none border-box"
		type="text" placeholder={props.placeholder}/>
		</div>
	)
}

export { SearchBox}
