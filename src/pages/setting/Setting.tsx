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
		className="text-button-primary"
		icon={FaFilter}
		>
			{items.map((item:any,index:number) =>{
				return <DropDownItems key={index} icon={item.icon}>item.text</DropDownItems>
			})}
		</DropDown>
		</>
	)
}
