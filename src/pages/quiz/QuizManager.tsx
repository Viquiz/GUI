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
let a:CardPROPS[] =[
{
	name:"123",
	description:"lorem",
	timesStamp:0,
	Class:"12a7"
},
{
	name:"123",
	description:"lorem",
	timesStamp:0,
	Class:"12a7"
},
{
	name:"123",
	description:"lorem",
	timesStamp:0,
	Class:"12a7"
},
{
	name:"123",
	description:"lorem",
	timesStamp:0,
	Class:"12a7"
},
{
	name:"123",
	description:"lorem",
	timesStamp:1631384823941,
	Class:"12a7"
},
{
	name:"123",
	description:"lorem",
	timesStamp:1631384823941,
	Class:"12a7"
},
{
	name:"123",
	description:"lorem",
	timesStamp:1631384823941,
	Class:"12a7"
},
{
	name:"123",
	description:"lorem",
	timesStamp:1631384823941,
	Class:"12a7"
},
{
	name:"123",
	description:"lorem",
	timesStamp:1631384823941,
	Class:"12a7"
},
{
	name:"123",
	description:"lorem",
	timesStamp:1631384823941,
	Class:"12a7"
},
{
	name:"123",
	description:"lorem",
	timesStamp:1631384823941,
	Class:"12a7"
},
{
	name:"123",
	description:"lorem",
	timesStamp:1631384823941,
	Class:"12a7"
},
{
	name:"123",
	description:"lorem",
	timesStamp:1631384823941,
	Class:"12a7"
},
]
const QuizManager: React.FC<PROPS> = (props) => {
	const { url } = useRouteMatch();
	
	return (
		<>
		<div
		style={{
			height:"300px",
			backgroundColor: "green"
		}}>
			Functionality
		</div>
		{a.map(item => <Quiz_card {...item}/>)}
		</>
	);
};

export default QuizManager;