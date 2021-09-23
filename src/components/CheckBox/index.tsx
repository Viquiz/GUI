import React, { useEffect, useRef, useState } from 'react'
import { VscCheck } from 'react-icons/vsc'
interface CheckBoxPROPS
{
	label?:string
	labelLeft?:Boolean
	onChange?:(checked:boolean)=>void
	checked?:boolean
	[key:string]:unknown
}
const CheckBox:React.FC<CheckBoxPROPS> = (props) => {
	const [checked,setChecked] = useState(props.checked);
	const [firstRender,setFirstRender] = useState(true);
	useEffect(()=>{
		if(firstRender) {
			setFirstRender(false);
			
		}
		else
			props.onChange?.(checked as boolean)
	},[checked])
	useEffect(()=>{
		setChecked(props.checked)
	},[props.checked])
	return (
		<label className="align-middle inline-flex justify-start items-center">
			{props.labelLeft?props.label:undefined}
			<input className="w-0 h-0 opacity-0" onClick={(ev)=>{
				setChecked(_checked => (ev.target as HTMLInputElement).checked)
			}} type="checkbox"/>
			<div className={`${props.className} w-6 h-6 ${props.label?(props.labelLeft?"ml-2":"mr-2"):""} flex justify-center items-center border text-white border-gray-700 rounded-sm ${checked?"bg-button-primary":"hover:bg-gray-200 hover:bg-opacity-75"}`}>
				{checked?<VscCheck style={{strokeWidth: "3px"}}/>:undefined}
			</div>
			{props.labelLeft?undefined:props.label}
		</label>
	)
}

export {CheckBox}