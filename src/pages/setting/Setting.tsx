import React from 'react'
import { FaFilter, FaReact } from 'react-icons/fa'
import { Route } from 'react-router-dom'
import Button from '@components/button/button'
import {DropDown,DropDownItems} from '@components/DropDownButton/DropDownButton'
import {ToggleButton} from '@components/ToggleButton/ToggleButton'

const items:any =[{
	icon:FaFilter,
	text:"filter"
},
{
	icon:FaReact,
	text:"Test"
},]
export default function Setting(props:any) {
	return (<div className="align-top">
		<DropDown 
		style={{width:"fit-content !important"}} 
		disabled={false} 
		onClick={()=>alert("123")}
		text="filter"
		className="text-black bg-pink-500"
		icon={FaFilter}
		>
			
			<ul className="text-button-primary">
				{items.map((item:any,index:number) =>{
					return <DropDownItems key={index} icon={item.icon}>{item.text}</DropDownItems>
				})}
			</ul>
		</DropDown>
		<Button disabled={false} className="bg-button-primary" text="Click me" onClick={(ev)=> {
			alert("clicked")
		} }/>
		<ToggleButton onToggle={(value:boolean)=>{ alert(value)}} 
		label={'Hello'}
		label_off={'off'}
		
		/>
		</div>
	)
}
