import React, { useState } from 'react'
import { IconContext } from 'react-icons'
import {VscChromeClose,VscChromeMaximize,VscChromeMinimize,VscChromeRestore} from "react-icons/vsc"
import "./titleBar.scss"
interface PROPS
{
	title:string
	[key:string]: unknown
}

const TitleBar:React.FC<PROPS> = (props)=>{
	const [maximize, setMaximize] = useState(false)
	
	let BrowserWindow = (window as any).BrowserWindows
	if(BrowserWindow)
		BrowserWindow.eventMaximize(setMaximize)
	
	return (
		<div className="">
			<div className="h-titleBar flex justify-end items-center relative titleBar dark:bg-blue-900 dark:text-white">
				<div className="absolute top-2/4 left-2/4 transform -translate-y-2/4 -translate-x-2/4 w-fit h-full">
					<span>{props.title}</span>
				</div>
				<IconContext.Provider value={{className:"absolute top-2/4 left-2/4 transform -translate-y-2/4 -translate-x-2/4 select-none"}}>
						<div id="btn" onClick={BrowserWindow?BrowserWindow.minimize:()=>console.log("OS not supported")}
							className="h-titleBar w-50px relative inline-block hover:bg-gray-400 hover:bg-opacity-70"
						>
							<VscChromeMinimize/>
						</div>
						<div  id="btn"	onClick={BrowserWindow?BrowserWindow.maximize:()=>console.log("OS not supported")}
						className="h-titleBar w-50px relative inline-block hover:bg-gray-400 hover:bg-opacity-70"
						>
							{maximize?<VscChromeRestore/>:<VscChromeMaximize/>}
						</div>
						<div  id="btn" onClick={BrowserWindow?BrowserWindow.close:()=>console.log("OS not supported")}
						className="h-titleBar w-50px relative inline-block hover:bg-red-600"
						>
							<VscChromeClose/>
						</div>
				</IconContext.Provider>
			</div>
		</div>
	)
}


export default TitleBar