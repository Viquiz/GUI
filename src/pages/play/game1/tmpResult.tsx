import React, { useEffect } from 'react'
import {  Question } from "src/database";

import circle from './img/circle.png'; 
import sample from './img/sample.png'; 
import triangle from './img/triangle.png'; 
import pentagon from './img/pentagon.png'; 
import rhombus from './img/Rhombus.png'; 
import wrong from './img/wrong.png'; 

export interface TmpResultPROP
{
    question: Question
}

const TmpResult:React.FC<TmpResultPROP> = (props) => {

	useEffect(()=>{
		
	},[])

	return (
        <div className="h-screen w-full ">
        <div className = "flex h-1/2 content-evenly items-end">
            <div className="flex h-full w-1/2 items-end">
                
                <div style={{height:"15%"}} className="h-full w-1/4 rounded-md bg-pink-400 m-2"></div>
                <div style={{height:"30%"}} className="h-full w-1/4 rounded-md bg-green-200 m-2"></div>
                <div style={{height:"5%"}} className="h-full w-1/4 rounded-md bg-green-400 m-2"></div>
                <div style={{height:"50%"}} className="h-full w-1/4 rounded-md bg-indigo-500 m-2"></div>
            </div>
            
            <div className="flex items-center  h-full w-1/2">
                <div className="text-center">
                    {props.question.title}
                </div>
            </div>
        </div>

        <div className = "absolute inset-x-0 bottom-20">

            <div className="flex justify-around ">
                <div className = "flex items-center">
                    <div className = "object-contain">
                        <img className = "absolute" height = {110} width = {110}  src={wrong} alt="where?" />
                        <img height = {100} width = {100}  src={circle} alt="where?" />
                    </div>
                    <div className = "text-center p-8 ">Answer 1:</div>
                </div>
                <div className = "flex items-center">    
                    <div className = "object-contain">
                        <img className = "absolute" height = {110} width = {110}  src={wrong} alt="where?" />
                        <img className = "object-contain" height = {100} width = {100}  src={triangle} alt="where?" />
                    </div>
                    <div className = "text-center p-8">Answer 2</div>
                </div>
            </div>

            <div className = " text-center p-4 "/>

            <div className="flex justify-around ">
                <div className = "flex items-center">    
                    <div className = "object-contain">
                        {/* <img className = "absolute" height = {110} width = {110}  src={wrong} alt="where?" /> */}
                        <img className = "object-contain" height = {100} width = {100}  src={rhombus} alt="where?" />
                    </div>
                    <div className = " text-center p-8 ">Answer 1</div>
                </div>

                <div className = "flex items-center">    
                    <div className = "object-contain">
                        <img className = "absolute" height = {110} width = {110}  src={wrong} alt="where?" />
                        <img className = "object-contain" height = {100} width = {100}  src={pentagon} alt="where?" />
                    </div>
                    <div className = "text-center p-8">Answer 2</div>
                </div>
            </div>
        </div>

    </div>
	);
}	
export default TmpResult;