import React, { useEffect, useRef } from 'react'

interface processBar_PROPS
{
    totalTime: number
	timeLeft: number
    color: number
	//[key: string]:unknown
}
const ProcessBar:React.FC<processBar_PROPS> = (props) => {
	const btn = useRef<HTMLButtonElement|null>(null)
	useEffect(()=>{
		
	},[])

	return (
            <div className="w-full">
                <div className="relative pt-1">
                </div>
                <div className="relative">
                    <div className="overflow-hidden h-8 m-1 flex rounded bg-gray-300 text-center">
                        <div
                            style={{
                                width:  "" + (props.timeLeft/props.totalTime)*100 + "%",
                                backgroundColor: (props.color < 30 ? "rgba(239, 68, 68, 1)" : (props.color < 70 ? "rgba(245, 158, 11, 1) " : "rgba(16, 185, 129, 1)"))
                            }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
                        > {props.timeLeft}</div>
                    </div>
                </div>
            </div>
	);
}	
export { ProcessBar }