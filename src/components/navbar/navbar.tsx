import React, { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import {ImBook} from "react-icons/im"
import "./navbar.css";

interface MenuItemProps
{
	selected:boolean;
	icon?:ReactNode;
	children?:ReactNode;
	onClick:Function;
}
const _MenuItem = (props:MenuItemProps)=>
{
	function changeView() {
		props.onClick();
	}
	return (
		<li onClick={changeView} className={`flex justify-start items-center min-w-full ${props.selected?"selected":""} rounded-l-full ml-25px`}>
			<span className={`w-50px h-50px flex justify-center items-center`}>
				{props.icon}
			</span>
			<span className={`w-75px`}>
				{props.children}
			</span>
		</li>
	);
}



const _Menu =(props:any)=>
{
	return (
		<ul className={`flex justify-start h-full flex-col items-start text-white`}>
			{props.children}
		</ul>

	);
}
const _SideBarHeader =(props:any)=>
{
	return (
		<section className={"w-full h-50px flex items-center justify-center"}>
			{props.children}
		</section>

	);
}
const _SideBarContent =(props:any)=>
{
	return (
		<section className={"flex-1 py-2 border-t border-b border-gray-400"}>
			{props.children}
		</section>

	);
}
const _SideBarFooter =(props:any)=>
{
	return (
		<section className={"w-full h-50px border-t-1 flex items-center justify-center"}>
			{props.children}
		</section>

	);
}

const SideBar = (props:any) => {
	return (
		<nav className="text-white overflow-hidden w-75px bg-gray-700 hover:w-150px duration-300 flex flex-col">
			{props.children}
		</nav>
	);
}

const Menu_items = [{
	_id:0,
	to:"/Home",
	display:"Home",
	icon: <ImBook/>
},
{
	_id:1,
	to:"/Setting",
	display:"Setting",
	icon: <ImBook/>
},
{
	_id:2,
	to:"/Setting",
	display:"Setting",
	icon: <ImBook/>
},
{
	_id:3,
	to:"/Setting",
	display:"Setting",
	icon: <ImBook/>
},
{
	_id:4,
	to:"/Setting",
	display:"Setting",
	icon: <ImBook/>
},
]


const NavBar = () => {
	const [view,setView] = React.useState(0);
    return (
	<SideBar>
		<_SideBarHeader>
			Viquiz
		</_SideBarHeader>
		<_SideBarContent>
			<_Menu>
				{Menu_items.map(item =>
					<_MenuItem key={item._id} selected={view===item._id} icon={item.icon} onClick={()=>{ console.log(item._id);setView(item._id)}}>
						<Link className="navlink" to={item.to}>
							{item.display}
						</Link>
					</_MenuItem>
				)}
			</_Menu>
		</_SideBarContent>
		<_SideBarFooter>
			FB
		</_SideBarFooter>
	</SideBar>
    );
}

export default NavBar;
