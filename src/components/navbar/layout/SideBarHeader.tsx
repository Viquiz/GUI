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
		<section className={"w-full h-50px select-none flex justify-start flex-col items-start text-white"}>
				<span className={`select-none flex justify-start items-center min-w-full ml-25px flex-wrap overflow-hidden`}>
					<span className={`select-none w-50px h-50px flex justify-center items-center`}>
						{<props.icon/>}
					</span>
					<span className={`select-none`}>
						{props.children}
					</span>
				</span>

		</section>

	);
}

export default SideBarHeader;