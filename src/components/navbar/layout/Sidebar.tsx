import React from "react";


const SideBar = (props:any) => {
	function isCollapsible() {
		if(props.Collapsible)
			return "w-14 hover:w-sideBar";
		return "w-64";
	}
	return (
		<nav className={`pl-2  text-white overflow-hidden ${isCollapsible()} bg-gray-700  duration-300 flex flex-col h-content`}>
			{props.children}
		</nav>
	);
}

export default SideBar;