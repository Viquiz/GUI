import React, { ReactElement } from 'react'
import {Button,Button_PROPS} from '@components/button'

interface ButtonBarPROPS{
	children:React.ReactElement<Button_PROPS>|Array<ReactElement<Button_PROPS>>
	className?:string
}
const ButtonBar:React.FC<ButtonBarPROPS> = (props)=>{
		return (
			<div style={{
				gridTemplateColumns:`repeat(${React.Children.count(props.children)},1fr)`,
				gridAutoRows:`100%`
			}}
			className={`${props.className} h-10 grid
			absolute transform -translate-y-1/2 z-50
			rounded-lg
			overflow-hidden
			w-52
			divide-x
			divide-gray-700
			border border-gray-700
			`}>
				{props.children}
			</div>
		)
}

export {ButtonBar}
