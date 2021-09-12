import React, { useEffect, useRef } from 'react'
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';

const Button:React.FC<any> = (props) => {
	const btn = useRef<HTMLDivElement|null>(null)
	useEffect(()=>{
		
	},[])

	return (
		// <div ref={btn} className="bg-blue-500 w-20 h-11 inline-flex justify-center items-center">
		// 	<div style={{pointerEvents:"none"}}>{React.version}</div>
		// </div>
		<PrimaryButton text="Standard" onClick={()=>alert("click")} allowDisabledFocus disabled={false} checked={false}/>
	);
}	
export default Button
