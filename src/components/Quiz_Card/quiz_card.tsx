import "./quiz_card.scss"
import React from "react"
import { Link, useRouteMatch } from "react-router-dom"
import { BsPlay } from "react-icons/bs"
import { IconContext } from "react-icons"

export interface questionIDs {
	[index: number]: string,
}

export interface CardPROPS
{
	_id: string
	title:string
	description:string
	create:string
	edit:string
	Class:string
	questions: questionIDs
	[k: string]: unknown
}
const Quiz_card:React.FC<CardPROPS> = (props)=>
{
	const {url} = useRouteMatch()
	const date = new Date(props.create)
	return(
		<div className={`card border-b border-gray-500`}>
			{/* ADD moving to edit page */}
			<div className="card--image">
				{/* <img src="" alt="thumbnail"/> */}
			</div>
			<div className="card--info">
				<div className="card--info--name">
					{props.title}
				</div>
				<div className="card--info--description">
					{props.description}
				</div>
			</div>
			{/* <div className="card--button" >
				<BsPlay size={60}/>
			</div> */}
			<div className="card--date">
				{`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}
			</div>
			<div className="card--class">
				{props.Class}
			</div>
			<div>
				{/* edit and remove button ? */}
				{props.children}
			</div>
		</div>
	)
}

export default Quiz_card