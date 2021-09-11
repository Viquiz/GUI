import React from 'react';
import { Link } from 'react-router-dom';
import * as faIcons from "react-icons/fa";
import "./navbar.css"
// https://www.npmjs.com/package/react-pro-sidebar

// import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

class NavBar extends React.Component
{
	render() {
		return(
		<nav className="navbar">
			<ul className="navlink-container border-t-2 border-b-2 border-black py-2">
				<li>
					<Link className="navlink" to="/Home">
						<faIcons.FaBook className="navlink--icon"></faIcons.FaBook>
						<span className="navlink--text"> Libraries</span>
					</Link>
				</li>

				<li>
					<Link className="navlink" to="/devices">
						<faIcons.FaAndroid className="navlink--icon"></faIcons.FaAndroid>
						<span className="navlink--text"> Devices</span>
					</Link>
				</li>

				<li>
					<Link className="navlink" to="/setting">
						<faIcons.FaCog className="navlink--icon"></faIcons.FaCog>
						<span className="navlink--text"> Setting</span>
					</Link>
				</li>

			</ul>
		</nav>
		);
	}
}

export default NavBar;