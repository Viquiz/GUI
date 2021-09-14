import React, { useState } from 'react'
import { FaFilter, FaReact } from 'react-icons/fa'
import { Route } from 'react-router-dom'
import Button from '@components/button/button'
import {DropDown,DropDownItems} from '@components/DropDownButton/DropDownButton'
import {ToggleButton} from '@components/ToggleButton/ToggleButton'
import { SearchBox } from '@components/SearchBox/SearchBox'

const items:any =[{
	icon:FaFilter,
	text:"filter"
},
{
	icon:FaReact,
	text:"Test"
},]
export default function Setting(props:any) {
	const [test,setTest] = useState("")
	return (<div className="align-top w-full">
		<DropDown 
		disabled={false}
		text="filter"
		className="text-black bg-pink-500"
		icon={FaFilter}
		>	
				{items.map((item:any,index:number) =>{
					return <DropDownItems key={index} icon={item.icon}> {item.text} </DropDownItems>
				})}
			
		</DropDown>
		<Button disabled={false} className="bg-button-primary" text="Click me" onClick={(ev)=> {
			alert(test)
		} }/>
		<ToggleButton onToggle={(value:boolean)=>{ setTest(value.toString())}} 
		label={'Hello'}
		label_off={'off'}
		/>
		<SearchBox callback={(value)=>{
			setTest(_test=> value)
		}} icon={FaReact} placeholder="Search" className="w-36"/>
		</div>
	)
}
