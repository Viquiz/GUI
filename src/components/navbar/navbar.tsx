import React, { useEffect } from "react";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import {FaReact} from "react-icons/fa"
import "./navbar.css";


import SideBar from "./layout/Sidebar";
import SideBarHeader from "./layout/SideBarHeader";
import SideBarContent from "./layout/SideBarContent";
import Menu from "./Menu/Menu";
import MenuItem from "./Menu/MenuItem";
import SideBarFooter from "./layout/SideBarFooter";

const NavBar = (props:any) => {
	const [view,setView] = React.useState(0);
	const match = useRouteMatch("/:route")
	useEffect(()=>{
		let i = (props.MenuItems as Array<any>).find(item =>match?item.to === match.url:true);
		setView(i.id);
	},[match]);
	function getItemNodes(menuItems:any)
	{	return menuItems.filter((item:any) =>{
			return (
			item.display !== '' 
			&& item.display !== null 
			&& item.display !== undefined);
		}).map((item:any) =>
		{	
			return (
			<Link key={item.id} to={item.to}>
				<MenuItem selected={view===item.id} icon={item.icon} onClick={()=>{setView(item.id)}}>
				{item.display}
				</MenuItem>
			</Link>)
		})
	}
    return (
	<SideBar Collapsible={false}>
		<SideBarHeader  icon={FaReact}>
			Viquiz
		</SideBarHeader>
		<SideBarContent>
			<Menu>
				{getItemNodes(props.MenuItems)}
			</Menu>
		</SideBarContent>
		<SideBarFooter>
			FB
		</SideBarFooter>
	</SideBar>
    );
}

export default NavBar;
