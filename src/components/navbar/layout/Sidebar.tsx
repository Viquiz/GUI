import React from "react";


const SideBar = (props:any) => {
	function isCollapsible() {
		if(props.Collapsible)
			return "w-75px hover:w-200px";
		return "w-200px";
	}
	return (
		<nav className={`text-white overflow-hidden ${isCollapsible()} bg-gray-700  duration-300 flex flex-col h-content fixed top-titleBar left-0`}>
			{props.children}
		</nav>
	);
}

export default SideBar;