import React, { CSSProperties, useEffect, useRef } from 'react'
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
interface Button_PROPS
{
	style?:CSSProperties
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
		<button style={props.style} onClick={props.onClick} disabled={props.disabled} ref={btn} 
		className="bg-button-primary 
		hover:bg-button-hover 
		h-11 inline-flex justify-center items-center 
		disabled:cursor-default disabled:bg-button-disabled 
		active:shadow-button 
		p-3 rounded-sm
		min-w-min
		
		w-100px
		">
			<div style={{pointerEvents:"none",width:"fit-content"}}>{props.text?props.text:""}</div>
		</button>
		// <PrimaryButton text="Standard" onClick={()=>alert("click")} allowDisabledFocus disabled={false} checked={false}/>
	);
}	
export default Button
