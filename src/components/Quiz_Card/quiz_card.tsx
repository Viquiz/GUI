import "./quiz_card.scss"
import React from "react"
import { Link, useRouteMatch } from "react-router-dom"
import { BsPlay } from "react-icons/bs"
import { IconContext } from "react-icons"

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
			{/* <div className="card--button" >
				<BsPlay size={60}/>
			</div> */}
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