import React, { useEffect } from 'react'
import {  Question } from "src/database";
import sample from './img/sample.png'; 
import QuestionShow from './questionShow'
import { Textfit } from 'react-textfit';

export interface PlayGame1PROP
{
    question: Question
}

const PlayGame1:React.FC<PlayGame1PROP> = (props) => {

	useEffect(()=>{
		
	},[])

	return (
       <div className="w-full">

            <div className="text-base m-2">
                Answered: 0/30
            </div>
            <div className="flex h-2/6 content-evenly items-center leading-none w-full">

                <div className="flex self-start justify-center w-1/3">
                    {(props.question.img === "" || props.question.img === undefined)?
                        <img className="w-auto" src={sample} alt="where?" /> :
                        // "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
                        <img className="w-auto" src={props.question.img} alt="where?" />
                    }
                </div>

                <div style={{height: "40vh", fontSize: "111px" }} className="flex w-2/3">
                    <Textfit>{props.question.title}</Textfit>
                </div>
            </div>
        </div>
	);
}	
export default PlayGame1;