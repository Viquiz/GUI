import { randomInt } from 'crypto';
import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import Quiz_card, { CardPROPS } from '../../components/Quiz_Card/quiz_card';

type PROPS = 
{
	t:string,
	[k: string]: unknown
}

interface PARAMS
{
	id:string
}
const a:CardPROPS[] =[
{
	name:"123",
	description:"lorem",
	timesStamp:0,
	Class:"12a7"
}
]
const QuizManager: React.FC<PROPS> = (props) => {
	const { url } = useRouteMatch();
	
	return (
		<div className="h-full flex flex-col justify-start">
			<div
			style={{
				height:"50px",
				backgroundColor: "green"
			}}>
				Functionality
			</div>
			<div className="flex-1 overflow-x-hidden overflow-y-scroll min-h-0 pb-5">
				{a.map(item => <Quiz_card key={item.timesStamp} {...item}/>)}
			</div>
		</div>
	);
};

export default QuizManager;