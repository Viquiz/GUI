import React from "react"
import { useRouteMatch } from "react-router-dom"
import { Question } from "src/database";

export interface answers {
	[index: number]: string,
}

export interface CardPROPS {
	_id: string,
	_rev?: string,
	img: string,
	title: string,
	answers: answers,
	create: string,
	edit: string,
	correctAnswers: answers,
	gameMode: string,
	[k: string]: unknown
}

const Question_card: React.FC<Question> = (props) => {
	const { url } = useRouteMatch();
	const createDate = new Date(props.create);
	const editDate = new Date(props.edit);
	return (
		<div className={`card border-b border-gray-500`}>
			<div className="card--image">
				{/* <img src="" alt="thumbnail"/> */}
			</div>
			<div className="card--info">
				<div className="card--info--title">
					{props.title}
				</div>
				<div className="card--info--answers">
					{/* {props.description} */}
					answers 1, answers 2, (true) answers 3, answers 4
				</div>
			</div>
			<div className="card--date">
				Created {`${createDate.getDate()}/${createDate.getMonth() + 1}/${createDate.getFullYear()}`}
			</div>

			<div className="card--date">
				Edited {`${editDate.getDate()}/${editDate.getMonth() + 1}/${editDate.getFullYear()}`}
			</div>

			{/* <button className="card--info border-gray-500">
				remove 
			</button> */}
			{props.children}

			<div className="card--gamemode">
				{props.gameMode}
			</div>
		</div>
	)
}

export default Question_card