
import React, { ChangeEvent,FocusEvent, MouseEvent, useRef } from 'react';
import styled from 'styled-components';
interface SingleFieldPROPS{
	onChange:(evt:ChangeEvent<HTMLInputElement>) => void
	value?:string
	defaultValue?:string
	[key:string]:unknown
}

const padding = 0.5;
const StyledInput = styled.input`
  padding: ${padding}rem;
  margin: 0;
  outline: none;
  /* added styles */
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  position: absolute;
  vertical-align: top;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  text-overflow:ellipsis;
  
`

const StyledLabel = styled.label`
  display:inline-block;
  position: relative;
  padding: ${padding}rem;
`

const StyledSpan = styled.span`
  white-space: pre;
  opacity: 0;

  /* max-width : could be wised to set a maximum width and overflow:hidden; */
`
export function SingleLineEditableField({value,defaultValue,onChange,className,...props}:SingleFieldPROPS){
	function onClickHandler(evt:MouseEvent)
	{
		const target = evt.target as HTMLTextAreaElement;
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

	<StyledLabel className={`${className}`}>
		<StyledSpan>{value || "double click to edit" } </StyledSpan>
		<StyledInput 
		type="text" 
		placeholder="double click to edit"  
		value={value ?? ''} 
		readOnly={true} 
		onBlur={lostFocusHandler} onClick={onClickHandler}  onChange={onChange} {...props}></StyledInput>
	</StyledLabel>
);
}