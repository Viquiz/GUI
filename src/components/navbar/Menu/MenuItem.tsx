import React,{ReactNode} from 'react'

interface MenuItemProps
{
	selected:boolean;
	icon?:ReactNode;
	children?:ReactNode;
	onClick:Function;
}
const MenuItem = (props:MenuItemProps)=>
{
	function changeView() {
		props.onClick();
	}
	return (
		<li onClick={changeView} className={`select-none flex justify-start items-center min-w-full ${props.selected?"selected":""} rounded-l-full ml-25px`}>
			<span className={`select-none w-50px h-50px flex justify-center items-center`}>
				{props.icon}
			</span>
			<span className={`select-none w-250px`}>
				{props.children}
			</span>
		</li>
	);
}

export default MenuItem;