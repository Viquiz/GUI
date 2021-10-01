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
       <div>

            <div>
                Answered: 0/30
            </div>
            <div className="flex justify-around p-2">
                <Textfit>{props.question.title}</Textfit>
            </div>

            <div className="flex justify-around">
                {(props.question.img === "" || props.question.img === undefined)?
                    <img className="w-auto" src={sample} alt="where?" /> :
                    // "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
                    <img className="w-auto" src={props.question.img} alt="where?" />
                }
            </div>
            
       </div>    
	);
}	
export default PlayGame1;