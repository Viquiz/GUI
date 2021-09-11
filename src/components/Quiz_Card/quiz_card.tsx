import "./quiz_card.css"
import React from "react"
import { Link, useRouteMatch } from "react-router-dom"
import "./quiz_card.css"
import { BsPlay } from "react-icons/bs"

export interface CardPROPS
{
	name:string
	description:string
	timesStamp:number
	Class:string
	[k: string]: unknown
}
const Quiz_card:React.FC<CardPROPS> = (props)=>
{
	const {url} = useRouteMatch()
	const date = new Date(props.timesStamp)
	console.log(date)
	return(
		<div className={`card border-b border-gray-500`}>
			<div className="card--image">
				{/* <img src="" alt="thumbnail"/> */}
			</div>
			<div className="card--info">
				<div className="card--info--name">
					{props.name}
				</div>
				<div className="card--info--description">
					{props.description}
				</div>
			</div>
			<div className="card--button" >
				<div>
					<BsPlay size="3x"/>
				</div>
			</div>
			<div className="card--date">
				{`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}
			</div>
			<div className="card--class">
				{props.Class}
			</div>
		</div>
	)
}

export default Quiz_card