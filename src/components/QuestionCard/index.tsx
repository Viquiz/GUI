import Button from '@components/button'
import React, { useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import { VscAdd } from 'react-icons/vsc'
import styled from 'styled-components'
export enum questionType{
	multipleChoice,
	SingleChoice,
}
export type iQuestion = {
	question:string
	type:questionType
	total:number
	correctAnswer:string
	wrongAnswers:string[]
}
interface QuestionCardPROPS
{
	question:iQuestion
}

const Form = styled.form`
width:50em;
min-height:15.5em;
max-height:20.5em;
display:flex;
justify-content:center;
align-items: flex-start;
flex-direction: column;
padding-bottom:1.25em;
position:relative;
`
const QuestionDiv = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
grid-gap:0.5em 0.5em;
padding-left: 1.25em;
padding-right: 1.25em;
overflow-y:auto;
flex:1;
width: 100%;
justify-content: start;
align-content: start;
`
const Label = styled.label`
margin-top:1em;
margin-bottom:1em;
margin-left:1.25em;
height:3em;
width:100%;
`
const AnswerDiv = styled.div`
height: 5em;
overflow:hidden;
padding-left:2em;
width: 100%;
display:flex;
justify-items: start;
align-items: center;
`

enum MODE{
	view,
	edit,
	stats,
}

export const QuestionCard:React.FC<QuestionCardPROPS> = (props) => {
	const [mode,setMode] = useState<MODE>(MODE.view)
	useEffect(()=>{
		console.log(mode)
	},[mode])
	return (
		<Form className="mx-auto border border-gray-700 shadow-lg">
			<Label>
				<b>Question:</b> {props.question.question}
			</Label>
			<QuestionDiv>
				<AnswerDiv className="bg-green-500">{props.question.correctAnswer}</AnswerDiv>
				{props.question.wrongAnswers.map((item,index:number)=>{
					return <AnswerDiv key={index} className="bg-red-500">{item}</AnswerDiv>
				})}
			</QuestionDiv>
			<div className="divide-x divide-gray-900 border border-gray-900 rounded-lg w-64
			grid grid-cols-3 gap-0
			absolute
			transform -translate-y-1/2
			top-0
			right-3
			bg-white
			">
				<Button onClick={()=> {
					setMode(MODE.view);
				} } text="View"/>
				<Button onClick={()=> {
					setMode(MODE.edit);
				} } text="Edit"/>
				<Button onClick={()=> {
					setMode(MODE.stats);
				} } text="Stats"/>
			</div>
			<div className="border border-gray-900 rounded-lg w-32
			grid grid-cols-1 gap-0
			absolute
			transform -translate-y-1/2 -translate-x-1/2
			top-full
			left-1/2
			text-black
			bg-white
			overflow-hidden
			">
				<IconContext.Provider value={{style:{strokeWidth:"2px"},className:"ml-2"}}>
				<Button className="" onClick={()=> {
					console.log("add")
				} } text="ADD" icon={VscAdd}/>
				</IconContext.Provider>
			</div>
		</Form>
	)
}

