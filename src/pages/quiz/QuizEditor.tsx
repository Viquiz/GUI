import React, { useEffect, useState, useRef, useCallback } from "react";
import { useRouteMatch } from "react-router-dom";
import Question_card, {
    CardPROPS,
} from "@components/Question_Card/question_card";
import { CardPROPS as QuestionSet } from "@components/Quiz_Card";
import {
    getAllQuestion,
    getQuestionsByQuestionSet,
    addQuestion,
    removeQuestion,
    getQuestionSet,
    putQuestionSet,
    Question,
    getAllQuestionSet,
} from "../../database";

import {Button} from "@components/button";
import { useAsync, useAsyncPreValue } from "@common/customHook";
import { QuestionCard } from "@components/QuestionCard";

type PROPS = {
    t: string;
    [k: string]: unknown;
};

export interface MatchParams {
    id: string;
}

const QuizEditor: React.FC<PROPS> = (props) => {
    let match = useRouteMatch<MatchParams>("/Quiz/:id");
    let id = match?.params.id;
    const {loading,value,error,trigger} = useAsyncPreValue<Question[]>(getAllQuestion)
    const addQuest = () => {
        let templateCardPROPS: Question = {
            _id: String(new Date().getTime()),
            img: "",
            title: '',
            answers: [{text:"a2",isCorrect:false},{text:"a3",isCorrect:false}],
            create: '123',
            edit: '123',
            gameMode: '213'
        };
        addQuestion(templateCardPROPS).then(trigger);
    };

    const removeQuest = (_id: string) => {
            removeQuestion(_id).then(()=> trigger());

    };
    useEffect(()=>{
        return ()=>{
            console.log("unmounted")
        };
    },[])

    return (
        <div className="h-full flex flex-col justify-start">
            <div
                style={{
                    height: "50px",
                    backgroundColor: "green",
                }}
            >
                Questions
            <Button className="bg-button-primary text-white h-8 w-40" disabled={false} text="Add new Question" onClick={() => addQuest()}/>
            </div>
            {value && (value as unknown as Question[]).map(item=>{
                return <QuestionCard key={item._id} question={item} 
                onSave={function (question: Question): void {
                    trigger();
                } } 
                onAdd={function (): void {
                    addQuest()
                } } 
                onDelete={function (): void {
                    removeQuest(item._id)
                } }                
                />}

            )}
        </div>
    );
};

export default QuizEditor;
