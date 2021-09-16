import React, { useEffect, useState } from 'react';
import { useRouteMatch, useParams } from 'react-router-dom';
import Question_card, { CardPROPS } from '../../components/Question_Card/question_card';
import { getAllQuestion,getQuestionsByQuestionSet, addQuestion, removeQuestion, addQuestionToQuestionSet} from '../../database';

type PROPS =
	{
		t: string,
		[k: string]: unknown
	}

export interface MatchParams {
	id: string;
	}

const QuizEditor: React.FC<PROPS> = (props) => {
	

	let match = useRouteMatch<MatchParams>("/QuizEditor/:id");
	let id = match?.params.id;
	console.log("id", id);
	const [value, setValue] = useState<CardPROPS[]>([]);

	const reloadDB = () => {
		if(id === undefined){
			let questionData: CardPROPS[] = getAllQuestion(() => { setValue(() => questionData); });
		}else{
			let questionData: CardPROPS[] = getQuestionsByQuestionSet(id,() => { setValue(() => questionData); });
		}
	}
	//https://alexsidorenko.com/blog/react-infinite-loop/
	// note: do not remove [] ... or every thing go ....
	useEffect(() => {
		reloadDB();
	}, []) 

	const addQuest = () => {
		let t: CardPROPS = {
			_id: String((new Date()).getTime()),
			img: "",
			title: "new question ",
			answers: [],
			create: (new Date()).toJSON(),
			edit: (new Date()).toJSON(),
			correctAnswers: [],
			gameMode: "normal"
		}
		
		if(id === undefined){
			//add question to set
			addQuestion(t, reloadDB);
			
		}else{
			addQuestion(t,()=>{
				addQuestionToQuestionSet(t._id,id as string,reloadDB);
			});
		}
	};

	const removeQuest = (_id: string) => {
		removeQuestion(_id, reloadDB);
	}

	return (
		<div className="h-full flex flex-col justify-start">
			<div
				style={{
					height: "50px",
					backgroundColor: "green"
				}}>
				Questions
			</div>
			<div className="flex-1 overflow-x-hidden overflow-y-scroll min-h-0 pb-5">
				{value.map(item => (<Question_card key={item._id} {...item}>
					<button onClick={() => removeQuest(item._id)}>
						remove
					</button>
				</Question_card>))}
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

