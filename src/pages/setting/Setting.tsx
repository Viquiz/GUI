import React from 'react'
import { FaFilter, FaReact } from 'react-icons/fa'
import { Route } from 'react-router-dom'
import Button from '@components/button/button'
import {DropDown,DropDownItems} from '@components/DropDownButton/DropDownButton'


const items:any =[{
	icon:FaFilter,
	text:"filter"
},
{
	icon:FaReact,
	text:"Test"
},]
export default function Setting(props:any) {
	return (<>
		<DropDown 
		style={{width:"fit-content !important"}} 
		disabled={false} 
		onClick={()=>alert("123")}
		text="filter"
		icon={FaFilter}
		items = {items}
		>
			<DropDownItems icon={FaReact}>Test</DropDownItems>
		</DropDown>
		</>
	)
}
