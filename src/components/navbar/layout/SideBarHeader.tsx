import React from 'react';
import { IconType } from 'react-icons';
interface SideBarHeader_PROPS
{
	icon:IconType;
	[key: string]: any  
}
const SideBarHeader =(props: SideBarHeader_PROPS)=>
{
	return (
		<section className={"w-full h-50px"}>
				<span className={`w-full h-full flex items-center justify-start flex-wrap overflow-hidden`}>
					<span className={`w-50px h-50px flex items-center justify-center flex-wrap overflow-hidden ml-25px`}>
						{<props.icon style={
							{width:"50%",height:"50%"}
						}/>}
					</span>
					<span>
						{props.children}
					</span>
				</span>

		</section>

	);
}

export default SideBarHeader;