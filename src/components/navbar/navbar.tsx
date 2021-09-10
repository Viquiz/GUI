import React from "react";
import { Link } from "react-router-dom";
import {ImBook} from "react-icons/im"
import {FaReact} from "react-icons/fa"
import {BsGearFill} from "react-icons/bs";
import "./navbar.css";


import SideBar from "./layout/Sidebar";
import SideBarHeader from "./layout/SideBarHeader";
import SideBarContent from "./layout/SideBarContent";
import Menu from "./Menu/Menu";
import MenuItem from "./Menu/MenuItem";
import SideBarFooter from "./layout/SideBarFooter";







const MenuItems = [{
	id:0,
	to:"/Home",
	display:"Home",
	icon: <ImBook/>
},
{
	id:1,
	to:"/Setting",
	display:"Setting",
	icon: <BsGearFill/>
},
]


const NavBar = () => {
	const [view,setView] = React.useState(0);
    return (
	<SideBar Collapsible={false}>
		<SideBarHeader  icon={FaReact}>
			Viquiz
		</SideBarHeader>
		<SideBarContent>
			<Menu>
				{MenuItems.map(item =>
					
						<Link className="navlink" to={item.to}>
							<MenuItem key={item.id} selected={view===item.id} icon={item.icon} onClick={()=>{ console.log(item.id);setView(item.id)}}>
							{item.display}
							</MenuItem>
						</Link>
					
				)}
			</Menu>
		</SideBarContent>
		<SideBarFooter>
			FB
		</SideBarFooter>
	</SideBar>
    );
}

export default NavBar;
