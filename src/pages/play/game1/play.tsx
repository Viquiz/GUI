import React, { useEffect } from 'react'
import {  Question } from "src/database";

import circle from './img/circle.png'; 
import sample from './img/sample.png'; 
import triangle from './img/triangle.png'; 
import pentagon from './img/pentagon.png'; 
import rhombus from './img/Rhombus.png'; 

export interface PlayGame1PROP
{
    question: Question
}

const PlayGame1:React.FC<PlayGame1PROP> = (props) => {

	useEffect(()=>{
		
	},[])

	return (
       <div>

            <div>
                Answered: 0/30
            </div>
            <div className="flex justify-around p-2">
                {props.question.title}
            </div>

            <div className="flex justify-around">
                {props.question.img ?? <img className="w-auto" src={sample} alt="where?" />}
            </div>

            <div className = "absolute inset-x-0 bottom-20">
                <div className="flex justify-around">
                    <div className = "flex">
                        <img height = {100} width = {100} className = "animate-pulse" src={circle} alt="where?" />
                        <div className = "text-center p-8 ">Answer 1</div>
                    </div>
                    <div className = "flex">    
                        <img height = {100} width = {100} className = "animate-pulse" src={triangle} alt="where?" />
                        <div className = "text-center p-8">Answer 2</div>
                    </div>
                </div>

                <div className = " text-center p-4 "/>

                <div className="flex justify-around">
                    <div className = "flex">    
                        <img height = {100} width = {100} className = "animate-pulse" src={rhombus} alt="where?" />
                        <div className = "text-center p-8 ">Answer 1</div>
                    </div>

                    <div className = "flex">    
                        <img height = {100} width = {100} className = "animate-pulse" src={pentagon} alt="where?" />
                        <div className = "text-center p-8">Answer 2</div>
                    </div>
                </div>

            </div>
       </div>    
	);
}	
export default PlayGame1;