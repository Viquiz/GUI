import {Button} from '@components/button';
import "./QuestionCard.scss"
import { CheckBox } from '@components/CheckBox';
import React, {  useEffect, useReducer, useRef, useState } from 'react';
import { answer, Question} from '../../database';
import { VscArrowLeft, VscSave } from 'react-icons/vsc';
import { IconContext } from 'react-icons';
import { Stack, IStackTokens, IIconProps, DefaultPalette, TextField, Dialog, DialogFooter, DialogType } from '@fluentui/react';
import { CommandBarButton, DefaultButton, IButtonStyles, IconButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { useToggle } from '@common/customHook';
import { addIcon, backIcon, deleteIcon, saveIcon } from '@common/icon';



const correctAnswerStyle: IButtonStyles = {
	root: {
		flex:"1",
		background: "#00B294",
		border: "1px solid black",
		borderRadius: 0,
		overflow:'hidden',
		textOverflow:'ellipsis',
		height: "100%"
		
		},
	rootHovered:{
		background: "#008272",
		
	},
	rootPressed:{
		background: "#004b50",
	},
	flexContainer:{
		overflow: 'hidden',
		justifyContent:'flex-start',
		width:'100%'
	},
	textContainer:{
		textAlign:"left",
		minWidth:'100%',
		maxWidth: '100%'
	},
	label:{
		overflow:'hidden',
		textOverflow:'ellipsis',
		minWidth:'100%',
		maxWidth: '100%'
	}
}
const wrongAnswerStyle: IButtonStyles = {
	root: {
		flex:"1",
		background: "#d83b01",
		border: "1px solid black",
		borderRadius: 0,
		overflow:'hidden',
		textOverflow:'ellipsis',
		height: "100%"
		
		},
	rootHovered:{
		background: "#d13438",
		
	},
	rootPressed:{
		background: "#a4262c",
	},
	flexContainer:{
		overflow: 'hidden',
		justifyContent:'flex-start',
		width:'100%'
	},
	textContainer:{
		textAlign:"left",
		minWidth:'100%',
		maxWidth: '100%'
	},
	label:{
		overflow:'hidden',
		textOverflow:'ellipsis',
		minWidth:'100%',
		maxWidth: '100%'
	}
}
const reducerFunctions:{[key:string]:(state:Question,params:any)=>any} = {
	UPDATE_ANSWER:(state,{value,index}:{value:string,index:number})=>{
		const newAnswers = [...state.answers]
		newAnswers[index].text = value
		return {...state,answers:newAnswers}
	},
	UPDATE_QUESTION:(state,{value}:{value:string})=>{
		return {...state,title:value}
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
		return {...state,answers:[...state.answers,{text:"Edit answer here",isCorrect:false,id:last_id+1}]}
	},
	DELETE_ANSWER:(state,{index}:{index:number})=>{
		const answer = [...state.answers]
		answer.splice(index,1)
		return {...state,answers:answer}
	},
	INIT:(state,value:Question)=>{
		return {...value}
	},

}
type action = keyof typeof reducerFunctions;
interface ACTION{
	type:action,
	payload?:any
}
function reducer(state:EditorState, action:ACTION){
	
	if(!(action.type in reducerFunctions)) return state;
	let r = false;
	if (action.type === 'INIT') r = true;
	return {Question:reducerFunctions[action.type](state.Question,action.payload),isSaved:r};
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
		<Stack styles={{
			root:{
				padding:"15px",
				width: "20rem",
				height: "75%",
				overflow: 'hidden'
			}
		}}>
				<Stack disableShrink tokens={{childrenGap:15}}
				styles={{
					root:{
						overflowY: 'scroll',
						minHeight:0,
						flex:1
					},
				}}
				>
					{AnswerList.map((item,index)=>
					<Stack  styles={{
						root:{
							overflowY: 'scroll',
							minHeight:60,
						},
					}} key={item.id} horizontal style={{overflow:'hidden'}}>
				
				
					<PrimaryButton styles={item.isCorrect?correctAnswerStyle:wrongAnswerStyle} text={item.text} onClick={() => setCurrentAnswer(index)}/>
					{AnswerList.length > 2 ?<DefaultButton styles={{
								root: {
								minWidth: 0,
								padding: "0",
								height: "100%"
								},
								rootHovered:{
									background: "#d13438"
								},
								rootPressed:{
									background: "#a4262c"
								}
								}} iconProps={deleteIcon} onClick={()=>{props.RemoveAnswer(index)}}/>:undefined}
					</Stack>
				
					)}
				
				</Stack>
			<DefaultButton iconProps={addIcon}  onClick={AddAnswer}/>
		</Stack>
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

interface QuestionEditorPROPS{
	onSave:(value:Question)=> Promise<any>;
	onBack:()=>void;
	question:Question
	[key:string]:unknown;
}
interface EditorState{
	Question:Question;
	isSaved:boolean;
}
function QuestionEditor ({onSave,onBack,...props}:QuestionEditorPROPS) {
	const [currentAnswer,setCurrentAnswer] = useState(0);
	const [dialogState,toggleDialog] = useToggle([false,true]);
	const [question,dispatch] = useReducer(reducer,{} as EditorState,():EditorState=>{
		const q = JSON.parse(JSON.stringify(props.question)) as Question;
		q.answers.map((value,index)=> value.id = index)
		return {Question: q, isSaved:true}
	});
	useEffect(()=>{
		const q = JSON.parse(JSON.stringify(props.question)) as Question;
		q.answers.map((value,index)=> value.id = index)
		dispatch({type:'INIT',payload:q})
	},[props.question])	
	return (
		<>
		<div className="h-full grid wrapper pr-3">
		<div className="mini_map flex overflow-hidden items-center flex-col border-r border-black">
			<div className="h-16 flex justify-around items-center p-1 w-11/12 border-b border-gray-600 text-white">
				<Stack horizontal tokens={{childrenGap:10}}>
					<PrimaryButton iconProps={saveIcon} text="Save" onClick={()=> {
						onSave(question.Question).catch((err)=> console.log(err));
						
					}}/>
					<DefaultButton iconProps={backIcon} text="Back" onClick={()=> {
						if(question.isSaved)
						{
							onBack();
						}
						else
							toggleDialog();
					}}/>
				</Stack>
			</div>
			<AnswerList className="w-full flex-1"
			AnswerList={(question.Question as Question).answers}
			AddAnswer={()=>{
				dispatch({type:'ADD_ANSWER'})
			}}
			RemoveAnswer={(index:number)=>{
				dispatch({type:"DELETE_ANSWER",payload:{index:index}})
			}}
			setCurrentAnswer={setCurrentAnswer}
			/>
		</div>
		<div className="my-auto"><b>Câu hỏi:</b>
				<TextField multiline resizable={false} value={(question.Question as Question).title} onChange={(evt)=>{
						dispatch({type:"UPDATE_QUESTION",payload:{value:(evt.target as HTMLInputElement).value}})
				}}/>
			</div>
		<div className="relative">
			<img className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-black
				w-96 h-52
			" 
			src={(question.Question as Question).img} alt="not found" />
		</div>
			
		<div className="w-3/4 mx-auto flex justify-start p-4 h-24 border focus-within:border-2 border-gray-500 focus-within:border-button-primary shadow-lg">
			{(question.Question as Question).answers[currentAnswer]?<>
			<CheckBox checked={(question.Question as Question).answers[currentAnswer].isCorrect} onChange={(value)=>{
				dispatch({type:"EDIT_CORRECT_ANSWER",payload:{value:value, index:currentAnswer}})
			}}></CheckBox>
			<TextBox
					className="ml-4 h-full flex-1 outline-none"
					text={(question.Question as Question).answers[currentAnswer]?.text}
					onChange={function (value: string): void {
						dispatch({type:"UPDATE_ANSWER",payload:{value:value, index:currentAnswer}})
					} }
			/>
			</>:<></>}
		</div>
		</div>
		<Dialog
		hidden={!dialogState}
		onDismiss={toggleDialog}
		dialogContentProps={{
			type: DialogType.normal,
			title: 'Unsaved changes',
			subText: `your changes will be lost if don't save`,
		      }}
		modalProps={{isBlocking:true,styles:{main:{minWidth:'450px !important'} ,scrollableContent:{minWidth: '450px'}}}}
		//styles={}
		>

			 <DialogFooter>
				<PrimaryButton 
					iconProps={saveIcon} text="Save" 
						onClick={async ()=> {
							try {
								await onSave(question.Question);
								onBack();
							} catch (error) {
								console.log(error)
							}
							
						}}/>
				<DefaultButton 
				styles={{root:{color:'red'},rootHovered:{color:'red'},rootPressed:{color:'red'}}}
				iconProps={deleteIcon}  text="Discard" onClick={onBack}/>
			 </DialogFooter>

		</Dialog>
		</>
	    );

}

export {
	QuestionEditor
}