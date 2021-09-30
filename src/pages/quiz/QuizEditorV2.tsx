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
        
    </div>
        )
};

export default QuizEditorV2;
