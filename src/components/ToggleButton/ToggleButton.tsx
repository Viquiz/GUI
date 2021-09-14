import React, { useEffect, useMemo, useRef, useState } from 'react'
import "./toggleButton.scss"

interface ToggleBtnPROPS
{
	label:string
	label_off?:string
	disabled?:boolean
	onToggle?: (value:boolean) => any
	[key:string]:unknown
}
const circle = {
	radius: 0
}
const ToggleButton:React.FC<ToggleBtnPROPS> = (props) => {
	const [value,setValue] = useState<boolean>(Boolean(props.disabled))
	
	const firstMount = useRef<boolean>(true)
	useEffect(()=>{
		console.log(firstMount.current)
		if(!firstMount.current)
		{			
		}
		else{
			firstMount.current = false;
		}
		
	},[value])
	function toggleState()
	{
		setValue(value=>!value)
	}
	function ChangeLabel()
	{
		if(props.label)
			if(props.label_off)
				return <span className={`align-middle ${value?"text-black":"text-gray-600"}`}>{value?props.label:props.label_off}</span>
			else
				return <span className="align-middle text-gray-600">{props.label}</span>
		return undefined
	}
	return (
		<div className="inline-block">
			<button onClick={!props.disabled?toggleState:undefined}
			className={`align-middle
			h-5 w-10
			inline-flex justify-start items-center
			border border-gray-900
			rounded-full
			${value?"bg-button-primary":"bg-gray-300-400"}
			duration-500
			overflow-hidden
			relative
			mr-1
			`}
			>
				<div className={`		
				h-3 w-3 rounded-full 
				absolute
				transform -translate-y-1/2
				top-1/2
				duration-500
				${value?"bg-white right-1 ":
				"bg-gray-600 left-1"}
				`}></div>
			</button>
			{ChangeLabel()}
		</div>
	)
}

export {
	ToggleButton
}