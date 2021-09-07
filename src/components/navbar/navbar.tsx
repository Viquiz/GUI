import React from 'react';
import * as faIcons from "react-icons/fa";
import "./navbar.css"


class NavBar extends React.Component
{
	render() {
		return(
		<nav className="navbar">
			<ul className="navlink-container border-t-2 border-b-2 border-black py-2">
				<li>
					<a  className="navlink" href="#">
						<faIcons.FaBook className="navlink--icon"></faIcons.FaBook>
						<span className="navlink--text"> Libraries</span>
					</a>
				</li>
			</ul>
		</nav>);
	}
}

export default NavBar;