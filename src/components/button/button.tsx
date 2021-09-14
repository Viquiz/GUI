import React, { CSSProperties, useEffect, useRef } from 'react'
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
interface Button_PROPS
{
	disabled?:boolean
	text?:string
	onClick:React.MouseEventHandler
	[key: string]:unknown
}
const Button:React.FC<Button_PROPS> = (props) => {
	const btn = useRef<HTMLButtonElement|null>(null)
	useEffect(()=>{
		
	},[])

	return (
		<button onClick={props.onClick} disabled={props.disabled} ref={btn} 
		className={`
		${props.disabled?"pointer-events-none":""}
		${props.className || ""}
		align-middle
		h-11 
		disabled:cursor-default disabled:bg-button-disabled 
		active:shadow-button 
		 rounded-sm
		min-w-min
		w-100px
		`}>
			<div className={`
			${props.disabled?"pointer-events-none":""}
			w-full h-full
			inline-flex justify-center items-center 
			hover:bg-opacity-20
			hover:bg-gray-900
			`}><span className="align-middle">{props.text?props.text:""}</span></div>
		</button>
		// <PrimaryButton text="Standard" onClick={()=>alert("click")} allowDisabledFocus disabled={false} checked={false}/>
	);
}	
export default Button
