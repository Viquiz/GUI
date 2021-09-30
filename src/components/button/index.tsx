import React, { CSSProperties, useEffect, useRef } from 'react'
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { IconType } from 'react-icons';
export interface Button_PROPS
{
	disabled?:boolean
	text?:string
	icon?:IconType
	onClick:React.MouseEventHandler
	className?:string
	//[key: string]:unknown
}
const Button:React.FC<Button_PROPS> = (props) => {
	const btn = useRef<HTMLButtonElement|null>(null)
	useEffect(()=>{
		
	},[])

	return (
		<button onClick={(ev)=>{ev.preventDefault();props.onClick(ev)}} disabled={props.disabled} ref={btn} 
		className={`
		${props.disabled?"pointer-events-none":""}		
		align-middle
		disabled:cursor-default disabled:bg-button-disabled 
		active:shadow-button 
		rounded-sm
		min-w-min
		${props.className ?? ""}
		`}>
			<div className={`
			${props.disabled?"pointer-events-none":""}
			w-full h-full
			inline-flex justify-center items-center 
			hover:bg-opacity-20
			hover:bg-gray-50
			`}>
				{props.icon?<props.icon/>:undefined}
				{props.text && props.text !==""?<span className={`${props.icon?"ml-2":""}`}>{props.text}</span>:undefined}
			</div>
		</button>
		// <PrimaryButton text="Standard" onClick={()=>alert("click")} allowDisabledFocus disabled={false} checked={false}/>
	);
}	
export { Button }
