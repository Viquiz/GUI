import React, { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import {
    getAllQuestion,
    putQuestion,
    removeQuestion,
    Question,
} from "../../database";

import { Button } from "@components/button";
import { useAsyncPreValue } from "@common/customHook";
import { QuestionCard } from "@components/QuestionCard";

type PROPS = {
    t: string;
    [k: string]: unknown;
};

interface MatchParams {
    id: string;
}

const QuizEditor: React.FC<PROPS> = (props) => {
    let match = useRouteMatch<MatchParams>("/Quiz/:id");
    let id = match?.params.id;
    const { loading, value, error, trigger: reloadDB } =
        useAsyncPreValue<Question[]>(getAllQuestion);
    const addQuest = () => {
        let templateCardPROPS: Question = {
            _id: String(new Date().getTime()),
            img: "",
            title: "New question",
            answers: [
                { text: "a2", isCorrect: false },
                { text: "a3", isCorrect: false },
            ],
            create: "123",
            edit: "123",
            gameMode: "213",
        };
        putQuestion(templateCardPROPS).then(reloadDB);
    };

    const removeQuest = (_id: string) => {
        removeQuestion(_id).then(() => reloadDB());
    };

    useEffect(() => {
        return () => {
            console.log("unmounted");
        };
    }, []);

    return (
        <div className="h-full flex flex-col justify-start overflow-y-auto">
            <div
                style={{
                    height: "50px",
                    backgroundColor: "green",
                }}
            >
                Questions
                {/* todo: move this button */}
                <Button
                    className="bg-button-primary text-white h-8 w-40"
                    disabled={false}
                    text="Add new Question"
                    onClick={() => addQuest()}
                />
            </div>
            {value &&
                (value as unknown as Question[]).map((item) => {
                    
                    return (
                        <QuestionCard
                            key={item._id}
                            question={item}
                            onSave={function (question: Question): void {
                                console.log("on Save");
                                // need to check change for save !!! or bug here
                                putQuestion(question).then(reloadDB);
                            }}
                            onAdd={function (): void {
                                addQuest();
                            }}
                            onDelete={function (): void {
                                removeQuest(item._id);
                            }}
                        />
                    );
                })}
        </div>
    );
};

export default QuizEditor;
