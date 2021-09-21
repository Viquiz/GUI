import { randomInt } from "crypto";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
    Link,
    Route,
    Switch,
    useParams,
    useRouteMatch,
} from "react-router-dom";
import Quiz_card, { CardPROPS } from "../../components/Quiz_Card";
import {
    getAllQuestionSet,
    putQuestionSet,
    removeQuestionSet,
} from "../../database";

import {Button} from "@components/button";
import { useAsync } from "@common/customHook";

type PROPS = {
    t: string;
    [k: string]: unknown;
};


// const exq: questionIDs = [
// 	"1234", "12112"
// ]
let templateCardPROPS: CardPROPS = {
    _id: String(new Date().getTime()),
    title: "new set",
    description: "idk",
    create: new Date().toJSON(),
    edit: new Date().toJSON(),
    Class: "unknown",
    questions: [],
};
const QuizManager: React.FC<PROPS> = (props) => {
    const { url } = useRouteMatch();

    const {loading,value,error,trigger} = useAsync(getAllQuestionSet);
    const addSet = () => {
        
        putQuestionSet(templateCardPROPS).then(()=> trigger()).catch(console.log)
    };
    const removeQuest = (_id: string) => {
        removeQuestionSet(_id).then(()=> trigger())
    };

    useEffect(()=>{
		console.log(error);
	},[error])
    return (
        <div className="h-full flex flex-col justify-start">
            <div
                style={{
                    height: "50px",
                    backgroundColor: "green",
                }}
            >
                Functionality
            </div>
            <div className="flex-1 overflow-x-hidden overflow-y-scroll min-h-0 pb-8">
                {value?(value as CardPROPS[]).map((item) => (
                    <Quiz_card key={item._id} {...item}>
                        <Button
                            disabled={false}
                            className="bg-button-primary"
                            text="Play"
                            onClick={() => alert("no")}
                        />
                        <Link to={`/Quiz/${item._id}`}>edit</Link>
                        <Button
                            disabled={false}
                            className="bg-button-primary"
                            text="remove"
                            onClick={() => removeQuest(item._id)}
                        />
                    </Quiz_card>
                )):loading?"loading":"finish"}
            </div>
            <div
                style={{
                    height: "50px",
                    backgroundColor: "green",
                }}
            >
                <Button
                    disabled={false}
                    className="bg-button-primary"
                    text="Add new set"
                    onClick={() => addSet()}
                />
            </div>
        </div>
    );
};

export default QuizManager;
