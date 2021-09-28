import React, { useEffect } from 'react'
import {  Question } from "src/database";

import circle from './img/circle.png'; 
import sample from './img/sample.png'; 
import triangle from './img/triangle.png'; 
import pentagon from './img/pentagon.png'; 
import rhombus from './img/Rhombus.png'; 
import wrong from './img/wrong.png'; 

export interface FinalResultPROP
{ 
    data?: unknown
}

const FinalResult:React.FC<FinalResultPROP> = (props) => {

	useEffect(()=>{
		
	},[])

	return (
        <div className="h-screen w-full ">
            <div className = "flex h-1/2 content-evenly items-end">
                <div className="flex h-full w-1/2 items-end">
                    
                    <div style={{height:"15%"}} className="h-full w-1/4 rounded-md bg-pink-400 m-2"> RESULT </div>
                    <div style={{height:"30%"}} className="h-full w-1/4 rounded-md bg-green-200 m-2">RESULT </div>
                    <div style={{height:"5%"}} className="h-full w-1/4 rounded-md bg-green-400 m-2">RESULT</div>
                    <div style={{height:"50%"}} className="h-full w-1/4 rounded-md bg-indigo-500 m-2">RESULT</div>
                </div>
            </div>

        <div className = "absolute inset-x-0 bottom-20">
            RESULT
        </div>

        </div>
	);
}	
export default FinalResult;