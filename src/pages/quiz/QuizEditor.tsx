import React, { useEffect, useState, useRef, useCallback } from "react";
import { useRouteMatch } from "react-router-dom";
import Question_card, {
    CardPROPS,
} from "../../components/Question_Card/question_card";
import { CardPROPS as QuestionSet } from "../../components/Quiz_Card/quiz_card";
import {
    getAllQuestion,
    getQuestionsByQuestionSet,
    addQuestion,
    removeQuestion,
    getQuestionSet,
    putQuestionSet,
} from "../../database";

import Button from "@components/button/button";

type PROPS = {
    t: string;
    [k: string]: unknown;
};

export interface MatchParams {
    id: string;
}

const QuizEditor: React.FC<PROPS> = (props) => {
<<<<<<< HEAD
	

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
=======
    let match = useRouteMatch<MatchParams>("/Quiz/:id");
    let id = match?.params.id;

    const [value, setValue] = useState<CardPROPS[]>([]);

    const reloadDB = useCallback(() => {
        if (id === undefined) {
            let questionData: CardPROPS[] = getAllQuestion(() => {
                setValue(() => questionData);
            });
        } else {
            let questionData: CardPROPS[] = getQuestionsByQuestionSet(
                id,
                () => {
                    setValue(() => questionData);
                }
            );
        }
    }, [id]);

    //https://alexsidorenko.com/blog/react-infinite-loop/
    // note: do not remove [] ... or every thing go ....
    const reference = useRef<QuestionSet>();

    useEffect(() => {
        if (id === undefined) reloadDB();
        else
            getQuestionSet(id, (data) => {
                reference.current = data;
                console.log("data", data);
                reloadDB();
            });
    }, [id, reloadDB, reference]);

    const addQuest = () => {
        let templateCardPROPS: CardPROPS = {
            _id: String(new Date().getTime()),
            img: "",
            title: "new question ",
            answers: [],
            create: new Date().toJSON(),
            edit: new Date().toJSON(),
            correctAnswers: [],
            gamemode: "normal",
        };

        if (id === undefined) {
            //add question to set
            addQuestion(templateCardPROPS, reloadDB);
        } else {
            getQuestionSet(id, (data) => {
                reference.current = data;
                addQuestion(templateCardPROPS, () => {
                    (
                        (reference.current as QuestionSet).questions as string[]
                    ).push(templateCardPROPS._id);
                    putQuestionSet(reference.current as QuestionSet, reloadDB);
                });
            });
        }
    };

    const removeQuest = (index: number, _id: string) => {
        if (id === undefined) {
            // enire remove quétion
            removeQuestion(_id, reloadDB);
        } else {
            console.log(
                "selectedQuestionSet",
                reference.current as QuestionSet
            );
            getQuestionSet(id, (data) => {
                reference.current = data;
                (
                    (reference.current as QuestionSet).questions as string[]
                ).splice(index);
                putQuestionSet(reference.current as QuestionSet, reloadDB);
            });
        }
    };

    return (
        <div className="h-full flex flex-col justify-start">
            <div
                style={{
                    height: "50px",
                    backgroundColor: "green",
                }}
            >
                Questions
            </div>
            <div className="flex-1 overflow-x-hidden overflow-y-scroll min-h-0 pb-5">
                {value.map((item, i) => (
                    // eslint-disable-next-line react/jsx-pascal-case
                    <Question_card key={item._id} {...item}>
                        <Button
                            disabled={false}
                            className="bg-button-primary"
                            text="remove"
                            onClick={() => removeQuest(i, item._id)}/> 
                        
                    </Question_card>
                ))}
                <div>
                    <Button className="bg-button-primary" disabled={false} text="Add new Question" onClick={() => addQuest()}/>
                </div>
            </div>
        </div>
    );
>>>>>>> 17516755976e8b7aae93de3c0199af9ed4b6373c
};

export default QuizEditor;
