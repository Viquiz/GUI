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

import Button from "@components/button";

type PROPS = {
    t: string;
    [k: string]: unknown;
};

let templateCardPROPS: CardPROPS = {
    _id: String(new Date().getTime()),
    title: "new set",
    description: "idk",
    create: new Date().toJSON(),
    edit: new Date().toJSON(),
    Class: "unknow",
    questions: [],
};
// const exq: questionIDs = [
// 	"1234", "12112"
// ]

const QuizManager: React.FC<PROPS> = (props) => {
    const { url } = useRouteMatch();
    const [value, setValue] = useState<CardPROPS[]>([]);
    const reloadDB = () => {
        //look silly ...
        let data: CardPROPS[] = getAllQuestionSet(() => {
            setValue(() => data);
        });
    };
    useEffect(() => {
        reloadDB();
    }, []);
    const addSet = () => {
        // b.push(t);
        putQuestionSet(templateCardPROPS, reloadDB);
        // setTimeout(useForceUpdate,500);
    };
    const removeQuest = (_id: string) => {
        removeQuestionSet(_id, reloadDB);
        // addQuestion(t, ()=> {let questionData:CardPROPS[] = getAllQuestion(()=>{setValue(()=>questionData);});});
    };

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
                {value.map((item) => (
                    <Quiz_card key={item._id} {...item}>
                        <Button
                            disabled={false}
                            className="bg-button-primary"
                            text="Play"
                            onClick={() => alert("no")}
                        />

                        {/* passing id via link */}
                        {/* <Button
                            disabled={false}
                            className="bg-button-primary"
                            text="" onClick = {()=>{}}> */}
                        <Link to={`/Quiz/${item._id}`}>edit</Link>
                        {/* </Button> */}
                        {/* add promp and redo in 30s*/}
                        <Button
                            disabled={false}
                            className="bg-button-primary"
                            text="remove"
                            onClick={() => removeQuest(item._id)}
                        />
                    </Quiz_card>
                ))}
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
