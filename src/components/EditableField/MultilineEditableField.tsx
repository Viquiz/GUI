
import React, { ChangeEvent,FocusEvent, MouseEvent, useRef } from 'react';
interface MultiLineFieldPROPS{
	onChange:(evt:ChangeEvent<HTMLTextAreaElement>) => void
	value?:string
	defaultValue?:string
	[key:string]:unknown
}
export function MultilineEditableField({value,defaultValue,onChange,...props}:MultiLineFieldPROPS){
	function onClickHandler(evt:MouseEvent)
	{
		const target = evt.target as HTMLTextAreaElement;
		evt.preventDefault();
		if(evt.detail === 1)
		{
			target.blur();
		}
		if(evt.detail === 2)
		{
			target.readOnly = false;
			const end = target.selectionEnd;
			target.setSelectionRange(end,end); 
		}
	}
	function lostFocusHandler(evt:FocusEvent){
		const target = evt.target as HTMLTextAreaElement;
		target.readOnly=true;
	}
return (

	<textarea placeholder="double click to edit"  value={value} readOnly={true} onBlur={lostFocusHandler} onClick={onClickHandler} className={`${props.className}`} onChange={onChange}></textarea>
);
}