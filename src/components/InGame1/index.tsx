//gonna delete this
import React, { useEffect, useRef } from 'react'

interface gamePROPS
{
    totalTime: number
	timeLeft: number
    color: number
	//[key: string]:unknown
}

const InGame1:React.FC<gamePROPS> = (props) => {
	const btn = useRef<HTMLButtonElement|null>(null)
	useEffect(()=>{
		
	},[])

	return (
       <div>

           
       </div>    
	);
}	
export { InGame1 }