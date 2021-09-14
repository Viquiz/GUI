import { randomInt } from 'crypto';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import Quiz_card, {CardPROPS} from '../../components/Quiz_Card/quiz_card';
import { getAllQuestionSet, addQuestionSet, removeQuestionSet } from '../../database'
type PROPS =
	{
		t: string,
		[k: string]: unknown
	}

// const exq: questionIDs = [
// 	"1234", "12112"
// ]

const QuizManager: React.FC<PROPS> = (props) => {
	const { url } = useRouteMatch();
	const [value, setValue] = useState<CardPROPS[]>([]);
	const reloadDB = () => {
		//look silly ... 
		let data: CardPROPS[] = getAllQuestionSet(() => { setValue(() => data); });
	}
	useEffect(() => {
		reloadDB();
	}, [])
	const addQuest = () => {
		let t: CardPROPS = {
			_id: String((new Date()).getTime()),
			title: "new set",
			description: "idk",
			create: (new Date()).toJSON(),
			edit: (new Date()).toJSON(),
			Class: "unknow",
			questions: []
		}
		// b.push(t);
		addQuestionSet(t, reloadDB);
		// setTimeout(useForceUpdate,500);
	};
	const removeQuest = (_id: string) => {
		removeQuestionSet(_id, reloadDB);
		// addQuestion(t, ()=> {let questionData:CardPROPS[] = getAllQuestion(()=>{setValue(()=>questionData);});});
	}

	return (
		<div className="h-full flex flex-col justify-start">
			<div
				style={{
					height: "50px",
					backgroundColor: "green"
				}}>
				Functionality
			</div>
			<div className="flex-1 overflow-x-hidden overflow-y-scroll min-h-0 pb-5">
				{value.map(item => (<Quiz_card key={item._id} {...item}>
					
					<button onClick={() => alert("no")}>
						play
					</button>
					
					{/* passing id via link */}
					<Link to={`/QuizEditor/${item._id}`}>
						edit
					</Link>
					
					{/* add promp and redo in 30s*/}
					<button onClick={() => removeQuest(item._id)}>
						remove
					</button>
				</Quiz_card>))}
			</div>
			<div style={{
				height: "50px",
				backgroundColor: "green"
			}}>
				<button onClick={() => addQuest()}>
					Add new set
				</button>
			</div>
		</div>
	);
};

export default QuizManager;