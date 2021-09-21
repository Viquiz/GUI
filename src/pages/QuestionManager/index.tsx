import React, { useEffect, useState } from 'react';
import {useAsync} from "@common/customHook"
import {QuestionCard} from "@components/QuestionCard"
import {
	Question,
	getAllQuestion,
} from "../../database";
import {Button} from '@components/button';
import { integerGenerator } from '@common/generator';

interface QManagerPROPS{
	
	[key:string]:unknown
}

const IDgenerator = integerGenerator()
let test:Question = {
	_id: '123',
	img: '123',
	title: 'Cau hoi thu nghiem aaaaaaaaaaaaaaaaa Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam doloremque accusamus, eum perspiciatis ratione repudiandae incidunt voluptates commodi aut quam atque. Harum in consequatur iste quae veritatis laboriosam repellendus beatae. aaaaaaaaaaa',
	answers: [{text:"a2",isCorrect:false,id:IDgenerator.next().value as number},{text:"a3",isCorrect:false,id:IDgenerator.next().value as number},{text:"a4",isCorrect:false,id:IDgenerator.next().value as number}],
	create: '123',
	edit: '123',
	gameMode: '213'
}
const QuestionManager:React.FC<QManagerPROPS> = (props)=>{
	const {loading,value,error,trigger} = useAsync(getAllQuestion);
	useEffect(()=>{
		console.log(value)
	},[value])
	return (
		<div className="w-full h-full overflow-hidden">
			<QuestionCard
			onAdd={()=>console.log("added")}
			onDelete={()=>console.log("delete")}
			 onSave={(v) => {test = JSON.parse(JSON.stringify(v));console.log(v)}} question={test} className={"asd"}/>
		</div>
	);
}
export {QuestionManager}