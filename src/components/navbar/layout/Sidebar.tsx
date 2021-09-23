import React from "react";


const SideBar = (props:any) => {
	function isCollapsible() {
		if(props.Collapsible)
			return "w-14 hover:w-sideBar";
		return "w-sideBar";
	}
	return (
		<nav className={`${isCollapsible()} duration-300 relative`}>
			<div className="w-full overflow-hidden ">
				<div className={`pl-2 text-white w-sideBar bg-gray-700  flex flex-col h-content relative`}>
					{props.children}
				</div>
			</div>
			{/* <div className="w-5 h-full left-full top-0 z-50 absolute">
			</div> */}
		</nav>
	);
}

export default SideBar;