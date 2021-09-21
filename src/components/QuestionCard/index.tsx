import {Button} from '@components/button';
import { CheckBox } from '@components/CheckBox';
import { integerGenerator } from '@common/generator';
import React, { useEffect, useReducer, useState } from 'react';
import {answer, Question} from '../../database';
import { ButtonBar } from '@components/ButtonBar';
import { VscAdd, VscChromeMinimize } from 'react-icons/vsc';
import { IconContext } from 'react-icons';
import { FiTrash } from 'react-icons/fi';
const answerIDgenerator = integerGenerator()
function generateID(){
	const {value,done} = answerIDgenerator.next()
	return value as number;
}
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
		return {...state,answers:[...state.answers,{text:"Edit question here",isCorrect:false,id:generateID()}]}
	},
	DELETE_ANSWER:(state,{index}:{index:number})=>{
		const answer = [...state.answers]
		answer.splice(index,1)
		console.log(index,answer)
		return {...state,answers:answer}
	},
	INIT:(state)=>{
		const answer = [...state.answers]
		answer.forEach(element => {
			element.id = generateID();
		});
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
	onSave: (question:Question)=> void
	onAdd: ()=>void
	onDelete: ()=>void
	[key:string]:unknown
}

function QuestionCard({onSave,onAdd,onDelete,...props}:PROPS) {
	const [editMode,setEditMode] = useState(false);
	const [question,dispatch] = useReducer(reducer,JSON.parse(JSON.stringify(props.question)))
	const [saved,setSaved] = useState(false);
	useEffect(()=>{
		dispatch({type:"INIT"})
	},[])
	function enterEditMode()
	{
		setEditMode(true);
	}
	function exitEditMode()
	{
		setEditMode(false);
	}
	function save()
	{
		onSave(question);
	}
	return(

		<div className="w-800px h-96 mx-auto my-6 border border-black rounded-md shadow-lg flex flex-col relative" > 
			<div className="w-full h-22 border-b border-gray-700 p-7 shadow-lg">
				<b>Câu hỏi:</b>
				<span>{question.title}</span>?
			</div>
			<div className="w-full flex-1 p-5 shadow-lg overflow-hidden">
				<div className="p-2 w-full min-h-full max-h-full overflow-y-scroll grid grid-cols-2 gap-2 z-0">
					{(question.answers as answer[]).map((item,index)=>{
						return (
						<div key={item.id} className={`h-24 ${item.isCorrect ? 'bg-green-600':'bg-red-500'} p-2 border border-black shadow-md`}>
							{editMode && <CheckBox checked={item.isCorrect} onChange={(value)=>{
								dispatch({type:"EDIT_CORRECT_ANSWER",payload:{value:value,index:index}})
							}}className="bg-white"></CheckBox>}


							<textarea disabled={!editMode} onChange={(ev)=>{
								if(ev.target.value !=="")
									return dispatch({type:"UPDATE_ANSWER",payload:{value:ev.target.value,index:index}})
								return dispatch({type:"DELETE_ANSWER",payload:{index:index}})
							}} 
							className={`resize-none h-full align-middle overflow-hidden ${item.isCorrect ? 'bg-green-600':'bg-red-500'} focus:bg-gray-400 focus:bg-opacity-60 text-gray-200`} rows={2} cols={40} wrap="soft" defaultValue={item.text}/>
						</div>
						);

					})
					}
					{editMode && <IconContext.Provider value={{style:{strokeWidth:"2px"}}}>
						<Button className= "bg-white h-24 border border-black shadow-md" icon={VscAdd} text="ADD ANSWER" 
						onClick={()=>{
							dispatch({type:"ADD_ANSWER"})
						}}></Button>
					</IconContext.Provider>}

				</div>
			</div>
			{editMode?
			<ButtonBar className="bg-white top-0 right-2 "> 
				<Button text={`Back`} onClick={exitEditMode}></Button>
				<Button text={`Save`} onClick={save}></Button>
			</ButtonBar>
			:
			<ButtonBar className="bg-white top-0 right-2 "> 
				<Button text={`Edit`} onClick={enterEditMode}></Button>
				<Button text="Stats"onClick={()=>{}}></Button>
			</ButtonBar>}
			<IconContext.Provider value={{style:{strokeWidth:"2px"}}}>
			<ButtonBar className= "top-full left-1/2 -translate-x-1/2 "> 
				<Button className= "bg-white" icon={VscAdd} onClick={onAdd}></Button>
				<Button className="bg-white" icon={FiTrash} onClick={onDelete}></Button>
			</ButtonBar>
			</IconContext.Provider>
		</div>
	)

}


export {
	QuestionCard
}