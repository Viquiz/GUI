import { values } from '@fluentui/utilities'
import React, { useEffect, useState } from 'react'
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
		h-11
		inline-flex
		justify-start
		items-center
		border-2
		border-gray-400
		focus-within:border-button-primary
		`} >
			<IconContext.Provider value={{className:`${focus?"w-0":""} duration-200 my-1 mx-2`}}>
			{props.icon?<props.icon/>:undefined}
			</IconContext.Provider>
		
		<input onChange={(e)=>{
			props.callback?.(e.target.value)
		}} className="ml-3 flex-1 outline-none border-box"
		type="text" placeholder={props.placeholder}/>
		</div>
	)
}

export { SearchBox}
