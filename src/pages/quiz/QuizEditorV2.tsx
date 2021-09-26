import React from "react";
import { Question } from "../../database";
import { QuestionEditor} from "@components/QuestionCard";

type PROPS = {
    t: string;
    [k: string]: unknown;
};

export interface MatchParams {
    id: string;
}

const QuizEditorV2: React.FC<PROPS> = (props) => {
    return (
    <div className="flex justify-items-start items-center flex-col w-full h-full">
            <div className="flex-1 w-full overflow-hidden">
                <QuestionEditor question={{
                    _id: "123",
                    img: "",
                    title: "test",
                    answers: [{ isCorrect: true, text: "123aaaaaaaaaaaaaaaaaa", id: 0 }, { isCorrect: false, text: "345", id: 1 }],
                    create: "1-1-1",
                    edit: "1-1-1",
                    gameMode: ""
                } as Question} onSave={function (value: Question): void {
                    throw new Error("Function not implemented.");
                } } onBack={function (): void {
                    throw new Error("Function not implemented.");
                } } onAddAnswer={function (): void {
                    throw new Error("Function not implemented.");
                } } onDelete={function (): void {
                    throw new Error("Function not implemented.");
                } } />
            </div>
    </div>
        )
};

export default QuizEditorV2;
