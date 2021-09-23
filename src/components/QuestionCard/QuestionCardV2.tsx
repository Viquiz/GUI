import {Button} from '@components/button';
import "./QuestionCard.scss"
import { CheckBox } from '@components/CheckBox';
import React, {  useEffect, useReducer, useRef, useState } from 'react';
import { answer, Question} from '../../database';
import { VscArrowLeft, VscSave } from 'react-icons/vsc';
import { IconContext } from 'react-icons';


const reducerFunctions:{[key:string]:(state:Question,params:any)=>any} = {
	UPDATE_ANSWER:(state,{value,index}:{value:string,index:number})=>{
		const newAnswers = [...state.answers]
		newAnswers[index].text = value
		return {...state,answers:newAnswers}
	},
	EDIT_CORRECT_ANSWER:(state,{value,index}:{value:boolean,index:number})=>{
		const newAnswers = [...state.answers]
		newAnswers[index].isCorrect = value
		return {...state,correctAnswers:newAnswers}
	},
	ADD_ANSWER:(state)=>{
		let last_id = state.answers.slice(-1)[0]?.id as number;
		if(last_id === undefined)
		{
			last_id = -1;
		}
		return {...state,answers:[...state.answers,{text:"Edit question here",isCorrect:false,id:last_id+1}]}
	},
	DELETE_ANSWER:(state,{index}:{index:number})=>{
		const answer = [...state.answers]
		answer.splice(index,1)
		return {...state,answers:answer}
	},

}
type action = keyof typeof reducerFunctions;
interface ACTION{
	type:action,
	payload?:any
}
function reducer(state:Question, action:ACTION){
	
	if(!(action.type in reducerFunctions)) return state;
	return reducerFunctions[action.type](state,action.payload);
}
interface PROPS{
	question:Question,
	onSave?: (question:Question)=> void
	[key:string]:unknown
}



interface AnswerListPROPS
{
	AnswerList:answer[];
	setCurrentAnswer: React.Dispatch<React.SetStateAction<number>>;
	AddAnswer: ()=>void;
	RemoveAnswer: (index:number)=>void;
	[key:string]:unknown
}
function AnswerList({AnswerList,setCurrentAnswer,AddAnswer,...props}:AnswerListPROPS){
	return(
		<ul className={`${props.className} px-3 overflow-y-auto`}>
			{AnswerList.map((item,index)=>
			<li key={item.id}  className={`h-12 w-full overflow-ellipsis overflow-hidden ${item.isCorrect?"bg-green-500":"bg-red-500"} my-3 flex`}>
				<Button 
				onClick={()=>{
					setCurrentAnswer(index);
				}}
				className="flex-1 overflow-ellipsis overflow-hidden h-full justify-start" 
				text={item.text}/>
			{AnswerList.length>2?<Button className="w-full h-full" onClick={()=>{props.RemoveAnswer(index)}} text="D" ></Button>:undefined}
			</li>
			)}
			<li className="h-12 w-full bg-gray-600 my-3"> <Button className="w-full h-full" onClick={AddAnswer}></Button></li>
		</ul>
	);
}

interface TextBoxPROPS
{
	text?:string;
	onChange: (value:string)=>void;
	[key:string]:unknown
}
function TextBox({text,onChange,...props}:TextBoxPROPS){
	return(
		<textarea className={`${props.className}`} rows={5} style={{resize:"none"}} 
			onChange={(evt)=> 
			{
				onChange(evt.target.value);
			}}
			value={text}></textarea>
	);
}


function QuestionEditor ({onSave,onAdd,onDelete,...props}:any) {
	const [currentAnswer,setCurrentAnswer] = useState(0);
	const [question,dispatch] = useReducer(reducer,JSON.parse(JSON.stringify(props.question)));
	return (
	
		<div className="h-full grid wrapper">
		<div className="mini_map flex overflow-hidden items-center flex-col border-r border-black">
			<div className="h-16 flex justify-around items-center p-1 w-11/12 border-b border-gray-600 text-white">
				<IconContext.Provider value={{size:"1.75em"}}>
					<Button
					className="w-24 h-10 bg-button-primary rounded-sm"
					icon={VscSave}
					onClick={function (event){
						throw new Error('Function not implemented.');
					} }/>
					<Button
					className="w-24 h-10 bg-button-primary rounded-sm"
					icon={VscArrowLeft}
					onClick={function (event){
						throw new Error('Function not implemented.');
					} }/>
				</IconContext.Provider>
			</div>
			<AnswerList className="w-full flex-1"
			AnswerList={(question as Question).answers}
			AddAnswer={()=>{console.log("add Answer")}}
			RemoveAnswer={(index:number)=>{
				dispatch({type:"DELETE_ANSWER",payload:{index:index}})
			}}
			setCurrentAnswer={setCurrentAnswer}
			/>
		</div>
		<div className="my-auto"><b>Câu hỏi:</b>{(question as Question).title}<b>?</b></div>
		<div className="relative">
			<img className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-black
				w-96 h-52
			" 
			src={(question as Question).img} alt="not found" />
		</div>
			
		<div className="w-3/4 mx-auto flex justify-start p-4 h-24 border focus-within:border-2 border-gray-500 focus-within:border-button-primary shadow-lg">
			<CheckBox checked={(question as Question).answers[currentAnswer].isCorrect} onChange={(value)=>{
				dispatch({type:"EDIT_CORRECT_ANSWER",payload:{value:value, index:currentAnswer}})
			}}></CheckBox>
			<TextBox
					className="ml-4 h-full flex-1 outline-none"
					text={(question as Question).answers[currentAnswer]?.text}
					onChange={function (value: string): void {
						dispatch({type:"UPDATE_ANSWER",payload:{value:value, index:currentAnswer}})
					} }
			/>
		</div>
		</div>
	    );

}

export {
	QuestionEditor
}