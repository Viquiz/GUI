import { randomInt } from 'crypto';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import Quiz_card, {CardPROPS} from '@components/Quiz_Card';
import { getAllQuestionSet, addQuestionSet, removeQuestionSet } from '../../database'
import { DropDown, DropDownItems } from '@components/DropDownButton';
import { VscFilter, VscSearch } from 'react-icons/vsc';
import { BsClock } from 'react-icons/bs';
import { SearchBox } from '@components/SearchBox';
import Button from '@components/button';
type PROPS =
	{
		t: string,
		[k: string]: unknown
	}

const QuizManager: React.FC<PROPS> = (props) => {
	const { url } = useRouteMatch();
	const [value, setValue] = useState<CardPROPS[]>([]);
	const [searchString,setSearchString] = useState<string>("123");
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
			Class: "unknown",
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

			<div className="border-b-2 border-gray-500 w-full">
				<div className="flex w-3/4 h-32 items-center mx-auto">
					<SearchBox icon={undefined}
					callback={
						(value:string)=>{
							setSearchString(value);
						}
					}
					className="flex-1 align-middle" placeholder="Search"/>
					<Button className="w-10 mr-3 border border-gray-700" onClick={()=>console.log(searchString)} icon={VscSearch}/>
					<DropDown text="filter" icon={VscFilter} className="text-button-primary">
						<DropDownItems icon={BsClock} onClick={()=>{}} className="text-lg">
							Recent Added
						</DropDownItems>
					</DropDown>
					{/* <SearchBox className="flex-1 align-middle" placeholder="Search"/> */}
				</div>
			</div>
			<div className="flex-1 overflow-x-hidden overflow-y-auto min-h-0 pb-5">
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