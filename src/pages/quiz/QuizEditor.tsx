import React, {useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Question_card, { CardPROPS, answers } from '../../components/Question_Card/question_card';
import {getAllQuestion,addQuestion,removeQuestion} from '../../database';

type PROPS = 
{
	t:string,
	[k: string]: unknown
}

//render the card from db
const a: answers = [
    "a", "b", "c", "d"
]

// let b:CardPROPS[] = [
// {
// 	_id: "0",
// 	img: "string",
// 	title: "string",
// 	answers: a,
// 	create: "12/3/2021",
// 	edit:"12/8/2021",
// 	correctAnswers: a,
// 	gamemode: "string"
// },
// {
// 	_id: "1",
// 	img: "string",
// 	title: "string",
// 	answers: a,
// 	create: "12/3/2021",
// 	edit:"12/8/2021",
// 	correctAnswers: a,
// 	gamemode: "string"
// },
// {
// 	_id: "2",
// 	img: "string",
// 	title: "string",
// 	answers: a,
// 	create: "12/3/2021",
// 	edit:"12/8/2021",
// 	correctAnswers: a,
// 	gamemode: "string"
// }
// ]

// console.log("raw", b);
//https://stackoverflow.com/questions/46240647/react-how-to-force-a-function-component-to-render/53837442#53837442
//create your forceUpdate hook
// function useForceUpdate(){
// 	console.log("re update");
//     const [value, setValue] = useState(0); // integer state
//     return () => setValue(value => value + 1); // update the state to force render
// }


const QuizEditor: React.FC<PROPS> = (props) => {
	

	const [value, setValue] = useState<CardPROPS[]>([]);
	
	// setValue(getAllQuestion);
	

	const { url } = useRouteMatch();
	const reloadDB = () => {
		let questionData:CardPROPS[] = getAllQuestion(()=>{setValue(()=>questionData);});
	}
	//https://alexsidorenko.com/blog/react-infinite-loop/
	useEffect(() => {
		reloadDB();
	  }, [])
	
	const addQuest = () => {
		let t: CardPROPS = {
			_id: String((new Date()).getTime()),
			img: "",
			title: "new question ",
			answers: a,
			create: (new Date()).toJSON(),
			edit: (new Date()).toJSON(),
			correctAnswers: a,
			gamemode: "normal"	
		}
		// b.push(t);
		addQuestion(t, reloadDB);
		// setTimeout(useForceUpdate,500);
	};

	const removeQuest = (_id:string) => {
		removeQuestion(_id, reloadDB);
		// addQuestion(t, ()=> {let questionData:CardPROPS[] = getAllQuestion(()=>{setValue(()=>questionData);});});
	}

	return (
		<div className="h-full flex flex-col justify-start">
			<div
			style={{
				height:"50px",
				backgroundColor: "green"
			}}>
				Questions
			</div>
			<div className="flex-1 overflow-x-hidden overflow-y-scroll min-h-0 pb-5">
				{value.map(item => (<Question_card key={item._id} {...item}>
					<button onClick={() => removeQuest(item._id)}>
						remove
					</button>
				</Question_card>)
				)}
				<div>
					<button onClick={() => addQuest()}>
						Add new Question
					</button>
				</div>
			</div>

		</div>
	);
};

// class QuizEditor extends React.Component {

// 	questionData:CardPROPS[] = getAllQuestion(this.forceUpdate);

// 	addQuest = () => {
// 		let t: CardPROPS = {
// 			_id: String((new Date()).getTime()),
// 			img: "",
// 			title: "new question ",
// 			answers: a,
// 			create: (new Date()).toJSON(),
// 			edit: (new Date()).toJSON(),
// 			correctAnswers: a,
// 			gamemode: "normal"
// 		}
// 		// b.push(t);
// 		addQuestion(t, () => {this.questionData = getAllQuestion(this.forceUpdate)});
// 		// this.forceUpdate();
// 		//hmmm not wrok
// 		// setTimeout(forceUpdate,500);
// 	};

// 	render() {
// 		return (
// 		<div className="h-full flex flex-col justify-start">
// 			<div
// 			style={{
// 				height:"50px",
// 				backgroundColor: "green"
// 			}}>
// 				Questions
// 			</div>
// 			<div className="flex-1 overflow-x-hidden overflow-y-scroll min-h-0 pb-5">
// 				{this.questionData.map(item => <Question_card key={item._id} {...item}/>)}
// 				<div>
// 					<button onClick={() => this.addQuest()}>
// 						Add new Question
// 					</button>
// 				</div>
// 			</div>

// 		</div>
// 	);
// 	}
//   }

export default QuizEditor;

