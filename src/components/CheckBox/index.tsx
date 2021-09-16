import React, { useEffect, useRef, useState } from 'react'
import { VscCheck } from 'react-icons/vsc'
interface CheckBoxPROPS
{
	label?:string
	labelLeft?:Boolean
	onChange?:(checked:boolean)=>void
	[key:string]:unknown
}
const CheckBox:React.FC<CheckBoxPROPS> = (props) => {
	const [checked,setChecked] = useState(false)
	useEffect(()=>{
		props.onChange?.(checked)
	},[checked])
	return (
		<label className="align-middle inline-flex justify-start items-center">
			{props.labelLeft?props.label:undefined}
			<input className="w-0 h-0 opacity-0" onClick={(ev)=>{
				setChecked(_checked => (ev.target as HTMLInputElement).checked)
			}} type="checkbox"/>
			<div className={`w-6 h-6 ${props.labelLeft?"ml-2":"mr-2"} flex justify-center items-center border text-white border-gray-700 rounded-sm ${checked?"bg-button-primary":"hover:bg-gray-200"}`}>
				{checked?<VscCheck style={{strokeWidth: "3px"}}/>:undefined}
			</div>
			{props.labelLeft?undefined:props.label}
		</label>
	)
}

export {CheckBox}