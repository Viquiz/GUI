import React, { CSSProperties, useEffect, useRef } from 'react'
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { IconType } from 'react-icons';
interface Button_PROPS
{
	disabled?:boolean
	text?:string
	icon?:IconType
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
		disabled:cursor-default disabled:bg-button-disabled 
		active:shadow-button 
		rounded-sm
		min-w-min
		`}>
			<div className={`
			${props.disabled?"pointer-events-none":""}
			w-full h-full
			inline-flex justify-center items-center 
			hover:bg-opacity-20
			hover:bg-gray-900
			`}><span>{props.text?props.text:""}</span>{props.icon && <props.icon/>}</div>
		</button>
		// <PrimaryButton text="Standard" onClick={()=>alert("click")} allowDisabledFocus disabled={false} checked={false}/>
	);
}	
export default Button
